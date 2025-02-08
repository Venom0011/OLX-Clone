package com.TradeSpot.services;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import javax.crypto.SecretKey;

import com.TradeSpot.entities.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

    private final String SECRET_KEY="7b2598c3b4faa9969c0a24c9dc57cd482b9f8a48c984ba22df35c3377aebada3";

    private final Logger logger= LoggerFactory.getLogger(JwtService.class);

    public String extractUsername(String token) {
        return extractClaims(token, Claims::getSubject);
    }

    public String extracRoles(String token) {
        return extractClaims(token, Claims::getSubject);
    }

    public boolean isValid(String token,UserDetails user) {
        String username=extractUsername(token);
        return (username.equals(user.getUsername())) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaims(token, Claims::getExpiration);
    }


    public <T> T extractClaims(String token,Function<Claims, T> resolver){
        Claims claims=extractAllClaims(token);
        return resolver.apply(claims);
    }


    public Claims extractAllClaims(String token) {
        return  Jwts.parser()
                .verifyWith(getSignInKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public String generateToken(UserDetails user){
        Map<String, Object> claims = new HashMap<>();
        System.out.println(user.getAuthorities());
        claims.put("roles", user.getAuthorities());
        logger.info("Generating claims:{}",user.getAuthorities());
        return createToken(claims,user.getUsername());
    }

    public String createToken(Map<String, Object>claims, String email) {
        String token=Jwts.builder()
                .claims(claims)
                .subject(email)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis()+24*60*60*1000))
                .signWith(getSignInKey())
                .compact();
        return token;
    }

    private SecretKey getSignInKey() {
        byte[] keyBytes=Decoders.BASE64URL.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}