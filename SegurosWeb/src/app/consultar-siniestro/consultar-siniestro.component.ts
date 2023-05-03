import { Component, OnInit } from '@angular/core';
import { SiniestrosService } from '../Services/siniestros.service';
@Component({
  selector: 'app-consultar-siniestro',
  templateUrl: './consultar-siniestro.component.html',
  styleUrls: ['./consultar-siniestro.component.css']
})
export class ConsultarSiniestroComponent implements OnInit {
  listSiniestros: any = [];
  valorDelInput?: string = '';
  value: string = '';
  disabled: boolean = true;
  siniestros: any = [];
  cargar: boolean = false;
  sizePage = 10;
  totalElements: any;
  totalPages: any;
  tempPage = 0;
  ngOnInit(): void {
    this.actualizarPagina(this.tempPage, this.sizePage);
  }

  constructor(private siniestrosService: SiniestrosService) { }
  evaluarValorInput(event: any) {
    if (event.target instanceof HTMLInputElement) {
      this.valorDelInput = event.target.value;
      if (this.valorDelInput?.trim() !== '') {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    }
  }

  buscar() {
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
    this.siniestrosService.verTodosPaginado(page, size).subscribe(
      res => {
        this.listSiniestros = res;
        this.siniestros = this.listSiniestros.content;
        this.totalElements = this.listSiniestros.totalElements;
        this.totalPages = this.listSiniestros.totalPages;
      },
    );
  }

}
