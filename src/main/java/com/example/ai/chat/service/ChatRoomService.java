package com.example.ai.chat.service;

import com.example.ai.chat.dto.ChatRoom;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ChatRoomService {  // 채팅방 관리 클래스 생성
    private final Map<String, ChatRoom> chatRooms = new HashMap<>();

    public ChatRoomService(){
        createRoom(
                "group",
                "프로젝트 단체채팅",
                "GROUP"
        );
    }

    public ChatRoom createRoom(String roomId, String roomName, String roomType){

        ChatRoom room = new ChatRoom(roomId, roomName, roomType);
        chatRooms.put(roomId, room);

        return room;
    }

    public Collection<ChatRoom> getRooms(){
        return chatRooms.values();
    }

    public ChatRoom getRoom(String roomId){
        return chatRooms.get(roomId);
    }
}