package com.universales.proyecto.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;


import lombok.Data;

@Data
public class DireccionesDTO implements Serializable{

	private static final long serialVersionUID = 1L;
	private BigDecimal id;
	private String direccion;
	private Character estado;
	private String grabacionUsuario;
	private Date grabacionFecha;
	private String modificacionUsuario;
	private Date modificacionFecha;
	private BigDecimal clienteId;
}
