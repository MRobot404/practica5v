import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../Services/clientes.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-mantener-cliente',
  templateUrl: './mantener-cliente.component.html',
  styleUrls: ['./mantener-cliente.component.css'],
  providers: [MessageService]
})
export class MantenerClienteComponent implements OnInit {
  value: string = '';
  editar: boolean = false;
  disabled: boolean = true;
  tabla: boolean = false;
  listClientes: any;
  clientes: any;
  opciones: any = [];
  txtSearch: any = HTMLInputElement;
  valorDelInput?: string = '';
  cargar: boolean = false;
  sizePage = 10;
  totalElements: any;
  totalPages: any;
  tempPage = 0;
  tempCliente: any = { direccionesList: [] };


  constructor(private messageService: MessageService, private clientesService: ClientesService) { }

  ngOnInit() {
  }

  evaluarValorInput(event: any) {
    if (event.target instanceof HTMLInputElement) {
      this.valorDelInput = event.target.value;
      if (this.valorDelInput?.trim() !== '') {
        this.disabled = false;
      } else {
        this.editar = false;
        this.disabled = true;
        this.tabla = false;
      }
    }
  }

  buscar() {
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
    this.clientesService.mantenimientoCliente(this.valorDelInput, page, size).subscribe(
      res => {
        this.listClientes = res;
        this.clientes = this.listClientes.content;
        this.totalElements = this.listClientes.totalElements;
        this.totalPages = this.listClientes.totalPages;
      },
    );
  }

  editarCliente(cliente: any) {
    this.tabla = false;
    this.editar = true;
  }

  activo: boolean = true;
  actualizarEstado(event: any) {
    this.activo = event.target.checked;
  }

  guardar() {

  }

  agregarDireccion() {
    this.tempCliente.direccionesList.push({});
  }

  eliminarDireccion(direccion: any) {
    this.tempCliente.direccionesList.splice(this.tempCliente.direccionesList.indexOf(direccion), 1);
  }

}
