import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoberturasService {
  private readonly URL = 'auth/coberturas/';
  constructor(private http: HttpClient) { }

  guardarCobertura(cobertura: any) {

    return this.http
      .post<any>(
        this.URL + 'guardar',
        cobertura
      )

  }
  mantenimientoCliente(parametro: any, page: number, size: number): Observable<any> {
    return this.http
      .get<any>(this.URL + 'mantenimiento/' + parametro + '/' + page + '/' + size);
  }
}
