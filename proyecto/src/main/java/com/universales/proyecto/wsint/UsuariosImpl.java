package com.universales.proyecto.wsint;

import java.nio.file.attribute.UserPrincipalNotFoundException;
import java.util.List;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestBody;

import com.universales.proyecto.dto.UsuariosDTO;
import com.universales.proyecto.entity.Usuarios;
import com.universales.proyecto.repository.UsuariosRepository;
import com.universales.proyecto.security.JwtGeneratorInterface;
import com.universales.proyecto.ws.UsuariosInt;


@Component
public class UsuariosImpl implements UsuariosInt{

  
	@Autowired
	UsuariosRepository usuariosRepository;
	
	@Autowired
	JwtGeneratorInterface jwtGenerator;
	
	@Autowired
	private ModelMapper modelMapper;
	
	private static final Log LOG = LogFactory.getLog(UsuariosImpl.class);
	
	@Override
	public List<Usuarios> buscar() {
		return usuariosRepository.findAll();
	}

	@Override
	public Usuarios guardar(UsuariosDTO usuarios) {
	Usuarios usuario = modelMapper.map(usuarios, Usuarios.class);
		return usuariosRepository.save(usuario);
	}
	
	
	@Override
	public ResponseEntity<Object> loginUser(@RequestBody UsuariosDTO usuario) {
		try {
			if (usuario.getUsuario() == null || usuario.getContrasena() == null) {
				throw new UserPrincipalNotFoundException("Usuario o contraseña vacio");
			}
			Usuarios userData = getUsuarioByUsuarioAndContrasena(usuario.getUsuario(), usuario.getContrasena());
			if (userData == null) {
				throw new UserPrincipalNotFoundException("Usuario o contraseña incorrectos");
			}
			usuario.setToken(jwtGenerator.generateToken(userData));
			usuario.setContrasena(null);
			return new ResponseEntity<>( usuario, HttpStatus.OK);
		} catch (UserPrincipalNotFoundException e) {
			LOG.error(e);
			return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
		}
	}
	
	/**
	*
	*Busca un usuario en la base de datos que coincida con el nombre de usuario y la contraseña proporcionados.
	* @param usuario el nombre del usuario a buscar.
	* @param contrasena la contraseña del usuario a buscar.
	* @return un objeto Usuario que corresponde al usuario encontrado.
	* @throws UserPrincipalNotFoundException si no se encuentra ningún usuario que coincida con los parámetros proporcionados.
	*/
	
	@Override
	public Usuarios getUsuarioByUsuarioAndContrasena(String usuario,String contrasena) throws UserPrincipalNotFoundException {
	Usuarios user= usuariosRepository.findByUsuarioAndContrasena(usuario, contrasena);
	if(user==null) {
		throw new UserPrincipalNotFoundException("Usuario o password invalido");
	}
	return user;
		
		
	}

}
