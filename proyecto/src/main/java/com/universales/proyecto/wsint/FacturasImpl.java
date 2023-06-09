package com.universales.proyecto.wsint;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import com.universales.proyecto.dto.FacturasDTO;
import com.universales.proyecto.entity.Facturas;
import com.universales.proyecto.repository.FacturasRepository;
import com.universales.proyecto.ws.FacturasInt;



@Component
public class FacturasImpl  implements FacturasInt{
	
	@Autowired
	FacturasRepository facturasRepository;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Override
	public List<Facturas> buscar() {
		return facturasRepository.findAll();
	}
	
	@Override
	public Facturas guardar(FacturasDTO facturas) {
		Facturas factura=modelMapper.map(facturas, Facturas.class);
		return facturasRepository.save(factura);
	}

	@Override
	public Page<Facturas> getFacturasPaginado(int page, int size) {
		Pageable pageable=PageRequest.of(page, size);
		return facturasRepository.findAll(pageable);
	}
	
	

}
