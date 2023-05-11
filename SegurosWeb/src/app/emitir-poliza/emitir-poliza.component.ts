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
  tempCobertura: any = [];
  estado: any;
  visible: boolean= false;

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
      console.log(res)
      this.listCoberturas = res;
      this.coberturas = this.listCoberturas.content;
      this.totalElements = this.listCoberturas.totalElements;
      this.totalPages = this.listCoberturas.totalPages;
    },
  );
}

crear(cobertura: any) {
  this.tabla = false;
  this.tempCobertura = cobertura;
}

}
