package com.example.ai.chat.controller;

import com.example.ai.chat.dto.ChatRoom;
import com.example.ai.chat.service.ChatRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequestMapping("/room")
@RequiredArgsConstructor
public class ChatRoomController {

    private final ChatRoomService roomService;

    @GetMapping
    public Collection<ChatRoom> list(){

        return roomService.getRooms();

    }

    @GetMapping("/project")
    public ChatRoom createProjectRoom() {
        return roomService.createProjectGroupRoom(
                1L,
                "AI Collaboration"
        );
    }

}
