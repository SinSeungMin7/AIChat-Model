package com.example.ai.chat.repository;

import com.example.ai.chat.dto.ChatMessage;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class ChatRepository {
    private final List<ChatMessage> messages = new ArrayList<>();

    public void save(ChatMessage message){
        messages.add(message);
    }

    public List<ChatMessage> findAll(){
        return messages;
    }

}