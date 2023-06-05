import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CoberturasService } from '../Services/coberturas.service';
import { ClientesService } from '../Services/clientes.service';
import { SegurosService } from '../Services/seguros.service';

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
  clientes: any;
  listClientes: any;
  opciones: any = [];
  cargar: boolean = false;
  sizePage = 10;
  sizePage2 = 10;
  totalElements: any;
  totalPages: any;
  tempPage = 0;
  coberturasList: any = [];
  tempCobertura: any;
  estado: any;
  visible: boolean = false;
  visibleCodigoContratante: boolean = false;
  tabla2: boolean = false;
  certificados: any = { certificadoslist: [] };
  codigoContratante: boolean = true;
  clienteSeleccionado: any;
  factorMultiplicacion: any = 0;
  tempPrimaTotal: any = 0;
  tempSumaAsegurada: any = 0;
  primaTotal: any = 0;
  sumaAsegurada: any = 0;
  certificadoSeleccionado: any;
  tipoClienteSeleccionado: number = 0;
  visibleCodigoAsegurado: any;
  poliza: any = {};
  tipo: number = 0;
  polizaSeleccionada: any = { seguro: [] };
  constructor(private messageService: MessageService, private coberturaService: CoberturasService, private clientesService: ClientesService, private segurosService: SegurosService) { }

  ngOnInit(): void {
    this.actualizarPaginaCoberturas(this.tempPage, this.sizePage);
    this.actualizarPaginaClientes(this.tempPage, this.sizePage);
    this.generarNuevaPoliza();
  }


  generarNuevaPoliza() {
    this.poliza.tipo = null;
    this.poliza.fechaInicio = null;
    this.poliza.fechaFin = null;
    this.poliza.codigoContratante = null;
    this.poliza.nombreContratanteP = "";
    this.poliza.primaTotal = null;
    this.poliza.sumaAsegurada = null;
    this.poliza.estado = 'a';
    this.poliza.certificadosList = null;
  }

  showDialog() {
    this.visible = true;
  }

  onPageChange(event: any) {
    let pagina: number = event.first / this.sizePage;
    this.sizePage = event.rows;
    this.actualizarPaginaCoberturas(pagina, this.sizePage);
  }

  actualizarPaginaCoberturas(page: number, size: number) {
    this.coberturaService.verTodoPaginado(page, size).subscribe(
      res => {
        this.listCoberturas = res;
        this.coberturas = this.listCoberturas.content;
        this.totalElements = this.listCoberturas.totalElements;
        this.totalPages = this.listCoberturas.totalPages;
      },
    );
  }

  crearCobertura(cobertura: any) {
    this.tempCobertura = cobertura;
    let coberturaAgregada = false;
    for (let i = 0; i < this.coberturas.length; i++) {
      if (!this.coberturasList.some((item: any) => item.id === this.tempCobertura.id)) {
        this.coberturas.splice(i, 1);
        let temp: any = {};
        temp = cobertura;
        this.coberturasList.push(temp);
        this.tempPrimaTotal += this.tempCobertura.costo;
        this.tempSumaAsegurada += this.tempCobertura.sumaAsegurada;
        coberturaAgregada = true;
        this.tabla2 = true;
        this.calcularTotal()
        break;
      }
    }
    if (!coberturaAgregada) {
      this.showErrorcoberturas();
    }
  }

  eliminar(cobertura: any) {
    const index = this.coberturasList.findIndex((c: any) => c.id === cobertura.id);
    if (index !== -1) {
      const coberturaEliminada = this.coberturasList.splice(index, 1)[0];
      this.tempPrimaTotal -= coberturaEliminada.costo;
      this.tempPrimaTotal = Math.max(0, this.tempPrimaTotal);
      this.tempSumaAsegurada -= coberturaEliminada.sumaAsegurada;
      this.tempSumaAsegurada = Math.max(0, this.tempSumaAsegurada);
      this.coberturas.push(cobertura);
      this.calcularTotal()
    }

    if (this.coberturasList.length === 0) {
      this.tabla2 = false;
    }
  }


  eliminarCoberturas() {
    this.coberturasList.splice(0, this.coberturasList.length);
    if (this.coberturasList.length === 0) {
      this.tabla2 = false;
    }
    this.actualizarPaginaCoberturas(this.tempPage, this.sizePage);
    this.tempSumaAsegurada = 0;
    this.tempPrimaTotal = 0;
    this.sumaAsegurada = 0;
    this.primaTotal = 0;
  }

  agregarCertificado() {
    this.sizePage2 = 10;
    this.certificados.certificadoslist.push({ contratante: {}, asegurado: {}, coberturasList: this.coberturasList });
    this.calcularTotal();
  }

  eliminarCertificados() {
    this.certificados.certificadoslist.push({});
    this.sizePage2 = 10;
    this.certificados.certificadoslist.splice(0, this.certificados.certificadoslist.length);
    this.sumaAsegurada = 0;
    this.primaTotal = 0;
  }


  eliminarCertificado(certificado: any) {
    this.certificados.certificadoslist.splice(this.certificados.certificadoslist.indexOf(certificado), 1);
    this.calcularTotal();
  }

  calcularTotal() {
    const cantidadCertificados = this.certificados.certificadoslist.length;

    this.sumaAsegurada = this.tempSumaAsegurada * cantidadCertificados;
    this.primaTotal = this.tempPrimaTotal * cantidadCertificados;
    this.poliza.primaTotal = this.primaTotal;
    this.poliza.sumaAsegurada = this.sumaAsegurada;
  }

  guardarCertificado() {
    let formulario: any = document.getElementById("formulario");
    let valido = formulario.reportValidity();

    if (!valido || !this.certificados || this.certificados.length <= 0 || !this.tempCobertura || this.tempCobertura.length <= 0) {
      this.showErrorValidacion()
    } else {
      this.poliza.certificadosList = this.certificados.certificadoslist;

      this.segurosService.guardarSeguro(this.poliza).subscribe(
        (response: any) => {
          setTimeout(() => {
            this.showSuccesscoberturas()
            this.poliza = [];
            this.limpiarTodo();
          }, 500);
        }
      );
    }
  }

  agregarCodigoContratante(objeto: any, tipo: number) {

    this.visibleCodigoContratante = true;
    switch (tipo) {
      case 1:
        this.tipo = 1;
        this.certificadoSeleccionado = objeto;
        break;

      case 2:
        this.tipo = 2;
        this.certificadoSeleccionado = objeto;
        break;

      case 3:
        this.tipo = 3;
        this.polizaSeleccionada = objeto;
    }

    this.tipoClienteSeleccionado = tipo;
  }

  crearCodigoContratante(cliente: any) {
    this.visibleCodigoContratante = false;
    this.certificadoSeleccionado.sumaAsegurada = this.tempSumaAsegurada;
    this.certificadoSeleccionado.prima = this.tempPrimaTotal;
    switch (this.tipo) {
      case 1:
        this.certificadoSeleccionado.codigoContratante = cliente.id;
        this.certificadoSeleccionado.contratante = cliente;

        break;
      case 2:
        this.certificadoSeleccionado.codigoAsegurado = cliente.id;
        this.certificadoSeleccionado.asegurado = cliente;
        break;

      case 3:
        this.poliza.codigoContratante = cliente.id;
        this.polizaSeleccionada = cliente;
        break;
    }


  }


  onPageChangeClientes(event: any) {
    let pagina: number = event.first / this.sizePage2;
    this.sizePage2 = event.rows;
    this.actualizarPaginaClientes(pagina, this.sizePage2);
  }

  actualizarPaginaClientes(page: number, size: number) {
    this.clientesService.verTodoPaginado(page, size).subscribe(
      res => {
        this.listClientes = res;
        this.clientes = this.listClientes.content;
        this.totalElements = this.listClientes.totalElements;
        this.totalPages = this.listClientes.totalPages;
      },
    );
  }

  limpiarTodo() {
    this.certificados.certificadoslist.splice(0, this.certificados.certificadoslist.length);
    this.coberturasList.splice(0, this.coberturasList.length);
    if (this.coberturasList.length === 0) {
      this.tabla2 = false;
    }
    this.actualizarPaginaCoberturas(this.tempPage, this.sizePage);
    this.tempSumaAsegurada = 0;
    this.tempPrimaTotal = 0;
    this.sumaAsegurada = 0;
    this.primaTotal = 0;
  }

  showSuccesscoberturas() {
    this.messageService.add({ severity: 'success', summary: 'Creado', detail: 'Su seguro fue creado' });
  }

  showErrorcoberturas() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'La cobertura  ya fue agregada' });
  }

  showErrorValidacion() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error de validación' });
  }


}
