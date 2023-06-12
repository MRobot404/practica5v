package com.universales.proyecto.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import lombok.Data;

@Data
public class CertificadosDTO implements Serializable {
	private static final long serialVersionUID = 1L;
	private BigDecimal id;
	private BigDecimal codigoContratante;
	private BigDecimal codigoAsegurado;
	private BigDecimal prima;
	private BigDecimal sumaAsegurada;
	private Date fechaInicio;
	private Date fechaFin;
	private Character estado;
	private String grabacionUsuario;
	private Date grabacionFecha;
	private String modificacionUsuario;
	private Date modificacionFecha;
	private BigDecimal seguroId;
	private String nombreContratante;
	private String nombreAsegurado;

	private List<CoberturasDTO> coberturasList;
}
