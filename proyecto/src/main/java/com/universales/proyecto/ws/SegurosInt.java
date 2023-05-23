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

import com.universales.proyecto.dto.SegurosDTO;
import com.universales.proyecto.entity.Seguros;



@RestController
@RequestMapping("/auth/seguros")
@CrossOrigin
public interface SegurosInt {
	
	@GetMapping("/buscar")
	public List<Seguros>buscar();


	Seguros guardar(@RequestBody  SegurosDTO seguros);
	
	@GetMapping("/paginar")
	Page<Seguros>getSegurosPaginado(int page, int size);
	
	@GetMapping("/mantenimiento/{valor}/{page}/{size}")
	public Page<Seguros> buscarPorCampos(@PathVariable("valor") String valor,
		    @PathVariable("page") int page,
		    @PathVariable("size") int size);

	@PostMapping("/guardar")
	Seguros agregarPoliza( @RequestBody SegurosDTO segurosDTO);
	


}
