package com.universales.proyecto.repository;

import java.io.Serializable;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.universales.proyecto.entity.Siniestros;



@Repository("sniestrosRepository")
public interface SiniestrosRepository extends JpaRepository<Siniestros, Serializable> {

	Page<Siniestros>findAll(Pageable pageable);
	
	@Query(value="SELECT * FROM SINIESTROS s INNER JOIN CERTIFICADOS c ON s.CERTIFICADO_ID = c.ID INNER JOIN SEGUROS se ON c.SEGURO_ID = se.ID WHERE se.ID LIKE %:valor%", nativeQuery=true)
	Page<Siniestros>findByPoliza(String valor, Pageable pageable);
}
