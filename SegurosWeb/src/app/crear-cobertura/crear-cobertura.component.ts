import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CoberturasService } from '../Services/coberturas.service';

@Component({
  selector: 'app-crear-cobertura',
  templateUrl: './crear-cobertura.component.html',
  styleUrls: ['./crear-cobertura.component.css'],
  providers: [MessageService]
})
export class CrearCoberturaComponent implements OnInit {
  cliente: any = {};
  estado: any;
  opciones: any = [];
  constructor(private messageService: MessageService, private clientesService: CoberturasService) { }
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

  showSuccessClientes() {
    this.messageService.add({ severity: 'success', summary: 'Guardado', detail: 'Su cobertura fue guardada' });
  }

}
