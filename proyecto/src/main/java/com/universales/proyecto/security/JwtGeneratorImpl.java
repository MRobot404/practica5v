package com.universales.proyecto.security;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.universales.proyecto.entity.Usuarios;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class JwtGeneratorImpl implements JwtGeneratorInterface {
	private static final String SECRET = "secret";
	private static final String MESSAGE = "Token generado exitosamente";
	private static final long TOKENVALIDITYINSECONS = 36000;
	
	@Override
	public Map<String, String> generateToken(Usuarios usuarios) {
		String jwtToken = "";
		Date now = new Date();
		Date expiration = new Date(now.getTime() + TOKENVALIDITYINSECONS * 1000);
		jwtToken = Jwts.builder().setSubject(String.valueOf(usuarios.getId())).setIssuedAt(now).setExpiration(expiration)
				.signWith(SignatureAlgorithm.HS256, SECRET).compact();
		Map<String, String> jwtTokenGen = new HashMap<>();
		jwtTokenGen.put("token", jwtToken);
		jwtTokenGen.put("message",MESSAGE);	
		return jwtTokenGen;
	}

}
