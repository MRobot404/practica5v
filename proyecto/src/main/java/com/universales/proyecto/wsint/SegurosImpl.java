package com.universales.proyecto.wsint;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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

	@Override
	public Page<Seguros> getSegurosPaginado(int page, int size) {
		Pageable pageable=PageRequest.of(page, size);
		return segurosRepository.findAll(pageable);
	}

	@Override
	public Page<Seguros> buscarPorCampos(String valor, int page, int size) {
	 Pageable pageable = PageRequest.of(page, size);
		String valorMayuscula = valor.toUpperCase();
		String valorConPorcentaje =  valorMayuscula.replace(" ", "%");
		return segurosRepository.findById(valorConPorcentaje, pageable);
	}

	
}
