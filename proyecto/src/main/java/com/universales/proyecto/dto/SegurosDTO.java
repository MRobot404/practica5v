package com.universales.proyecto.dto;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import com.universales.proyecto.entity.Facturas;

import lombok.Data;

@Data
public class SegurosDTO {

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
	 private String nombreContratanteP;
	 private List<CertificadosDTO> certificadosList;
	 private List<Facturas> facturasList;
}
