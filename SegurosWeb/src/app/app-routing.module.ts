import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CrearClienteComponent } from './crear-cliente/crear-cliente.component';
import { MantenerClienteComponent } from './mantener-cliente/mantener-cliente.component';
import { ConsultarFacturaComponent } from './consultar-factura/consultar-factura.component';
import { ConsultarSiniestroComponent } from './consultar-siniestro/consultar-siniestro.component';
import { CrearCoberturaComponent } from './crear-cobertura/crear-cobertura.component';
import { MantenerCoberturaComponent } from './mantener-cobertura/mantener-cobertura.component';
import { CrearSiniestroComponent } from './crear-siniestro/crear-siniestro.component';
import { ConsultarPolizasComponent } from './consultar-polizas/consultar-polizas.component';
import { EmitirPolizaComponent } from './emitir-poliza/emitir-poliza.component';
import { LoginComponent } from './login/login.component';
import { GuardGuard } from './guard.guard';

const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'login', component:LoginComponent},
  {path:'home', component:HomeComponent ,canActivate: [GuardGuard] },
  {path:'crearCliente', component:CrearClienteComponent,canActivate: [GuardGuard]},
  {path:'mantenerCliente',component:MantenerClienteComponent,canActivate: [GuardGuard]},
  {path:'consultarFactura',component:ConsultarFacturaComponent,canActivate: [GuardGuard]},
  {path:'consultarSiniestro',component:ConsultarSiniestroComponent,canActivate: [GuardGuard]},
  {path:'crearCobertura', component:CrearCoberturaComponent,canActivate: [GuardGuard]},
  {path:'mantenerCobertura', component:MantenerCoberturaComponent,canActivate: [GuardGuard]},
  {path:'crearSiniestro', component:CrearSiniestroComponent,canActivate: [GuardGuard]},
  {path:'consultarPoliza', component:ConsultarPolizasComponent,canActivate: [GuardGuard]},
  {path:'emitirPoliza', component:EmitirPolizaComponent,canActivate: [GuardGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
