package com.universales.proyecto.ws;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.universales.proyecto.dto.CertificadosDTO;
import com.universales.proyecto.entity.Certificados;



@RestController
@RequestMapping("/auth/certificados")
@CrossOrigin
public interface CertificadosInt {
	
	@GetMapping("/buscar")
	public List<Certificados> buscar();

	@PostMapping("/guardar")
	Certificados guardar(@RequestBody CertificadosDTO certificados);
	
	@GetMapping("/paginar")
	Page<Certificados> getCertificadosPaginado(int page, int size);
}
