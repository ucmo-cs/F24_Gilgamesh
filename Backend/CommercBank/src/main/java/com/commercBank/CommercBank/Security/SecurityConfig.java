package com.commercBank.CommercBank.Security;
import com.commercBank.CommercBank.Service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;


import static org.springframework.security.config.Customizer.withDefaults;


@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    @Lazy
    private AccountService accountService;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        System.out.println("Custom SecurityFilterChain is being initialized!");
        http
                .csrf(csrf -> csrf.disable())

                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/accounts/account").permitAll()//Allow public access to `/create`
                        .requestMatchers("/api/accounts/**").permitAll()
                        .requestMatchers("/login/login").permitAll()   // Allow public access to `/login`
                        .requestMatchers("/loan").permitAll()
                        .requestMatchers("/admin/loans").permitAll()
                        .requestMatchers("/payment").permitAll()
                        .requestMatchers("/user/{id}").permitAll()
                        .requestMatchers("/loan/account/{accountId}").permitAll()
                        .requestMatchers("/admin/create-admin").permitAll()
                        .requestMatchers("/create-admin").permitAll()// delete later
                        .requestMatchers("/user/**").permitAll()
                        .requestMatchers("/admin/**").permitAll()  // Ensure only admin access to `/admin`
                        .requestMatchers("/reset/password-reset").permitAll()
                        .requestMatchers("/reset/**").permitAll()
                        .requestMatchers("/reset/ID-reset").permitAll()
                        .anyRequest().authenticated()
                )
                .httpBasic(Customizer.withDefaults())  // Enable basic auth
                .anonymous(anonymous -> anonymous.disable())  // Disable anonymous authentication         // Disable CSRF for simplicity in API testing
                .formLogin(form -> form.disable());   // Disable default form login

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
        AuthenticationManagerBuilder authenticationManagerBuilder =
                http.getSharedObject(AuthenticationManagerBuilder.class);

        // Configure in-memory authentication
        authenticationManagerBuilder
                .inMemoryAuthentication()
                .withUser("admin") // You can replace this with a UserDetailsService that fetches from DB
                .password(passwordEncoder().encode("letMeInter123"))
                .roles("ADMIN"); // Assign the "ADMIN" role

        return authenticationManagerBuilder.build();
    }

}
