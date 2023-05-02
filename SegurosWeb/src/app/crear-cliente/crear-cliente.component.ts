import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ClientesService } from '../Services/clientes.service';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.css'],
  providers: [MessageService]
})
export class CrearClienteComponent implements OnInit {
  cliente: any = { direccionesList: [] };
  estado: any;
  opciones: any = [];

  constructor(private messageService: MessageService, private clientesService: ClientesService) { }
  ngOnInit() {
    this.opciones = [
      { estado: 'A' },
      { estado: 'I' },
    ];
  }

  guardar() {

    let formulario: any = document.getElementById("formulario");
    let valido = formulario.reportValidity();
    this.cliente.estado = this.estado.estado;
    if (valido) {
      this.clientesService.guardarCliente(this.cliente).subscribe(
        (response: any) => {
          setTimeout(() => {
            this.showSuccessClientes()
            this.cliente = [];
          }, 500);
        }
      );
    }
  }

  agregarDireccion() {
    this.cliente.direccionesList.push({});
  }

  eliminarDireccion(direccion: any) {
    this.cliente.direccionesList.splice(this.cliente.direccionesList.indexOf(direccion), 1);
  }

  showSuccessClientes() {
    this.messageService.add({ severity: 'success', summary: 'Guardado', detail: 'Su cliente fue guardado' });
  }



}
