import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import { ClientesService } from '../Services/clientes.service';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.css'],
  providers: [MessageService]
})
export class CrearClienteComponent implements OnInit {
  cliente: any = {};
  opciones:any = [];

  constructor(private messageService: MessageService,private clientesService: ClientesService) { }
  ngOnInit() {
    this.opciones =[
      {estado:'A'},
      {estado:'I'},
    ];
  }

  

  guardar() {
    
    let formulario:any=document.getElementById("formulario");
    let valido=formulario.reportValidity();
    if(valido){ 
    this.clientesService.guardarCliente(this.cliente).subscribe(
      (response: any) => {
        setTimeout(() => { 
          this.showSuccessClientes()
          this.cliente=[];
        }, 500);  
      }
    );
  }}

  showSuccessClientes() {
    this.messageService.add({ severity: 'success', summary: 'Guardado', detail: 'Su cliente fue guardado' });
  }

}
