import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SiniestrosService } from '../Services/siniestros.service';
import { SegurosService } from '../Services/seguros.service';


@Component({
  selector: 'app-crear-siniestro',
  templateUrl: './crear-siniestro.component.html',
  styleUrls: ['./crear-siniestro.component.css'],
  providers: [MessageService]
})
export class CrearSiniestroComponent implements OnInit {
  value: string = '';
  editar: boolean = false;
  disabled: boolean = true;
  buscar1: boolean = true;
  tabla: boolean = false;
  listSeguros: any;
  seguros: any;
  opciones: any = [];
  txtSearch: any = HTMLInputElement;
  valorDelInput?: string = '';
  cargar: boolean = false;
  sizePage = 10;
  totalElements: any;
  totalPages: any;
  tempPage = 0;
  estado: any;
  siniestro: any = {};
  crear: boolean = false;
  certificadoSeleccionado: any;
  visible: boolean= false;

  constructor(private messageService: MessageService, private siniestroService: SiniestrosService, private seguroService: SegurosService) { }

  ngOnInit() {
    this.opciones = [
      { estado: 'I' },
      { estado: 'A' },
    ];
  }

  showDialog() {
    this.visible = true;
}

  evaluarValorInput(event: any) {
    if (event.target instanceof HTMLInputElement) {
      this.valorDelInput = event.target.value;
      if (this.valorDelInput?.trim() !== '') {
        this.disabled = false;
        this.editar = false;
        this.tabla = false;
        this.visible=false;
      } else {
        this.disabled = true;
      }
    }
  }



  buscar() {
    this.tabla = true;
    this.showDialog()
    this.editar = false;
    this.actualizarPagina(0, this.sizePage);
  }

  onPageChange(event: any) {
    let pagina: number = event.first / this.sizePage;
    this.sizePage = event.rows;
    this.actualizarPagina(pagina, this.sizePage);
  }

  actualizarPagina(page: number, size: number) {
    this.seguroService.mantenimientoSeguro(this.valorDelInput, page, size).subscribe(
      res => {
        this.listSeguros = res;
        this.seguros = this.listSeguros.content;
        this.totalElements = this.listSeguros.totalElements;
        this.totalPages = this.listSeguros.totalPages;
      },
    );
  }

  agregar(seguro: any) {
    this.seguros = seguro;
    console.log(this.seguros);
    this.buscar1 = false;
    this.tabla = false;
    this.crear = true;
    this.visible=false;
  }

  guardar() {
    this.siniestro.estado = this.estado.estado;
    this.siniestro.certificadoId = this.certificadoSeleccionado;
    console.log(this.siniestro)
    this.siniestroService.guardarSiniestro(this.siniestro).subscribe(
      (response: any) => {
        setTimeout(() => {
          this.showSuccessSiniestros()
          this.seguros = [];
          this.siniestro = [];
          this.estado = '';
          this.crear = false;
        }, 500);
      }
    );

  }
  showSuccessSiniestros() {
    this.messageService.add({ severity: 'success', summary: 'Creado', detail: 'Su siniestro fue creado' });
  }

}
