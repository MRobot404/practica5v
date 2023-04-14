package com.universales.proyecto.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import com.universales.proyecto.entity.Certificados;
import com.universales.proyecto.entity.Facturas;

import lombok.Data;

@Data
public class SegurosDTO implements Serializable {
	private static final long serialVersionUID = 1L;
	private BigDecimal id;
	private String tipo;
	private Date fechaInicio;
	 private Date fechaFin;
	 private BigDecimal codigoContratante;
	 private BigDecimal primaTotal;
	 private BigDecimal sumaAsegurada;
	 private Character estado;
	 private String grabacionUsuario;
	 private Date grabacionFecha;
	 private String modificacionUsuario;
	 private Date modificacionFecha;
	 private List<Certificados> certificadosList;
	 private List<Facturas> facturasList;
}
