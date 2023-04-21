package com.universales.proyecto.repository;

import java.io.Serializable;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.universales.proyecto.entity.Clientes;

@Repository("clientesRepository")
public interface ClientesRepository extends JpaRepository<Clientes, Serializable> {

	Page<Clientes> findAll(Pageable pageable);

	List<Clientes> findByNombreIgnoreCaseAndApellidoIgnoreCaseOrDpiIgnoreCaseOrNitIgnoreCase(String nombre,
			String apellido, String dpi, String nit);

}
