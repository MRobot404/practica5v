package com.universales.proyecto.wsint;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Component;

import com.universales.proyecto.dto.CertificadosDTO;
import com.universales.proyecto.dto.CoberturasDTO;
import com.universales.proyecto.dto.MantenimientoSeguroDto;
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
import com.universales.proyecto.repository.CoberturasRepository;
import com.universales.proyecto.repository.FacturasRepository;
import com.universales.proyecto.repository.SegurosRepository;
import com.universales.proyecto.ws.SegurosInt;

@Component
public class SegurosImpl implements SegurosInt {

	@Autowired
	SegurosRepository segurosRepository;

	@Autowired
	CertificadosRepository certificadosRepository;

	@Autowired
	CertificadoCoberturaRepository certificadoCoberturaRepository;
	
	@Autowired
	CoberturasRepository coberturasRepository;

	@Autowired
	FacturasRepository facturasRepository;

	@Autowired
	ClientesRepository clientesRepository;

	@Autowired
	NamedParameterJdbcTemplate npjt;

	@Autowired
	private ModelMapper modelMapper;

	@Override
	public List<Seguros> buscar() {
		return segurosRepository.findAll();
	}

	@Override
	public Page<Seguros> getSegurosPaginado(int page, int size) {
		Pageable pageable = PageRequest.of(page, size);
		return segurosRepository.findAll(pageable);
	}

	@Override
	public ResponseEntity<List<MantenimientoSeguroDto>> mantenimiento(String busqueda, String fechaInicio,
			String fechaFin) {
		List<MantenimientoSeguroDto> result = new ArrayList<>();
		boolean bandera = false;

		String query = "SELECT seg.id, usr.nit, CONCAT(usr.nombre, CONCAT(' ', usr.apellido)) as CLIENTE, usr.DPI, seg.tipo, seg.fecha_inicio, seg.fecha_fin, seg.prima_total, seg.suma_asegurada, seg.estado "
				+ "FROM SEGUROS seg " + "INNER JOIN CLIENTES usr ON seg.codigo_contratante = usr.id ";

		if (!busqueda.equals("") && !fechaInicio.equals("") && !fechaFin.equals("")) {
			busqueda = '%' + busqueda + '%';
			query += "WHERE LOWER(usr.nombre||usr.apellido||usr.NIT||usr.DPI||seg.id||usr.apellido||usr.nombre) LIKE :busqueda ";
			query += "AND seg.fecha_inicio BETWEEN TO_DATE(:fechaInicio, 'YYYY-MM-DD') AND TO_DATE(:fechaFin, 'YYYY-MM-DD')";
		} else if (!busqueda.equals("")) {
			busqueda = '%' + busqueda + '%';
			query += "WHERE LOWER(usr.nombre||usr.apellido||usr.NIT||usr.DPI||seg.id||usr.apellido||usr.nombre) LIKE :busqueda ";
		} else if (!fechaInicio.equals("") && !fechaFin.equals("")) {
			query += "WHERE seg.fecha_inicio BETWEEN TO_DATE(:fechaInicio, 'YYYY-MM-DD') AND TO_DATE(:fechaFin, 'YYYY-MM-DD')";
		} else {
			bandera = true;
		}
		if (bandera) {
			return new ResponseEntity<>(result, HttpStatus.OK);
		}
		SqlParameterSource sps = new MapSqlParameterSource().addValue("busqueda", busqueda)
				.addValue("fechaInicio", fechaInicio).addValue("fechaFin", fechaFin);

		List<Map<String, Object>> temp = npjt.queryForList(query, sps);

		for (Map<String, Object> coso : temp) {
			MantenimientoSeguroDto tempResult = modelMapper.map(coso, MantenimientoSeguroDto.class);
			result.add(tempResult);
		}

		return new ResponseEntity<>(result, HttpStatus.OK);
	}

	@Override
	public Seguros agregarPoliza(SegurosDTO segurosDTO) {
		Date date = new Date();
		segurosDTO.setGrabacionFecha(date);
		segurosDTO.setEstado('A');

		List<CertificadosDTO> tempCertificados = segurosDTO.getCertificadosList();

		Seguros seguro = modelMapper.map(segurosDTO, Seguros.class);
		segurosRepository.save(seguro);

		List<Certificados> certificados = new ArrayList<>();

		for (CertificadosDTO certificado : tempCertificados) {
			certificado.setSeguroId(seguro.getId());
			certificado.setGrabacionFecha(date);
			certificado.setEstado('A');
			Certificados tempCert = modelMapper.map(certificado, Certificados.class);
			certificadosRepository.save(tempCert);
			certificados.add(tempCert);

			for (CoberturasDTO cobertura : certificado.getCoberturasList()) {
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

		Facturas factura = new Facturas();
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
	
	@Override
	public ResponseEntity<SegurosDTO>verId(BigDecimal id){
		
		Seguros tempSeguro = segurosRepository.findById(id);

	List<CertificadosDTO> certificadosDTO = new ArrayList<>();
	
	for(Certificados certificado: tempSeguro.getCertificadosList()) {
	   CertificadosDTO tempCert = modelMapper.map(certificado, CertificadosDTO.class);
	   List<CertificadoCobertura> detCoberturas= certificadoCoberturaRepository.findAllByCertificadoId(tempCert.getId());
	   List<CoberturasDTO> coberturas = new ArrayList<>();
	   
	   
	   for(CertificadoCobertura tempDetCobertura: detCoberturas) {
		   Coberturas tempCobertura = coberturasRepository.findById(tempDetCobertura.getCertificadoCoberturaPK().getCoberturas());
		   CoberturasDTO cobertura = modelMapper.map(tempCobertura, CoberturasDTO.class);
		   coberturas.add(cobertura);
	   }
	   
	   Clientes tempContratante = clientesRepository.findById(certificado.getCodigoContratante());
	   Clientes tempAsegurado = clientesRepository.findById(certificado.getCodigoAsegurado());
	   
	   tempCert.setNombreContratante(tempContratante.getNombre()+" "+tempContratante.getApellido());
	   tempCert.setNombreAsegurado(tempAsegurado.getNombre()+" "+tempAsegurado.getApellido());
	   
	   tempCert.setCoberturasList(coberturas);
	   certificadosDTO.add(tempCert);
	}
	
	SegurosDTO seguro = modelMapper.map(tempSeguro, SegurosDTO.class);
	
	Clientes tempContratante = clientesRepository.findById(tempSeguro.getCodigoContratante());
	
	seguro.setNombreContratanteP(tempContratante.getNombre()+" "+tempContratante.getApellido());
	
	seguro.setCertificadosList(certificadosDTO);
	
	
	return new ResponseEntity<>(seguro,HttpStatus.OK);
	}

}
