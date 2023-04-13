package com.universales.proyecto.entity;


import java.io.Serializable;
import java.util.Date;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;


@Entity
@Table(name = "CERTIFICADO_COBERTURA")
@Data
@Embeddable
public class CertificadoCobertura implements Serializable{
	

    private static final long serialVersionUID = 1L;
    @EmbeddedId
    private CertificadoCoberturaPK certificadoCoberturaPK;
    @Column(name = "ESTADO")
    private Character estado;
    @Column(name = "GRABACION_USUARIO")
    private String grabacionUsuario;
    @Column(name = "GRABACION_FECHA")
    @Temporal(TemporalType.TIMESTAMP)
    private Date grabacionFecha;
    @Column(name = "MODIFICACION_USUARIO")
    private String modificacionUsuario;
    @Column(name = "MODIFICACION_FECHA")
    @Temporal(TemporalType.TIMESTAMP)
    private Date modificacionFecha;
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CERTIFICADO_ID", referencedColumnName = "ID", insertable = false, updatable = false)
    private Certificados certificado;
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "COBERTURA_ID", referencedColumnName = "ID", insertable = false, updatable = false)
    private Coberturas cobertura;
}
