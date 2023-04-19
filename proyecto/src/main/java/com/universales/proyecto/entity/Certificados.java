package com.universales.proyecto.entity;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import javax.persistence.*;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;

import lombok.Data;

@Entity
@Table(name = "CERTIFICADOS")
@Data
public class Certificados implements Serializable {

	private static final long serialVersionUID = 1L;
	@GenericGenerator(name = "ID", strategy = "org.hibernate.id.enhanced.SequenceStyleGenerator", parameters = {
			@Parameter(name = "sequence_name", value = "test_seq5"), @Parameter(name = "initial_value", value = "1"),
			@Parameter(name = "increment_size", value = "1"), @Parameter(name = "schema", value = "SEGUNIS") })
	@Id
	@Basic(optional = false)
	@Column(name = "ID")
	@GeneratedValue(generator = "ID")
	private BigDecimal id;

	@Column(name = "CODIGO_CONTRATANTE")
	private BigDecimal codigoContratante;

	@Column(name = "CODIGO_ASEGURADO")
	private BigDecimal codigoAsegurado;

	@Column(name = "PRIMA")
	private BigDecimal prima;

	@Column(name = "SUMA_ASEGURADA")
	private BigDecimal sumaAsegurada;

	@Column(name = "FECHA_INICIO")
	@Temporal(TemporalType.TIMESTAMP)
	private Date fechaInicio;

	@Column(name = "FECHA_FIN")
	@Temporal(TemporalType.TIMESTAMP)
	private Date fechaFin;

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

	@Column(name = "SEGURO_ID")
	private BigDecimal seguroId;

	@OneToMany(mappedBy = "certificadoId", fetch = FetchType.LAZY)
	private List<Siniestros> siniestrosList;
	
}