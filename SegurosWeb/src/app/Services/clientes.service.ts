import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private readonly URL = 'http://localhost:8585/clientes/';
  constructor(private http: HttpClient) { }

  guardarCliente(cliente: any) {

    return this.http
      .post<any>(
        this.URL + 'guardar',
        cliente
      )

  }
}
