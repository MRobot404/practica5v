package com.universales.proyecto.repository;

import java.io.Serializable;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.universales.proyecto.entity.Facturas;



@Repository("facturasRepository")
public interface FacturasRepository extends JpaRepository<Facturas,Serializable>{

	Page<Facturas>findAll(Pageable pageable);
	
	@Query(value = "SELECT f.* FROM facturas INNER JOIN seguros  ON facturas.seguro_id = seguros.id INNER JOIN clientes  ON facturas.cliente_id = clientes.id WHERE ( clientes.nit||seguros.id ) like %?1%", nativeQuery=true)
	Page<Facturas> findByNitOrPoliza(String valor, Pageable pageable);

}
