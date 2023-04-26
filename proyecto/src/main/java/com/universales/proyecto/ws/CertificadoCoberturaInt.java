package com.universales.proyecto.ws;


import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.universales.proyecto.dto.CertificadoCoberturaDTO;
import com.universales.proyecto.entity.CertificadoCobertura;



@RestController
@RequestMapping("/auth/certificadocobertura")
@CrossOrigin
public interface CertificadoCoberturaInt {
	
	@GetMapping("/buscar")
	public List<CertificadoCobertura> buscar();

	
	@PostMapping("/guardar")
	CertificadoCobertura guardar(@RequestBody CertificadoCoberturaDTO certficadoCoberturas);
	
	@GetMapping("/paginar")
	Page<CertificadoCobertura>getCertificadosCoberturaPaginado(int page, int size);
}

