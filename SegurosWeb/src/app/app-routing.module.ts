import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CrearClienteComponent } from './crear-cliente/crear-cliente.component';
import { MantenerClienteComponent } from './mantener-cliente/mantener-cliente.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'crearCliente', component:CrearClienteComponent},
  {path:'mantenerCliente',component:MantenerClienteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
