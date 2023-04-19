package com.universales.proyecto.wsint;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import com.universales.proyecto.dto.CoberturasDTO;
import com.universales.proyecto.entity.Coberturas;
import com.universales.proyecto.repository.CoberturasRepository;
import com.universales.proyecto.ws.CoberturasInt;



@Component
public class CoberturasImpl implements CoberturasInt {

	@Autowired
	CoberturasRepository coberturasRepository;
	
	@Autowired
	private ModelMapper modelMapper;
	

	@Override
	public List<Coberturas> buscar() {
	return coberturasRepository.findAll();
	}
	
	@Override
	public Coberturas guardar(CoberturasDTO coberturas) {
		Coberturas cobertura=modelMapper.map(coberturas, Coberturas.class);
		return coberturasRepository.save(cobertura);
	}

	@Override
	public Page<Coberturas> getCoberturasPaginado(int page, int size) {
		Pageable pageable=PageRequest.of(page, size);
		return coberturasRepository.findAll(pageable);
	}
	
	
	
}