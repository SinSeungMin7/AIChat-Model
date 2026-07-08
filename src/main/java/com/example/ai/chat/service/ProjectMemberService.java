package com.example.ai.chat.service;

import com.example.ai.chat.dto.ProjectMember;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProjectMemberService {

    private final List<ProjectMember> members = new ArrayList<>();

    public ProjectMemberService(){
        members.add(new ProjectMember(1L,"신승민"));
        members.add(new ProjectMember(2L,"김철수"));
        members.add(new ProjectMember(3L,"홍길동"));
        members.add(new ProjectMember(4L,"이영희"));
    }

    public List<ProjectMember> getMembers(){
        return members;
    }
}