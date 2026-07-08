package com.example.ai.chat.service;

import com.example.ai.chat.dto.ChatMessage;
import com.example.ai.chat.repository.ChatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatService {
    private final ChatRepository repository;

    public void save(ChatMessage message){
        repository.save(message);
    }

    public List<ChatMessage> getMessages(){
        return repository.findAll();
    }

}