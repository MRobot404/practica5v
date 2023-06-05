import { Component, OnInit} from '@angular/core';
import { LoginService } from '../Services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit  {

  usuario: any = {};
  errorInicio: boolean = false;
  usuarioLogueado: boolean = false;
  ngOnInit(): void {
    localStorage.clear();
    this.usuarioLogueado = false;
  }


  constructor(private loginServices: LoginService) {}

  login() {
    let formulario: any = document.getElementById('login');
    let formularioValido: boolean = formulario.reportValidity();
    this.errorInicio = false;
    console.log(this.usuario);
    if (formularioValido) {
      this.loginServices
        .login(this.usuario)
        .subscribe((response: any) => this.loginProcess(response));
    }
  }

  loginProcess(user: any) {
    if (user.token) {
      localStorage.setItem('usuario', JSON.stringify(user));
      this.usuarioLogueado = true;
      localStorage.setItem('usuarioLogueado', this.usuarioLogueado.toString());
      location.href = '/home';
    } else {
      this.errorInicio = true;
    }
  }
}
