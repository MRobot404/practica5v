package com.universales.proyecto.repository;

import java.io.Serializable;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.universales.proyecto.entity.Facturas;

@Repository("facturasRepository")
public interface FacturasRepository extends JpaRepository<Facturas, Serializable> {

	Page<Facturas> findAll(Pageable pageable);

	@Query(value="SELECT *  FROM SEGUNIS.FACTURAS INNER JOIN SEGUNIS.SEGUROS ON SEGUNIS.FACTURAS.SEGURO_ID = SEGUNIS.SEGUROS.ID INNER JOIN SEGUNIS.CLIENTES ON SEGUNIS.FACTURAS.CLIENTE_ID = SEGUNIS.CLIENTES.ID WHERE (SEGUNIS.CLIENTES.NIT || SEGUNIS.SEGUROS.ID) LIKE %:valor%", nativeQuery = true)
	Page<Facturas> findByNitOrPoliza(String valor, Pageable pageable);
}
