import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { CrearClienteComponent } from './crear-cliente/crear-cliente.component';
import { ToastModule } from 'primeng/toast';
import { HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import { MantenerClienteComponent } from './mantener-cliente/mantener-cliente.component';
import { DropdownModule } from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenubarModule } from 'primeng/menubar';
import { ConsultarFacturaComponent } from './consultar-factura/consultar-factura.component';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { MessagesModule } from 'primeng/messages';
import { PaginatorModule } from 'primeng/paginator';
import { ConsultarSiniestroComponent } from './consultar-siniestro/consultar-siniestro.component';
import { CrearCoberturaComponent } from './crear-cobertura/crear-cobertura.component';
import {  InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MantenerCoberturaComponent } from './mantener-cobertura/mantener-cobertura.component';
import { CrearSiniestroComponent } from './crear-siniestro/crear-siniestro.component';
import { ConsultarPolizasComponent } from './consultar-polizas/consultar-polizas.component';
import { EmitirPolizaComponent } from './emitir-poliza/emitir-poliza.component';
import { DialogModule } from 'primeng/dialog';
import { LoginComponent } from './login/login.component';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { AuthInterceptorService } from './auth.interceptor.service';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavbarComponent,
    HomeComponent,
    CrearClienteComponent,
    MantenerClienteComponent,
    ConsultarFacturaComponent,
    ConsultarSiniestroComponent,
    CrearCoberturaComponent,
    MantenerCoberturaComponent,
    CrearSiniestroComponent,
    ConsultarPolizasComponent,
    EmitirPolizaComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    ToastModule,
    HttpClientModule,
    DropdownModule,
    BrowserAnimationsModule,
    MenubarModule,
    ButtonModule,
    TableModule,
    PaginatorModule,
    MessagesModule,
    ToastModule,
    PasswordModule,
    InputTextareaModule,
    InputSwitchModule,
    DialogModule,
    DividerModule,
    InputTextModule
  ],
  providers: [  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
