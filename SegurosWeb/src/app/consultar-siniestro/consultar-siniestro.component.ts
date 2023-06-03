import { Component, OnInit } from '@angular/core';
import { SiniestrosService } from '../Services/siniestros.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-consultar-siniestro',
  templateUrl: './consultar-siniestro.component.html',
  styleUrls: ['./consultar-siniestro.component.css'],
  providers: [MessageService]
})
export class ConsultarSiniestroComponent implements OnInit {
  listSiniestros: any = [];
  editar: boolean = false;
  valorDelInput?: string = '';
  value: string = '';
  disabled: boolean = true;
  siniestros: any = [];
  cargar: boolean = false;
  sizePage = 10;
  totalElements: any;
  totalPages: any;
  tempPage = 0;
  tabla: boolean = false;
  tempSiniestro:any=[];
  ngOnInit(): void {
    this.actualizarPagina(0, this.sizePage);
  }

  constructor(private siniestrosService: SiniestrosService, private messageService: MessageService) { }
  evaluarValorInput(event: any) {
    if (event.target instanceof HTMLInputElement) {
      this.valorDelInput = event.target.value;
      if (this.valorDelInput?.trim() !== '') {
        this.disabled = false;
      } else {
        this.disabled = true;
        this.tabla = false;
      }
    }
  }

  crear(siniestro: any) {
    this.tabla = false;
    this.tempSiniestro = siniestro;
    this.editar=true;
  }

  buscar() {
    this.tabla = true;
    this.actualizarPagina(0, this.sizePage);
  }

  onPageChange(event: any) {
    let pagina: number = event.first / this.sizePage
    this.actualizarPagina(pagina, this.sizePage);
    let sizeTmp: number = event.rows
    this.sizePage = sizeTmp;
    this.actualizarPagina(pagina, this.sizePage);
  }


  actualizarPagina(page: number, size: number) {
    this.siniestrosService.mantenimientoSiniestro(this.valorDelInput,page, size).subscribe(
      res => {
        this.listSiniestros = res;
        this.siniestros = this.listSiniestros.content;
        this.totalElements = this.listSiniestros.totalElements;
        this.totalPages = this.listSiniestros.totalPages;
      },
    );
  }

  guardar(){
  this.siniestrosService.guardarSiniestro(this.tempSiniestro).subscribe(
    (response: any) => {
      setTimeout(() => {
        this.showSuccessSiniestro()
        this.tempSiniestro = [];
        this.editar=false;
      }, 500);
    }
  )
  }

  showSuccessSiniestro() {
    this.messageService.add({ severity: 'success', summary: 'Actualizado', detail: 'Su siniestro fue actualizado' });
  }
}
