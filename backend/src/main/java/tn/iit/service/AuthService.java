package tn.iit.service;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import tn.iit.dto.LoginResponseDto;
import tn.iit.security.JwtIssuer;
import tn.iit.security.UserPrinciple;
@Getter
@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtIssuer jwtIssuer;

    public LoginResponseDto attemptLogin(String email,String password){
        var authentication=authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email,password)
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        var principle=(UserPrinciple) authentication.getPrincipal();
        System.out.println("email"+principle);
        var token=jwtIssuer.issue(principle.getUserId(), principle.getEmail());
        return
                LoginResponseDto.builder()
                        .accessToken(token)
                        .build()
        ;

    }


}
