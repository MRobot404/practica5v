package com.universales.proyecto.ws;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.universales.proyecto.dto.ClientesDTO;
import com.universales.proyecto.entity.Clientes;



@RestController
@RequestMapping("/clientes")
@CrossOrigin
public interface ClientesInt {

	@GetMapping("/buscar")
	public List<Clientes> buscar();

	@PostMapping("/guardar")
	Clientes guardar(@RequestBody ClientesDTO clientes);
	
}
