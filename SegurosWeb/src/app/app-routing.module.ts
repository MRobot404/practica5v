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

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'crearCliente', component:CrearClienteComponent},
  {path:'mantenerCliente',component:MantenerClienteComponent},
  {path:'consultarFactura',component:ConsultarFacturaComponent},
  {path:'consultarSiniestro',component:ConsultarSiniestroComponent},
  {path:'crearCobertura', component:CrearCoberturaComponent},
  {path:'mantenerCobertura', component:MantenerCoberturaComponent},
  {path:'crearSiniestro', component:CrearSiniestroComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
