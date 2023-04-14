package com.universales.proyecto.wsint;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.universales.proyecto.dto.SegurosDTO;
import com.universales.proyecto.entity.Seguros;
import com.universales.proyecto.repository.SegurosRepository;
import com.universales.proyecto.ws.SegurosInt;




@Component
public class SegurosImpl implements SegurosInt{
	
	@Autowired
	SegurosRepository segurosRepository;
	
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public List<Seguros> buscar() {
		return segurosRepository.findAll();
	}
	
	@Override
	public Seguros guardar(SegurosDTO seguros) {
		Seguros seguro=modelMapper.map(seguros, Seguros.class);
		return segurosRepository.save(seguro);
	}

}
