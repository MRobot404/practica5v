package com.universales.proyecto.ws;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.universales.proyecto.dto.SiniestrosDTO;
import com.universales.proyecto.entity.Siniestros;



@RestController
@RequestMapping("/auth/siniestros")
@CrossOrigin
public interface SiniestrosInt {

	@GetMapping("/buscar")
	public List<Siniestros>buscar();
	
	@PostMapping("/guardar")
	Siniestros guardar(@RequestBody SiniestrosDTO siniestros);
	
	@GetMapping("/paginar")
	Page<Siniestros>getSiniestrosPaginado(int page, int size);
}
