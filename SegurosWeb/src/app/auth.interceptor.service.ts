import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, finalize, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor() { /* TODO document why this constructor is empty */ }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let temp: any = localStorage.getItem('usuario');
    if (temp) {
      let user: any = JSON.parse(temp);
      const token: string = 'Bearer ' + user.token.token;

      const authReq = request.clone({
        headers: request.headers.set('Authorization', token),
      });
      return next.handle(authReq).pipe(
        catchError(
          err=>{
            if(err.status == 401){
              window.location.href = '/login';
            }
            if(err.error.msg){
              alert(err.error.msg); //Trono bonito
            }else{
              alert(err.message);  //Trono feo
            }
            return throwError(err);
          }
        )
      );
    }

    return next.handle(request);
  }
}
