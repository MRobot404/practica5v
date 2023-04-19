package com.universales.proyecto.repository;

import java.io.Serializable;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.universales.proyecto.entity.Direcciones;


@Repository("direccionesRepository")
public interface DireccionesRepository extends JpaRepository<Direcciones,Serializable> {

	
	Page<Direcciones> findAll(Pageable pageable);
}
