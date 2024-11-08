package com.commercBank.CommercBank.Config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Allow CORS for frontend running on http://localhost:5173/
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:5173") // Allow only your frontend URL
                .allowedMethods("GET", "POST", "OPTIONS")
                .allowedHeaders("Origin", "Content-Type", "Accept")
                .allowCredentials(true);
    }
}
