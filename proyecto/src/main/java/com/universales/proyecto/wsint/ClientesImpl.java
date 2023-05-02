package com.universales.proyecto.wsint;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import com.universales.proyecto.dto.ClientesDTO;
import com.universales.proyecto.entity.Clientes;
import com.universales.proyecto.entity.Direcciones;
import com.universales.proyecto.repository.ClientesRepository;
import com.universales.proyecto.repository.DireccionesRepository;
import com.universales.proyecto.ws.ClientesInt;

@Component
public class ClientesImpl implements ClientesInt {

	@Autowired
	ClientesRepository clientesRepository;
	
	@Autowired
	DireccionesRepository direccionesRepository;

	@Autowired
	private ModelMapper modelMapper;

	@Override
	public List<Clientes> buscar() {
		return clientesRepository.findAll();
	}

	@Override
	public Clientes guardar(ClientesDTO clientes) {
	    Clientes cliente = modelMapper.map(clientes, Clientes.class);
	    List<Direcciones> direcciones = cliente.getDireccionesList();
		cliente.setDireccionesList(null);
		clientesRepository.save(cliente);
	    for(Direcciones direccion: direcciones) {
	    	direccion.setClienteId(cliente.getId());
	    	System.out.println(cliente.getId());
	    }
	    direccionesRepository.saveAll(direcciones);
	    cliente.setDireccionesList(direcciones);
	    return cliente;
	}


	@Override
	public Page<Clientes> getClientesPaginado(int page, int size) {
		Pageable pageable = PageRequest.of(page, size);
		return clientesRepository.findAll(pageable);
	}

	@Override
	public Page<Clientes> buscarPorCampos(String valor, int page, int size) {
	 Pageable pageable = PageRequest.of(page, size);
		String valorMayuscula = valor.toUpperCase();
		String valorConPorcentaje =  valorMayuscula.replace(" ", "%");
		return clientesRepository.findByNombreOrNitOrDpi(valorConPorcentaje, pageable);
	}

}