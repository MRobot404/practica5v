import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SiniestrosService {
  private readonly URL = 'auth/siniestros/';

  constructor(private http: HttpClient) { }

  guardarSiniestro(siniestro: any): Observable<any> {
    return this.http.post<any>(`${this.URL}guardar`, siniestro);
  }

  verTodosPaginado(page: number, size: number): Observable<any> {
    const url = `${this.URL}paginar?page=${page}&size=${size}`;
    return this.http.get<any>(url);
  }

  mantenimientoSiniestro(parametro: any, page: number, size: number): Observable<any> {
    const url = `${this.URL}mantenimiento/${parametro}/${page}/${size}`;
    return this.http.get<any>(url);
  }
}
