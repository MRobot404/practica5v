import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacturasService {
  private readonly URL = 'auth/facturas/';

  constructor(private http: HttpClient) { }

  verTodosPaginado(page: number, size: number): Observable<any> {
    const url = `${this.URL}paginar?page=${page}&size=${size}`;
    return this.http.get<any>(url);
  }

  mantenimientoFacturas(parametro: any, page: number, size: number): Observable<any> {
    const url = `${this.URL}mantenimiento/${parametro}/${page}/${size}`;
    return this.http.get<any>(url);
  }
}

