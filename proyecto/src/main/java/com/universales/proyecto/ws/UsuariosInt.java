package com.universales.proyecto.ws;

import java.nio.file.attribute.UserPrincipalNotFoundException;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.universales.proyecto.dto.UsuariosDTO;
import com.universales.proyecto.entity.Usuarios;

@RestController
@RequestMapping("/noauth/usuarios")
@CrossOrigin
public interface UsuariosInt {
	@GetMapping("/buscar")
	List<Usuarios> buscar();

	@PostMapping("/guardar")
	Usuarios guardar(@RequestBody UsuariosDTO usuario);

	Usuarios getUsuarioByUsuarioAndContrasena(String usuario, String contrasena) throws UserPrincipalNotFoundException;
	
	@PostMapping("/login")
	ResponseEntity<Object> loginUser(UsuariosDTO usuario);

}