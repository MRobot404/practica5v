package com.universales.proyecto.wsint;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import com.universales.proyecto.dto.SiniestrosDTO;
import com.universales.proyecto.entity.Siniestros;
import com.universales.proyecto.repository.SiniestrosRepository;
import com.universales.proyecto.ws.SiniestrosInt;



@Component
public class SiniestrosImpl implements SiniestrosInt {
	
	@Autowired
	SiniestrosRepository siniestrosRepository;
	
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public List<Siniestros> buscar() {
		return siniestrosRepository.findAll();
	}

	@Override
	public Siniestros guardar(SiniestrosDTO siniestros) {
		Siniestros siniestro=modelMapper.map(siniestros,Siniestros.class);
		return siniestrosRepository.save(siniestro);
	}

	@Override
	public Page<Siniestros> getSiniestrosPaginado(int page, int size) {
		Pageable pageable=PageRequest.of(page, size);
		return siniestrosRepository.findAll(pageable);
	}

}
