package com.example.ai.chat.service;

import com.example.ai.chat.dto.ChatMessage;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ChatService {
    private final List<ChatMessage> messages = new ArrayList<>();
    public void save(ChatMessage message){
        messages.add(message);
    }

    public List<ChatMessage> getMessages(){
        return messages;
    }
}