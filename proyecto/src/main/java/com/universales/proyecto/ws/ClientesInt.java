package com.universales.proyecto.ws;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
	
	@GetMapping("/paginar")
	Page<Clientes> getClientesPaginado(int page, int size);
	
	@GetMapping("mantenimiento")
	public List<Clientes> buscarPorCampos(@RequestParam(required = false) String nombre, @RequestParam(required = false) String apellido, 
			@RequestParam(required = false) String dpi, @RequestParam(required = false) String nit);
	
}
