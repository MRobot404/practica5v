package com.universales.proyecto.dto;

import java.math.BigDecimal;
import java.util.Date;

import lombok.Data;

@Data
public class ParametrosBusquedaPolizaDTO {
	private BigDecimal id;
	private Date fechaInicio;
	private Date fechaFin;
	private String nombre;
	private String nit;
	private String dpi;

}
