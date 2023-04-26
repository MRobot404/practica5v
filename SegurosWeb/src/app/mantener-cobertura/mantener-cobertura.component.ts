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
  value:string='';
  editar: boolean=false;
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
  tempCobertura:any=[];
 


  constructor(private messageService: MessageService, private coberturasService: CoberturasService) { }

  ngOnInit() {
  }

  evaluarValorInput(event: any) {
    if (event.target instanceof HTMLInputElement) {
      this.valorDelInput = event.target.value;
      if (this.valorDelInput?.trim() !== '') {
        this.disabled = false;
      } else {
        this.editar=false;
        this.disabled = true;
      }
    }
  }

  

  buscar() {
    this.loading = true;
    this.tabla = true;
    this.editar=false;
    this.actualizarPagina(0, this.sizePage);
  }
  
  onPageChange(event: any) {
    let pagina: number = event.first / this.sizePage;
    this.sizePage = event.rows;
    this.actualizarPagina(pagina, this.sizePage);
  }
  
  actualizarPagina(page: number, size: number) {
    this.coberturasService.mantenimientoCliente(this.valorDelInput, page, size).subscribe(
      res => {
        this.listCoberturas = res;
        this.coberturas = this.listCoberturas.content;
        this.totalElements = this.listCoberturas.totalElements;
        this.totalPages = this.listCoberturas.totalPages;
        this.loading = false;
      },
    );
  }
  
  crear(cobertura:any){
    this.tabla=false;
    this.editar=true;
   this.tempCobertura=cobertura;
  }

  activo: boolean =true;
  actualizarEstado(event: any) {
    this.activo = event.target.checked;
    console.log(this.activo);
  }

  guardar(){
    
  }

  
}