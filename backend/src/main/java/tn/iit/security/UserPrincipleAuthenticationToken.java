package tn.iit.security;

import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

public class UserPrincipleAuthenticationToken extends AbstractAuthenticationToken {

    private final UserPrinciple principle;
    public UserPrincipleAuthenticationToken(UserPrinciple principle) {
        super(principle.getAuthorities());
        this.principle=principle;
        setAuthenticated(true);
    }

    @Override
    public Object getCredentials() {
        return null;
    }

    @Override
    public UserPrinciple getPrincipal() {
        return principle ;
    }
}
