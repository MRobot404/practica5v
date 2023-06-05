package com.universales.proyecto.security;

import java.util.Map;

import com.universales.proyecto.entity.Usuarios;

public interface JwtGeneratorInterface {
	
		Map<String, String> generateToken(Usuarios usuarios);
}
