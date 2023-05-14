import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CoberturasService } from '../Services/coberturas.service';

@Component({
  selector: 'app-emitir-poliza',
  templateUrl: './emitir-poliza.component.html',
  styleUrls: ['./emitir-poliza.component.css'],
  providers: [MessageService]
})
export class EmitirPolizaComponent implements OnInit {


  tabla: boolean = false;
  listCoberturas: any;
  coberturas: any;
  opciones: any = [];
  cargar: boolean = false;
  sizePage = 10;
  totalElements: any;
  totalPages: any;
  tempPage = 0;
  tempListCobertura: any = [];
  tempCobertura: any;
  estado: any;
  visible: boolean = false;
  tabla2: boolean = false;
  certificados: any = { certificadoslist: [] };
  codigoContratante:boolean = true;

  constructor(private messageService: MessageService, private coberturaService: CoberturasService) { }

  ngOnInit(): void {
    this.actualizarPagina(this.tempPage, this.sizePage);
  }

  showDialog() {
    this.visible = true;
  }

  onPageChange(event: any) {
    let pagina: number = event.first / this.sizePage;
    this.sizePage = event.rows;
    this.actualizarPagina(pagina, this.sizePage);
  }

  actualizarPagina(page: number, size: number) {
    this.coberturaService.verTodoPaginado(page, size).subscribe(
      res => {
        this.listCoberturas = res;
        this.coberturas = this.listCoberturas.content;
        this.totalElements = this.listCoberturas.totalElements;
        this.totalPages = this.listCoberturas.totalPages;
      },
    );
  }

  crear(cobertura: any) {
    this.tempCobertura = cobertura;
    let coberturaAgregada = false;
    for (var i = 0; i < this.coberturas.length; i++) {
      if (this.coberturas[i].id == this.tempCobertura.id && !this.tempListCobertura.some((item: any) => item.id === this.tempCobertura.id)) {
        this.coberturas.splice(i, 1);
        this.tempListCobertura.push(cobertura);
        coberturaAgregada = true;
        this.tabla2 = true;
        break;
      }
    }
    if (!coberturaAgregada) {
      this.showErrorcoberturas();
    }
  }

  eliminar(cobertura: any) {
    for (var i = 0; i < this.tempListCobertura.length; i++) {
      if (this.tempListCobertura[i].id == cobertura.id) {
        this.tempListCobertura.splice(i, 1);
        this.coberturas.push(cobertura);
      }
    }
    if (this.tempListCobertura.length === 0) {
      this.tabla2 = false;
    }
  }

  agregarCertificado() {
    this.certificados.certificadoslist.push({});
  }

  eliminarCertificado(certificado: any) {
    this.certificados.certificadoslist.splice(this.certificados.certificadoslist.indexOf(certificado), 1);
  }

  guardarCertificado() {

  }


  showSuccesscoberturas() {
    this.messageService.add({ severity: 'success', summary: 'Actualizada', detail: 'Su cobertura fue actualizada' });
  }

  showErrorcoberturas() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'La cobertura  ya fue agregada' });
  }

}
