package com.universales.proyecto.repository;

import java.io.Serializable;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.universales.proyecto.entity.Clientes;

@Repository("clientesRepository")
public interface ClientesRepository extends JpaRepository<Clientes, Serializable> {

	Page<Clientes> findAll(Pageable pageable);

	@Query(value = "SELECT * FROM CLIENTES WHERE UPPER(NOMBRE||APELLIDO||NIT||DPI||APELLIDO||NOMBRE) LIKE %:valor%", nativeQuery = true)
	Page<Clientes> findByNombreOrNitOrDpi(String valor, Pageable pageable);
	
	Clientes findFirstByNombre(String nombre);
	
	Clientes findFirstByNit(String nit);
	
	Clientes findFirstByDpi(String dpi);
}