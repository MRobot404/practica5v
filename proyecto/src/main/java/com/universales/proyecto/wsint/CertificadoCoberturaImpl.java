package com.universales.proyecto.wsint;


import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import com.universales.proyecto.dto.CertificadoCoberturaDTO;
import com.universales.proyecto.entity.CertificadoCobertura;
import com.universales.proyecto.entity.CertificadoCoberturaPK;
import com.universales.proyecto.repository.CertificadoCoberturaRepository;
import com.universales.proyecto.ws.CertificadoCoberturaInt;


@Component
public class CertificadoCoberturaImpl implements CertificadoCoberturaInt {


	
	@Autowired
	CertificadoCoberturaRepository certificadoCoberturaRepository;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Override
	public CertificadoCobertura guardar(CertificadoCoberturaDTO certficadoCoberturas) {
		CertificadoCobertura certificadoCobertura=modelMapper.map(certficadoCoberturas, CertificadoCobertura.class);
		CertificadoCoberturaPK temporalCCPK=new CertificadoCoberturaPK();
		temporalCCPK.setCertificados(certficadoCoberturas.getCertificados().getId());
		temporalCCPK.setCoberturas(certficadoCoberturas.getCoberturas().getId());
		certificadoCobertura.setCertificadoCoberturaPK(temporalCCPK);
		return certificadoCoberturaRepository.save(certificadoCobertura);
	}

	@Override
	public List<CertificadoCobertura> buscar() {
		return certificadoCoberturaRepository.findAll();
	}

	@Override
	public Page<CertificadoCobertura> getCertificadosCoberturaPaginado(int page, int size) {
		Pageable pagebale=PageRequest.of(page, size);
		return certificadoCoberturaRepository.findAll(pagebale);
	}

}
