package com.example.ai.chat.controller;

import com.example.ai.chat.dto.ProjectMember;
import com.example.ai.chat.service.ProjectMemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class ProjectMemberController {

    private final ProjectMemberService memberService;

    @GetMapping
    public List<ProjectMember> list(){

        return memberService.getMembers();

    }

}