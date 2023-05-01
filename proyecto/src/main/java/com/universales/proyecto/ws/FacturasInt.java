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

import com.universales.proyecto.dto.FacturasDTO;
import com.universales.proyecto.entity.Facturas;





@RestController
@RequestMapping("/auth/facturas")
@CrossOrigin
public interface FacturasInt {
	
	@GetMapping("/buscar")
	public List<Facturas>buscar();

	@PostMapping("/guardar")
	Facturas guardar(@RequestBody FacturasDTO facturas);
	
	@GetMapping("/paginar")
	Page<Facturas>getFacturasPaginado(int page, int size);
	
	@GetMapping("/mantenimiento/{valor}/{page}/{size}")
	public Page<Facturas>buscarPorCampos(@PathVariable("valor") String valor,
		    @PathVariable("page") int page,
		    @PathVariable("size") int size);

}
