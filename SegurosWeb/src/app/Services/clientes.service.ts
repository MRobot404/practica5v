import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private readonly URL = 'auth/clientes/';
  constructor(private http: HttpClient) { }

  guardarCliente(cliente: any) {
    return this.http
      .post<any>(
        this.URL + 'guardar',
        cliente
      )
  }

  mantenimientoCliente(parametro: any, page: number, size: number): Observable<any> {
    return this.http
      .get<any>(this.URL + 'mantenimiento/' + parametro + '/' + page + '/' + size);
  }

  verTodoPaginado(page:number, size:number): Observable<any>{
    return this.http
    .get<any>(this.URL+'paginar?page='+page+"&size="+size);
  }
}
