package tn.iit.security;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter
{
    @Autowired
    private JwtDecoder jwtDecoder;
    @Autowired
    private JwtToPrincipleConverter jwtToPrincipleConverter;
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String requestPath = request.getServletPath();
        if ("/auth/login".equals(requestPath)) {
            filterChain.doFilter(request, response);
            return;
        }
        extractTokenFromRequest(request)
                        .map(jwtDecoder::decode)
                        .map(jwtToPrincipleConverter::convert)
                        .map(UserPrincipleAuthenticationToken::new)
                .ifPresent(authentication-> SecurityContextHolder.getContext().setAuthentication(authentication));
        ;

        filterChain.doFilter(request,response);
    }
    private Optional<String> extractTokenFromRequest(HttpServletRequest request){
        var token =request.getHeader("Authorization");
        if(StringUtils.hasText(token) && token.startsWith("Bearer ")) {
            return Optional.of(token.substring(7));
        }
        return Optional.empty();
    }
}
