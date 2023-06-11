package com.universales.proyecto.dto;

import java.math.BigDecimal;
import java.util.Date;

import lombok.Data;

@Data
public class MantenimientoSeguroDto {

	private BigDecimal id;

	private String cliente;

	private String nit;

	private String dpi;

	private String tipo;

	private Date fechaInicio;

	private Date fechaFin;

	private BigDecimal primaTotal;

	private BigDecimal sumaAsegurada;

	private Character estado;

}
