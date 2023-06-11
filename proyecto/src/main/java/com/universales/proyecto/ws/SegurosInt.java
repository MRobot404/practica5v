package com.universales.proyecto.ws;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.universales.proyecto.dto.MantenimientoSeguroDto;
import com.universales.proyecto.dto.SegurosDTO;
import com.universales.proyecto.entity.Seguros;

@RestController
@RequestMapping("/auth/seguros")
@CrossOrigin
public interface SegurosInt {

	@GetMapping("/buscar")
	public List<Seguros> buscar();

	@GetMapping("/paginar")
	Page<Seguros> getSegurosPaginado(int page, int size);

	@PostMapping("/guardar")
	Seguros agregarPoliza(@RequestBody SegurosDTO segurosDTO);

	@GetMapping("/mantenimiento")
	public ResponseEntity<List<MantenimientoSeguroDto>> mantenimiento(
			@RequestParam(name = "busqueda", required = false) String busqueda,
			@RequestParam(name = "fechaInicio", required = false) String fechaInicio,
			@RequestParam(name = "fechaFin", required = false) String fechaFin);

	@GetMapping("/buscar/por/{id}")
	ResponseEntity<SegurosDTO> verId(@PathVariable BigDecimal id);

}
