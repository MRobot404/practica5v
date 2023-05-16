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
  opcionesd: any = [];
  txtSearch: any = HTMLInputElement;
  valorDelInput?: string = '';
  cargar: boolean = false;
  sizePage = 10;
  totalElements: any;
  totalPages: any;
  tempPage = 0;
  tempCliente: any = { direccionesList: [] };
  estado: any;

  constructor(private messageService: MessageService, private clientesService: ClientesService) { }

  ngOnInit() {
    this.opcionesd = [
      { estado: 'I' },
      { estado: 'A' },
    ];
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
    this.tempCliente = cliente;
    this.estado = '';
    this.cambiarOpciones()
  }


  agregarDireccion() {
    this.tempCliente.direccionesList.push({});
  }

  eliminarDireccion(direccion: any) {
    this.tempCliente.direccionesList.splice(this.tempCliente.direccionesList.indexOf(direccion), 1);
  }

  activo: boolean = true;
  actualizarEstado(event: any) {
    this.activo = event.target.checked;
  }

  cambiarOpciones() {
    if (this.tempCliente.estado === 'A') {
      this.opciones = [
        { estado: '' },
        { estado: 'A' },
        { estado: 'I' },
      ];
    } else if (this.tempCliente.estado === 'I') {
      this.opciones = [
        { estado: '' },
        { estado: 'I' },
        { estado: 'A' },
      ];
    }
  }

  guardar() {
    if (this.estado.estado != '') {
      this.tempCliente.estado = this.estado.estado;
    }if(this.tempCliente.direccionesList.estado != ''){
    }
    this.clientesService.guardarCliente(this.tempCliente).subscribe(
      (response: any) => {
        setTimeout(() => {
          this.showSuccessClientes()
          this.tempCliente = [];
          this.estado = '';
          this.editar = false;
        }, 500);

      }
    )
  }
  showSuccessClientes() {
    this.messageService.add({ severity: 'success', summary: 'Actualizado', detail: 'Su cliente fue actualizado' });
  }
}
