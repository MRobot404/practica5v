package com.universales.proyecto.repository;

import java.io.Serializable;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.universales.proyecto.entity.Certificados;



@Repository("certificadosRepository")
public interface CertificadosRepository extends JpaRepository<Certificados, Serializable>{

}
