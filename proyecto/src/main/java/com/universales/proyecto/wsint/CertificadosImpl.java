package com.universales.proyecto.wsint;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import com.universales.proyecto.dto.CertificadosDTO;
import com.universales.proyecto.entity.Certificados;
import com.universales.proyecto.repository.CertificadosRepository;
import com.universales.proyecto.ws.CertificadosInt;



@Component
public class CertificadosImpl implements CertificadosInt{

	@Autowired
	CertificadosRepository certificadosRepository;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Override
	public Certificados guardar(CertificadosDTO certificados) {
	Certificados certificado=modelMapper.map(certificados, Certificados.class);
	return certificadosRepository.save(certificado);
	}

	@Override
	public List<Certificados> buscar() {
		return certificadosRepository.findAll();
	}
	
	@Override
	public Page<Certificados>getCertificadosPaginado(int page, int size){
		Pageable pagebale=PageRequest.of(page, size);
		return certificadosRepository.findAll(pagebale);
		
	}

}
