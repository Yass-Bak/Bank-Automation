//package tn.iit.config;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
//import org.springframework.security.core.userdetails.User;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import tn.iit.service.UserService;
//
//@Configuration
//@EnableWebSecurity
//public class SecurityConfig extends WebSecurityConfigurerAdapter {
//
//    private final UserService userService;
//
//    public SecurityConfig(UserService userService) {
//        this.userService = userService;
//    }
//
//    @Override
//    protected void configure(HttpSecurity http) throws Exception {
//        http
//            .authorizeRequests()
//            .antMatchers("/login", "/register").permitAll()  // Permet l'accès sans authentification à /login et /register
//            .anyRequest().authenticated()  // Toutes les autres requêtes nécessitent d'être authentifié
//            .and()
//            .formLogin()
//            .loginPage("/login")  // Page de login personnalisée
//            .permitAll()
//            .and()
//            .logout()
//            .logoutUrl("/logout")
//            .permitAll();
//    }
//
//    @Override
//    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
//        auth.userDetailsService(userService).passwordEncoder(passwordEncoder());
//    }
//
//    @Bean
//    public PasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder();
//    }
//
//    @Bean
//    @Override
//    public AuthenticationManager authenticationManagerBean() throws Exception {
//        return super.authenticationManagerBean();
//    }
//}
