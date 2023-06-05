import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SegurosService } from '../Services/seguros.service';

@Component({
  selector: 'app-consultar-polizas',
  templateUrl: './consultar-polizas.component.html',
  styleUrls: ['./consultar-polizas.component.css'],
  providers: [MessageService]
})
export class ConsultarPolizasComponent  implements OnInit{

  parametros: any = {};
  sizePage = 10;
  totalElements: any;
  totalPages: any;
  tempPage = 0;
  listSeguros:any =[];
  seguros:any =[];
  tabla:boolean=false;
  viewParametro:boolean=false;


  constructor(private messageService: MessageService, private segurosService:SegurosService) { }

  ngOnInit(): void {
    this.viewParametro=true;
  }

  cancelar() {
    const formulario = document.querySelector('#miFormulario') as HTMLFormElement;
    const inputs = formulario.querySelectorAll('input');
    inputs.forEach((input) => (input.value = ''));
    this.tabla=false;
  }

  buscar() {
    let formulario: any = document.getElementById("miFormulario");
    let valido = formulario.reportValidity();
    if(valido){ 
      this.tabla = true;
      this.actualizarPagina(0, this.sizePage);
  }

  }

  onPageChange(event: any) {
    let pagina: number = event.first / this.sizePage
    this.actualizarPagina(pagina, this.sizePage);
    let sizeTmp: number = event.rows
    this.sizePage = sizeTmp;
    this.actualizarPagina(pagina, this.sizePage);
  }

  actualizarPagina(page: number, size: number) {
    console.log(this.parametros);
    this.segurosService.mantenimientoSeguro(this.parametros, page, size).subscribe(
      res => {
        this.listSeguros = res;
        this.seguros = this.listSeguros.content;
        this.totalElements = this.listSeguros.totalElements;
        this.totalPages = this.listSeguros.totalPages;
      },
    );
  }

  actualizar(seguro:any){
    console.log(seguro);
  }

  showSuccessPolizas() {
    this.messageService.add({ severity: 'success', summary: 'Actualizada', detail: 'Su poliza fue actualizada' });
  }

}
