package com.universales.proyecto.repository;

import java.io.Serializable;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.universales.proyecto.entity.Coberturas;


@Repository("coberturasRepository")
public interface CoberturasRepository extends JpaRepository<Coberturas, Serializable>  {

	Page<Coberturas>findAll(Pageable pageable);
	
	@Query(value = "SELECT * FROM COBERTURAS WHERE UPPER(ESTADO||DESCRIPCION||DESCRIPCION||ESTADO) LIKE %?1%", nativeQuery = true)
	Page<Coberturas>findByEstadoOrDescripcion(String valor, Pageable pageable);
}
