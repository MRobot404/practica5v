package com.universales.proyecto.repository;

import java.io.Serializable;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.universales.proyecto.entity.Seguros;


@Repository("segurosRepository")
public interface SegurosRepository extends JpaRepository<Seguros, Serializable> {

	Page<Seguros>findAll(Pageable pageable);
	
	@Query(value = "SELECT * FROM SEGUROS WHERE ID LIKE %:valor%", nativeQuery = true)
	Page<Seguros> findById(String valor, Pageable pageable);
}
