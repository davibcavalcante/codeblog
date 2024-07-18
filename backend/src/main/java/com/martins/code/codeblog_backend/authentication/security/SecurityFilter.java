package com.martins.code.codeblog_backend.authentication.security;

import com.martins.code.codeblog_backend.authentication.model.User;
import com.martins.code.codeblog_backend.authentication.repositories.UserRepository;
import com.martins.code.codeblog_backend.exceptions.custom.TokenException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;

@Component
public class SecurityFilter extends OncePerRequestFilter {

    @Autowired
    TokenService tokenService;
    @Autowired
    UserRepository userRepository;

    private static final String[] AUTH_WHITELIST = {
            "/auth/login",
            "/auth/register"
    };

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        try{

            String path = request.getRequestURI();
            boolean isWhitelisted = false;

            for(String whitelistPath : AUTH_WHITELIST){
                if(path.endsWith(whitelistPath)){
                    isWhitelisted = true;
                    break;
                }
            }

            if(!isWhitelisted){
                var token = this.recoverToken(request);
                if(token == null) {
                    throw new TokenException.MissingTokenException("Token ausente!");
                }

                var login = tokenService.verifyToken(token);
                if(login == null) {
                    throw new TokenException.InvalidTokenException("Token invalido!");
                }

                User user = userRepository.findByEmail(login).orElseThrow(() -> new TokenException.InvalidTokenException("Usuário não encontrado!"));
                var authorities = Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"));
                var auth = new UsernamePasswordAuthenticationToken(user, null, authorities);
                SecurityContextHolder.getContext().setAuthentication(auth);
            }

        } catch (TokenException.MissingTokenException | TokenException.InvalidTokenException e) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write(e.getMessage());
            return;
        }
        filterChain.doFilter(request, response);
    }

    private String recoverToken(HttpServletRequest request) {
        var authHeader = request.getHeader("Authorization");
        if (authHeader == null) {
            return null;
        }
        return authHeader.replace("Bearer ", "");
    }
}
