

const currentUser = "신승민";
let currentRoom = "group";

function selectUser(user){
    currentRoom = user;
    const area = document.getElementById("privateMessageArea");

    area.innerHTML="";

    area.innerHTML=`
        <h3>${user}님과의 대화</h3>
    `;
}

let stompClient = null;

// 채팅 팝업 열기
function openChat() {
    document.getElementById("chatModal").style.display = "block";
}

// 채팅 팝업 닫기
function closeChat() {
    document.getElementById("chatModal").style.display = "none";
}


// 단체 / 개인 채팅 전환
function switchTab(type) {

    const group = document.getElementById("groupChat");
    const personal = document.getElementById("privateChat");

    const buttons = document.querySelectorAll(".tab button");

    buttons.forEach(btn => btn.classList.remove("active"));

    if (type === "group") {

        group.style.display = "block";
        personal.style.display = "none";

        buttons[0].classList.add("active");

    } else {

        group.style.display = "none";
        personal.style.display = "block";

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

            showMessage(JSON.parse(message.body));

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
        roomId: "group",
        type: "TALK"

    }));

    input.value = "";

}

// 화면 출력
function showMessage(message) {

    const area = document.getElementById("messageArea");

    area.innerHTML += `
        <div>
            <b>${message.sender}</b> : ${message.message}
        </div>
    `;

}

// 페이지 로드 / enter키 눌럿을 때 바로 입력
window.onload = function () {

    connect();

    const input = document.getElementById("message");

    document.getElementById("sendBtn")
        .addEventListener("click", sendMessage);

    input.addEventListener("keydown", function (event) {

        if (event.key === "Enter") {
            event.preventDefault();
            sendMessage();
        }

    });

}

// 팝업 밖을 클릭해도 닫히게
window.addEventListener("click", function(event){

    const modal = document.getElementById("chatModal");

    if(event.target === modal){

        closeChat();

    }

});