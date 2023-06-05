package com.universales.proyecto.repository;

import java.io.Serializable;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.universales.proyecto.entity.Usuarios;

@Repository("usuariosRepository")
public interface UsuariosRepository  extends JpaRepository<Usuarios, Serializable>{

	public Usuarios findByUsuarioAndContrasena(String usuario,String contrasena);
	
}
