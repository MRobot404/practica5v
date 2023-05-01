import { Component, OnInit } from '@angular/core';
import { FacturasService } from '../Services/facturas.service';

@Component({
  selector: 'app-consultar-factura',
  templateUrl: './consultar-factura.component.html',
  styleUrls: ['./consultar-factura.component.css']
})
export class ConsultarFacturaComponent implements OnInit {
  listFacturas: any = [];
  facturas: any = [];
  cargar: boolean = false;
  sizePage = 10;
  totalElements: any;
  totalPages: any;
  tempPage = 0;
  ngOnInit(): void {
    this.actualizarPagina(this.tempPage, this.sizePage);
  }

  constructor(private facturasService: FacturasService) { }

  onPageChange(event: any) {
    let pagina:number = event.first/this.sizePage
    this.actualizarPagina(pagina, this.sizePage);
    let sizeTmp:number = event.rows
    this.sizePage=sizeTmp;
    this.actualizarPagina(pagina, this.sizePage);
  }

  actualizarPagina(page: number, size: number) {
    this.facturasService.verTodosPaginado(page, size).subscribe(
      res => {
        this.listFacturas = res;
        this.facturas = this.listFacturas.content;
        this.totalElements = this.listFacturas.totalElements;
        this.totalPages = this.listFacturas.totalPages;
      },
    );
  }


}