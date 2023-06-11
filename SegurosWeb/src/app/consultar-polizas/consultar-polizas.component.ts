import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SegurosService } from '../Services/seguros.service';

@Component({
  selector: 'app-consultar-polizas',
  templateUrl: './consultar-polizas.component.html',
  styleUrls: ['./consultar-polizas.component.css'],
  providers: [MessageService]
})
export class ConsultarPolizasComponent implements OnInit {

  busqueda: string = "";
  fechaInicio: string = "";
  fechaFin: string = "";
  sizePage = 10;
  totalElements: any;
  totalPages: any;
  tempPage = 0;
  listSeguros: any = [];
  seguros: any = [];
  tabla: boolean = false;
  tabla2: boolean = false;
  viewParametro: boolean = false;
  valorDelInput?: string = '';
  seguroTemp: any = { certificadosList: [] };


  constructor(private messageService: MessageService, private segurosService: SegurosService) { }

  evaluarValorInput(event: any) {
    if (event.target instanceof HTMLInputElement) {
      this.valorDelInput = event.target.value;
      if (this.valorDelInput?.trim() == '') {
        this.tabla = false;
      }
    }
  }

  ngOnInit(): void {
    this.viewParametro = true;
  }

  cancelar() {
    this.busqueda = '';
    this.fechaInicio = '';
    this.fechaFin = '';
    this.tabla = false;
  }

  buscar(event: any) {
    this.tabla = true;
    if (event.target.value != '') {
      this.actualizarPagina(this.busqueda.toLocaleLowerCase(), this.fechaInicio.toString(), this.fechaFin.toString());
    } else {
      this.tabla = false;
    }
  }



  actualizarPagina(busqueda: any, fechaInicio: any, fechaFin: any) {
    const busquedaValor = busqueda || "";
    const fechaInicioValor = fechaInicio || "";
    const fechaFinValor = fechaFin || "";
    this.segurosService.mantenimientoSeguro(busquedaValor, fechaInicioValor, fechaFinValor).subscribe(
      res => {
        this.seguros = res;
      },
    );
  }




  actualizar(seguro: any) {
    this.tabla = false;
    this.viewParametro = false;
    this.tabla2 = true;
    this.segurosService.buscarPorId(seguro.id).subscribe(
      res => {
        this.seguroTemp = res;
        console.log(this.seguroTemp);
      },
    );

  }

  showSuccessPolizas() {
    this.messageService.add({ severity: 'success', summary: 'Actualizada', detail: 'Su poliza fue actualizada' });
  }

}
