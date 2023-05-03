import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SegurosService {
  private readonly URL = 'auth/seguros/';

  constructor(private http:HttpClient) { }

  mantenimientoSeguro(parametro:any, page:number, size:number): Observable<any>{
    return this.http
    .get<any>(this.URL+'mantenimiento/'+parametro+'/'+page+'/'+size);
  }
}
