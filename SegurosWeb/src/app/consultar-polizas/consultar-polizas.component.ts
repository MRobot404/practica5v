import { Component, OnInit } from '@angular/core';
import { PolizasService } from '../Services/polizas.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-consultar-polizas',
  templateUrl: './consultar-polizas.component.html',
  styleUrls: ['./consultar-polizas.component.css'],
  providers: [MessageService]
})
export class ConsultarPolizasComponent implements OnInit {


  disabled: boolean = true;


  constructor(private messageService: MessageService, private polizasService: PolizasService) { }

  ngOnInit(): void {
  }

  cancelar() {
    const formulario = document.querySelector('#miFormulario') as HTMLFormElement;
    const inputs = formulario.querySelectorAll('input');
    inputs.forEach((input) => (input.value = ''));
  }

  buscar() {
  }


  showSuccessPolizas() {
    this.messageService.add({ severity: 'success', summary: 'Actualizada', detail: 'Su poliza fue actualizada' });
  }

}
