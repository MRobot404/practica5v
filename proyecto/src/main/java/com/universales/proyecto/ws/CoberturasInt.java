package com.universales.proyecto.ws;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.universales.proyecto.dto.CoberturasDTO;
import com.universales.proyecto.entity.Coberturas;



@RestController
@RequestMapping("/auth/coberturas")
@CrossOrigin
public interface CoberturasInt {

	@GetMapping("/buscar")
	public List<Coberturas> buscar();
	
	@PostMapping("/guardar")
	Coberturas guardar(@RequestBody CoberturasDTO coberturas);
	
	@GetMapping("/paginar")
	Page<Coberturas> getCoberturasPaginado(int page, int size);
	
	@GetMapping("/mantenimiento/{valor}/{page}/{size}")
	public Page<Coberturas> buscarPorCampos(@PathVariable("valor") String valor,
		    @PathVariable("page") int page,
		    @PathVariable("size") int size);
}
