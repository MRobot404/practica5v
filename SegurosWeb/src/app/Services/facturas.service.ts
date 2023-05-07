import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacturasService {
  private readonly URL = 'auth/facturas/';
  constructor(private http: HttpClient) { }

  verTodosPaginado(page: number, size: number): Observable<any> {
    return this.http
      .get<any>(this.URL + 'paginar?page=' + page + "&size=" + size);
  }

  mantenimientoFacturas(parametro:any, page:number, size:number): Observable<any>{
    return this.http
    .get<any>(this.URL+'mantenimiento/'+ parametro+'/'+page+'/'+size);
  }

}
