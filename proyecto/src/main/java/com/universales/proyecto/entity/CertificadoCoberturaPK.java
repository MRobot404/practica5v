package com.universales.proyecto.entity;

import java.io.Serializable;
import java.math.BigDecimal;

import javax.persistence.*;

import lombok.Data;

@Data
@Embeddable
public class CertificadoCoberturaPK implements Serializable {

	private static final long serialVersionUID = 1L;

	@Basic(optional = false)
    @Column(name = "CERTIFICADO_ID")
    private BigDecimal certificados;
    
    @Basic(optional = false)
    @Column(name = "COBERTURA_ID")
    private BigDecimal coberturas;

    
    
}


