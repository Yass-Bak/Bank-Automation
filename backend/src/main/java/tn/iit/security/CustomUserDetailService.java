package tn.iit.security;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import tn.iit.repository.BanqueRepository;
import tn.iit.service.BanqueService;

@Component
@RequiredArgsConstructor
public class CustomUserDetailService implements UserDetailsService {
    @Autowired
    private BanqueService banqueService;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        var user=banqueService.getBanqueByEmail(username).orElseThrow();
        return UserPrinciple.builder()
                .userId(user.getId())
                .email(user.getEmail())
                .password(user.getPassword())
                .build();

    }
}
