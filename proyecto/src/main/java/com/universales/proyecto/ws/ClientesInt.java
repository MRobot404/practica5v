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

import com.universales.proyecto.dto.ClientesDTO;
import com.universales.proyecto.entity.Clientes;

@RestController
@RequestMapping("/auth/clientes")
@CrossOrigin
public interface ClientesInt {

	@GetMapping("/buscar")
	public List<Clientes> buscar();

	@PostMapping("/guardar")
	Clientes guardar(@RequestBody ClientesDTO clientes);

	@GetMapping("/paginar")
	Page<Clientes> getClientesPaginado(int page, int size);


	@GetMapping("/mantenimiento/{valor}/{page}/{size}")
	public Page<Clientes> buscarPorCampos(@PathVariable("valor") String valor,
		    @PathVariable("page") int page,
		    @PathVariable("size") int size);
}
