package tn.iit.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
@Getter
@RequiredArgsConstructor
@Component
public class JwtIssuer {
    @Autowired
    private JwtProperties jwtProperties;
    public String issue(long userId, String email){
        return JWT.create()
                .withSubject(String.valueOf(userId))
                .withExpiresAt(Instant.now().plus(Duration.of(1, ChronoUnit.DAYS)))
                .withClaim("email",email)
                .sign(Algorithm.HMAC256(jwtProperties.getSecretKey()));
    }
}
