package tn.iit.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import tn.iit.dto.LoginRequestDto;
import tn.iit.dto.LoginResponseDto;
import tn.iit.entity.Banque;
import tn.iit.security.JwtIssuer;
import tn.iit.security.UserPrinciple;
import tn.iit.service.AuthService;
import tn.iit.service.BanqueService;


@RestController
@RequestMapping(("/auth"))
@RequiredArgsConstructor

public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@RequestBody @Validated LoginRequestDto request) {
    return ResponseEntity.ok(authService.attemptLogin(request.getEmail(), request.getPassword()));

    }

}
