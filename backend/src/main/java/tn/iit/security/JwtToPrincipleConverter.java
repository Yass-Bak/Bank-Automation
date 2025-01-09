package tn.iit.security;

import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class JwtToPrincipleConverter {
    public UserPrinciple convert(DecodedJWT jwt){
    return UserPrinciple.builder()
            .userId(Integer.valueOf(jwt.getSubject()))
            .email(jwt.getClaim("email").asString())
            .build();
    }
    private List<SimpleGrantedAuthority> extractAuthoritiesFromClaim(DecodedJWT jwt){
        var Claim=jwt.getClaim("a");
        if(Claim.isNull() || Claim.isMissing()) return List.of();
        return Claim.asList(SimpleGrantedAuthority.class);

    }
}
