package com.universales.proyecto.security;

import javax.servlet.Filter;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FilterConfig {

	/**
	 * 
	 * Crea una instancia del filtro Jwt y lo registra en la configuración de
	 * filtros.
	 * 
	 * @return El bean de configuración del filtro Jwt.
	 **/
	
	@Bean
	FilterRegistrationBean<Filter> jwtFilter() {
		FilterRegistrationBean<Filter> filter = new FilterRegistrationBean<>();
		filter.setFilter(new JwtFilter());
        filter.addUrlPatterns("/auth/*");
		return filter;
	}
}
