
// 현재 채팅모드 관리
let chatMode = "group"; // group, private

// 팀원 목록 가져오기
let teamMembers = [];

async function loadTeamMembers() {
    try {
        const projectId = 1;  // 나중에는 const projectId = $("#projectId").val(); 또는 const projectId = sessionStorage.getItem("projectId");
        const response = await fetch("/member/" + projectId);
        teamMembers = await response.json();
        loadUsers()
    } catch (e) {
        console.error("팀원 조회 실패", e);
    }
}
/*
  브라우저
     ↓
GET /member
     ↓
Spring Boot
     ↓
ProjectMemberService
     ↓
JSON 반환
     ↓
teamMembers 저장
 */

/* // 테스트용 팀원
const teamMembers = [
    "신승민",
    "김철수",
    "홍길동",
    "이영희"
];*/

function loadUsers(){
    const list = document.getElementById("userList");
    list.innerHTML="";
    teamMembers.forEach(function(member){
        if(member.memberName === currentUser){
            return;
        }

        list.innerHTML += `
            <button
                style="width:100%;padding:10px;border:none;background:white;cursor:pointer;"
                onclick="selectUser('${member.memberName}')">
                👤 ${member.memberName}
            </button>
         `;
    });
}

// 현재 선택한 챗팅방 저장
const currentUser = "신승민";
let currentRoom = "group";

function selectUser(user){
    currentRoom = user;

    document.getElementById("privateMessageArea").innerHTML=`
        <h3>${user}</h3>
        <hr>
        <div id="dmArea">
        </div>
    `;
}

let stompClient = null;

// 채팅 팝업 열기 (팝업 열면 자동실행)
function openChat(){
    document.getElementById("chatModal").style.display="block";
    loadTeamMembers();
}

// 채팅 팝업 닫기
function closeChat() {
    document.getElementById("chatModal").style.display = "none";
}


// 단체 / 개인 채팅 전환
function switchTab(type){
    chatMode = type;

    const group = document.getElementById("groupChat");
    const privateChat = document.getElementById("privateChat");

    const buttons = document.querySelectorAll(".tab button");

    buttons.forEach(btn => btn.classList.remove("active"));

    if(type === "group"){
        group.style.display = "block";
        privateChat.style.display = "none";

        buttons[0].classList.add("active");

        currentRoom = "group";
    }else{
        group.style.display = "none";
        privateChat.style.display = "block";

        buttons[1].classList.add("active");
    }
}

// WebSocket 연결
function connect() {
    const socket = new SockJS('/chat');

    stompClient = Stomp.over(socket);
    stompClient.connect({}, function () {

        console.log("WebSocket 연결 성공");

        stompClient.subscribe('/topic/chat', function (message) {
            const msg = JSON.parse(message.body);  // 채팅 모드에 따라 출력위치를 다르게

            if(msg.roomId === "group"){
                showGroupMessage(msg);
            }else{
                showPrivateMessage(msg);
            }
        });
    });
}

// 메시지 보내기
function sendMessage() {
    const input = document.getElementById("message");
    const text = input.value;
    // 나중에는  const currentUser = loginUser; -> 로그인유저(변수명)로 교체
    const currentUser = "USER";

    if (text.trim() === "") {
        return;
    }

    stompClient.send("/app/chat.send", {}, JSON.stringify({
        sender: currentUser,
        message: text,
        //roomId: "group",
        roomId: currentRoom,  /* 단체 채팅이면  roomId = group, ex)김철수 를 누르면 roomId = 김철수 로 표시*/
        type: "TALK"
    }));
    input.value = "";
}

/*// 화면 출력 연습 확인과정
function showMessage(message) {
    const area = document.getElementById("messageArea");

    area.innerHTML += `
        <div>
            <b>${message.sender}</b> : ${message.message}
        </div>
    `;
}*/
// 그룹 메시지 화면 출력
function showGroupMessage(message){
    const area = document.getElementById("messageArea");
    area.innerHTML += `
        <div> 
            <b>${message.sender}</b> : ${message.message}
        </div>
    `;
    area.scrollTop = area.scrollHeight;
}
// 개인 메시지 화면 출력
function showPrivateMessage(message){
    if(currentRoom !== message.roomId){
        return;
    }
    const area = document.getElementById("dmArea");

    if(!area){
        return;
    }

    area.innerHTML += `
        <div>
            <b>${message.sender}</b> : ${message.message}
        </div>
    `;

    area.scrollTop = area.scrollHeight;
}

// 페이지 로드 / enter키 눌럿을 때 바로 입력
wwindow.onload = function () {
    connect();
    loadHistory();

    document.getElementById("sendBtn")
        .addEventListener("click", sendMessage);

    document.getElementById("message")
        .addEventListener("keydown", function(e){

            if(e.key === "Enter"){
                sendMessage();
            }
        });

}

// 새로고침시 채팅 다시 불러오기
async function loadHistory() {

    const response = await fetch("/chat/history");
    const list = await response.json();

    document.getElementById("messageArea").innerHTML = "";
    list.forEach(showMessage);
}


/*
// 팝업 밖을 클릭해도 닫히게
window.addEventListener("click", function(event){

    const modal = document.getElementById("chatModal");

    if(event.target === modal){

        closeChat();

    }

});*/
