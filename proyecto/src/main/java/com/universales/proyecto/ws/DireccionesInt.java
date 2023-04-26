package com.universales.proyecto.ws;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.universales.proyecto.dto.DireccionesDTO;
import com.universales.proyecto.entity.Direcciones;


@RestController
@RequestMapping("/auth/direcciones")
@CrossOrigin
public interface DireccionesInt {

	@GetMapping("/buscar")
	public List<Direcciones>buscar();
	
	@PostMapping("/guardar")
	Direcciones guardar(@RequestBody DireccionesDTO direcciones);
	
	@GetMapping("/paginar")
	Page<Direcciones> getDireccionesPaginado(int page, int size);
}
