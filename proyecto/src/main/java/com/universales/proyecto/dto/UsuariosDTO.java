package com.universales.proyecto.dto;

import java.io.Serializable;

import lombok.Data;
@Data
public class UsuariosDTO implements Serializable{
	private static final long serialVersionUID = 1L;
	private String usuario;
	private String contrasena;
	private Object token;

}
