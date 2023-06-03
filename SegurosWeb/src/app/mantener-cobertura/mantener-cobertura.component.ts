import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CoberturasService } from '../Services/coberturas.service';


@Component({
  selector: 'app-mantener-cobertura',
  templateUrl: './mantener-cobertura.component.html',
  styleUrls: ['./mantener-cobertura.component.css'],
  providers: [MessageService]
})
export class MantenerCoberturaComponent implements OnInit {
  value: string = '';
  editar: boolean = false;
  disabled: boolean = true;
  loading: boolean = false;
  tabla: boolean = false;
  listCoberturas: any;
  coberturas: any;
  opciones: any = [];
  txtSearch: any = HTMLInputElement;
  valorDelInput?: string = '';
  cargar: boolean = false;
  sizePage = 10;
  totalElements: any;
  totalPages: any;
  tempPage = 0;
  tempCobertura: any = [];
  estado: any;


  constructor(private messageService: MessageService, private coberturaService: CoberturasService) { }

  ngOnInit() {
    this.opciones = [
      { estado: 'I' },
      { estado: 'A' },
    ];
  }

  evaluarValorInput(event: any) {
    if (event.target instanceof HTMLInputElement) {
      this.valorDelInput = event.target.value;
      if (this.valorDelInput?.trim() !== '') {
        this.disabled = false;
        this.editar = false;
      } else {
        this.disabled = true;
        this.tabla = false;
      }
    }
  }



  buscar() {
    this.loading = true;
    this.tabla = true;
    this.editar = false;
    this.actualizarPagina(0, this.sizePage);
  }

  onPageChange(event: any) {
    let pagina: number = event.first / this.sizePage;
    this.sizePage = event.rows;
    this.actualizarPagina(pagina, this.sizePage);
  }

  actualizarPagina(page: number, size: number) {
    this.coberturaService.mantenimientoCliente(this.valorDelInput, page, size).subscribe(
      res => {
        this.listCoberturas = res;
        this.coberturas = this.listCoberturas.content;
        this.totalElements = this.listCoberturas.totalElements;
        this.totalPages = this.listCoberturas.totalPages;
        this.loading = false;
      },
    );
  }

  crear(cobertura: any) {
    this.tabla = false;
    this.editar = true;
    this.tempCobertura = cobertura;
    this.cambiarOpciones()
  }

  cambiarOpciones() {
    if (this.tempCobertura.estado === 'A') {
      this.opciones = [
        {estado:''},
        { estado: 'A' },
        { estado: 'I' },
      ];
    } else if(this.tempCobertura.estado === 'I') {
      this.opciones = [
        {estado:''},
        { estado: 'I' },
        { estado: 'A' },
      ];
    }
  }



  guardar() { 
    if(this.estado.estado !=''){
      this.tempCobertura.estado=this.estado.estado;
    }
    this.coberturaService.guardarCobertura(this.tempCobertura).subscribe(
      (response: any) => {
        setTimeout(() => {
          this.showSuccesscoberturas()
          this.tempCobertura = [];
          this.estado='';
          this.editar=false;
        }, 500);
      }
    );
  }

  showSuccesscoberturas() {
    this.messageService.add({ severity: 'success', summary: 'Actualizada', detail: 'Su cobertura fue actualizada' });
  }
}