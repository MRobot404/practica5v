package com.universales.proyecto.wsint;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.universales.proyecto.dto.DireccionesDTO;
import com.universales.proyecto.entity.Direcciones;
import com.universales.proyecto.repository.DireccionesRepository;
import com.universales.proyecto.ws.DireccionesInt;



@Component
public class DireccionesImpl implements DireccionesInt {
	
	@Autowired
	DireccionesRepository direccionesRepository;
	
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public List<Direcciones> buscar() {
		return direccionesRepository.findAll();
	}
	
	@Override
	public Direcciones guardar(DireccionesDTO direcciones) {
		Direcciones direccion= modelMapper.map(direcciones,Direcciones.class);
		return direccionesRepository.save(direccion);
	}

}
