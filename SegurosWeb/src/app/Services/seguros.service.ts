import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SegurosService {
  private readonly URL = 'auth/seguros/';

  constructor(private http: HttpClient) { }

  mantenimientoSeguro(busqueda: string, fechaInicio: string, fechaFin: string) {
    let queryParams = new HttpParams();
    queryParams = queryParams
      .append("busqueda", busqueda)
      .append("fechaInicio", fechaInicio)
      .append("fechaFin", fechaFin);

    return this.http.get<any>(`${this.URL}mantenimiento`, { params: queryParams })
  }

  guardarSeguro(seguro: any) {
    return this.http.post<any>(`${this.URL}guardar`, seguro);
  }

  buscarPorId(id: any) {
    return this.http.get<any>(`${this.URL}buscar/por/${id}`);
  }
  
  
}
