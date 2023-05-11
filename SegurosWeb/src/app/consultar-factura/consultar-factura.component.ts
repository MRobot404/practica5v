import { Component, OnInit } from '@angular/core';
import { FacturasService } from '../Services/facturas.service';

@Component({
  selector: 'app-consultar-factura',
  templateUrl: './consultar-factura.component.html',
  styleUrls: ['./consultar-factura.component.css']
})
export class ConsultarFacturaComponent implements OnInit {
  listFacturas: any = [];
  valorDelInput?: string = '';
  value: string = '';
  disabled: boolean = true;
  facturas: any = [];
  cargar: boolean = false;
  sizePage = 10;
  totalElements: any;
  totalPages: any;
  tempPage = 0;
  tabla: boolean = false;
  ngOnInit(): void {
  }

  constructor(private facturasService: FacturasService) { }

  evaluarValorInput(event: any) {
    if (event.target instanceof HTMLInputElement) {
      this.valorDelInput = event.target.value;
      if (this.valorDelInput?.trim() !== '') {
        this.disabled = false;
        this.tabla = false;
      } else {
        this.disabled = true;
      }
    }
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
    this.facturasService.mantenimientoFacturas(this.valorDelInput, page, size).subscribe(
      res => {
        this.listFacturas = res;
        this.facturas = this.listFacturas.content;
        this.totalElements = this.listFacturas.totalElements;
        this.totalPages = this.listFacturas.totalPages;
      },
    );
  }


}
