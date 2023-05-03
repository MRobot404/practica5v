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
  cobertura: any = {};
  estado: any;
  opciones: any = [];
  constructor(private messageService: MessageService, private coberturaService: CoberturasService) { }
  ngOnInit() {
    this.opciones = [
      { estado: 'A' },
    ];
  }

  guardar() {
    let formulario: any = document.getElementById("formulario");
    let valido = formulario.reportValidity();
    this.cobertura.estado = this.estado.estado;
    if (valido) {
      this.coberturaService.guardarCobertura(this.cobertura).subscribe(
        (response: any) => {
          setTimeout(() => {
            this.showSuccesscoberturas()
            this.cobertura = [];
          }, 500);
        }
      );
    }
  }

  showSuccesscoberturas() {
    this.messageService.add({ severity: 'success', summary: 'Guardado', detail: 'Su cobertura fue guardada' });
  }

}
