import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SiniestrosService {
  private readonly URL = 'auth/siniestros/';
  constructor(private http: HttpClient) { }

  verTodosPaginado(page: number, size: number): Observable<any> {
    return this.http
      .get<any>(this.URL + 'paginar?page=' + page + "&size=" + size);
  }
}