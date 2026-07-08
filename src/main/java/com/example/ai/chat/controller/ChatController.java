package com.example.ai.chat.controller;

import com.example.ai.chat.dto.ChatMessage;
import com.example.ai.chat.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class ChatController {
    private final ChatService chatService;

    @MessageMapping("/chat.send")
    @SendTo("/topic/chat")
    public ChatMessage send(ChatMessage message) {
        System.out.println("메시지 : " + message.getMessage());
        chatService.save(message);

        return message;
    }

    @GetMapping("/chat/history")
    @ResponseBody
    public List<ChatMessage> history() {
        return chatService.getMessages();
    }

}