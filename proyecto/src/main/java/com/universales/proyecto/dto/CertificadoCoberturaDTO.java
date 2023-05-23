package com.universales.proyecto.dto;


import java.util.Date;

import com.universales.proyecto.entity.Certificados;
import com.universales.proyecto.entity.Coberturas;

import lombok.Data;

@Data
public class CertificadoCoberturaDTO {
	
	

	 private Character estado;
	 private String grabacionUsuario;
	 private Date grabacionFecha;
	 private String modificacionUsuario;
	 private Date modificacionFecha;
	 private Certificados certificados;
	 private Coberturas coberturas;
}
