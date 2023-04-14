package com.universales.proyecto.dto;



import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import com.universales.proyecto.entity.Direcciones;
import com.universales.proyecto.entity.Facturas;

import lombok.Data;

@Data
public class ClientesDTO implements Serializable{

	private static final long serialVersionUID = 1L;
	private BigDecimal id;
	private String nombre;
	private String apellido;
	private String nit;
	private String dpi;
	private Character estado;
	private String grabacionUsuario;
	private Date grabacionFecha;
	private String modificacionUsuario;
	private Date modificacionFecha;
	private List<Direcciones> direccionesList;
	private List<Facturas> facturasList;
}
