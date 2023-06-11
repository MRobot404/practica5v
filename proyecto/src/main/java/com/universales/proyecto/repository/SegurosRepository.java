package com.universales.proyecto.repository;

import java.io.Serializable;

import java.math.BigDecimal;
import java.util.Date;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.universales.proyecto.entity.Seguros;

@Repository("segurosRepository")
public interface SegurosRepository extends JpaRepository<Seguros, Serializable> {

	Page<Seguros> findAll(Pageable pageable);

	Seguros findById(BigDecimal id);

	Page<Seguros> findByfechaInicio(Date fechaInicio, Pageable pageable);

	Page<Seguros> findByfechaFin(Date fechaFin, Pageable pageable);

	Page<Seguros> findBycodigoContratante(BigDecimal codigoContratante, Pageable pageable);
}
