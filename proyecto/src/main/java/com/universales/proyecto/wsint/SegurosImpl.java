package com.universales.proyecto.wsint;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import com.universales.proyecto.dto.CertificadosDTO;
import com.universales.proyecto.dto.ParametrosBusquedaPolizaDTO;
import com.universales.proyecto.dto.SegurosDTO;
import com.universales.proyecto.entity.CertificadoCobertura;
import com.universales.proyecto.entity.CertificadoCoberturaPK;
import com.universales.proyecto.entity.Certificados;
import com.universales.proyecto.entity.Clientes;
import com.universales.proyecto.entity.Coberturas;
import com.universales.proyecto.entity.Facturas;
import com.universales.proyecto.entity.Seguros;
import com.universales.proyecto.repository.CertificadoCoberturaRepository;
import com.universales.proyecto.repository.CertificadosRepository;
import com.universales.proyecto.repository.ClientesRepository;
import com.universales.proyecto.repository.FacturasRepository;
import com.universales.proyecto.repository.SegurosRepository;
import com.universales.proyecto.ws.SegurosInt;




@Component
public class SegurosImpl implements SegurosInt{
	
	@Autowired
	SegurosRepository segurosRepository;
	
	@Autowired
	CertificadosRepository certificadosRepository;
	
	
	@Autowired
	CertificadoCoberturaRepository certificadoCoberturaRepository;
	
	@Autowired
	FacturasRepository facturasRepository;
	
	@Autowired
	ClientesRepository clientesRepository;
	
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public List<Seguros> buscar() {
		return segurosRepository.findAll();
	}
	

	@Override
	public Page<Seguros> getSegurosPaginado(int page, int size) {
		Pageable pageable=PageRequest.of(page, size);
		return segurosRepository.findAll(pageable);
	}
	

	@Override
	public Page<Seguros> buscarPorCampos(ParametrosBusquedaPolizaDTO  parametrosBusquedaPolizaDTO, int page, int size) {
	 Pageable pageable = PageRequest.of(page, size);
	 if(parametrosBusquedaPolizaDTO.getId()!=null) {
	 String idPoliza = parametrosBusquedaPolizaDTO.getId().toString();
		return segurosRepository.findById(idPoliza, pageable);
	 }else if(parametrosBusquedaPolizaDTO.getFechaInicio()!=null) {
		 return segurosRepository.findByfechaInicio(parametrosBusquedaPolizaDTO.getFechaInicio(), pageable);
	 }else if(parametrosBusquedaPolizaDTO.getFechaFin()!=null) {
		 return segurosRepository.findByfechaFin(parametrosBusquedaPolizaDTO.getFechaFin(), pageable);
	 }else if(parametrosBusquedaPolizaDTO.getNombre()!=null) {
		 String valor=parametrosBusquedaPolizaDTO.getNombre();
		 Clientes cliente = clientesRepository.findFirstByNombre(valor);
		 return segurosRepository.findBycodigoContratante(cliente.getId(), pageable);
	 }else if(parametrosBusquedaPolizaDTO.getNit()!=null) {
		 String valor=parametrosBusquedaPolizaDTO.getNit();
		 Clientes cliente = clientesRepository.findFirstByNit(valor);
		 return segurosRepository.findBycodigoContratante(cliente.getId(), pageable); 
	 }else if(parametrosBusquedaPolizaDTO.getDpi()!=null) {
		 String valor=parametrosBusquedaPolizaDTO.getDpi();
		 Clientes cliente = clientesRepository.findFirstByDpi(valor);
		 return segurosRepository.findBycodigoContratante(cliente.getId(), pageable); 
	 }
		else {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Párametros no proporcionados");
		}
	}
	

	
	@Override
	public Seguros agregarPoliza(SegurosDTO segurosDTO) {
		Date date=new Date();
		segurosDTO.setGrabacionFecha(date);
		segurosDTO.setEstado('A');
		
		
		List<CertificadosDTO> tempCertificados = segurosDTO.getCertificadosList();
		
		Seguros seguro = modelMapper.map(segurosDTO, Seguros.class);
		segurosRepository.save(seguro);
	
		List<Certificados> certificados = new ArrayList<>();
		
		for(CertificadosDTO certificado:tempCertificados) {
			certificado.setSeguroId(seguro.getId());
			certificado.setGrabacionFecha(date);
			certificado.setEstado('A');
			Certificados tempCert = modelMapper.map(certificado, Certificados.class);
			certificadosRepository.save(tempCert);
			certificados.add(tempCert);
		
		
		for(Coberturas cobertura:certificado.getCoberturasList()) {
			CertificadoCoberturaPK pkTemp = new CertificadoCoberturaPK();
			CertificadoCobertura detalleTemp = new CertificadoCobertura();
			
			pkTemp.setCertificados(tempCert.getId());
			pkTemp.setCoberturas(cobertura.getId());
			
			detalleTemp.setCertificadoCoberturaPK(pkTemp);
			detalleTemp.setEstado(seguro.getEstado());
			detalleTemp.setGrabacionFecha(date);
			
			certificadoCoberturaRepository.save(detalleTemp);
		}
		
		}
		
		Facturas factura=new Facturas();
		factura.setFecha(date);
		factura.setMonto(seguro.getPrimaTotal());
		factura.setEstado('A');
		factura.setGrabacionFecha(date);
		factura.setGrabacionUsuario("usuario 1");
		factura.setSeguroId(seguro.getId());
		factura.setClienteId(seguro.getCodigoContratante());
		
		facturasRepository.save(factura);
	
		seguro.setCertificadosList(certificados);
		return seguro;
		
	}

	
}
