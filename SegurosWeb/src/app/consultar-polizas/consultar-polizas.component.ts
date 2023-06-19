import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SegurosService } from '../Services/seguros.service';
import { DatePipe } from '@angular/common';
import { ClientesService } from '../Services/clientes.service';

@Component({
  selector: 'app-consultar-polizas',
  templateUrl: './consultar-polizas.component.html',
  styleUrls: ['./consultar-polizas.component.css'],
  providers: [MessageService]
})
export class ConsultarPolizasComponent implements OnInit {

  busqueda: string = "";
  fechaInicio: string = "";
  fechaFin: string = "";
  sizePage = 10;
  totalElements: any;
  totalPages: any;
  tempPage = 0;
  listSeguros: any = [];
  seguros: any = [];
  tabla: boolean = false;
  tabla2: boolean = false;
  viewParametro: boolean = false;
  valorDelInput?: string = '';
  seguroTemp: any = { certificadosList: [] };
  sizePage2 = 10;
  certificados: any = { certificadoslist: [] };
  coberturasList: any = [];
  sumaAsegurada: any;
  tempSumaAsegurada: any;
  primaTotal: any;
  tempPrimaTotal: any;
  poliza: any = {};
  visibleCodigoContratante: boolean = false;
  tipo: number = 0;
  certificadoSeleccionado: any;
  polizaSeleccionada: any = { seguro: [] };
  tipoClienteSeleccionado: number = 0;
  clientes: any;
  listClientes: any;



  constructor(private messageService: MessageService, private segurosService: SegurosService, private datePipe: DatePipe, private clientesService: ClientesService) { }

  evaluarValorInput(event: any) {
    if (event.target instanceof HTMLInputElement) {
      this.valorDelInput = event.target.value;
      if (this.valorDelInput?.trim() == '') {
        this.tabla = false;
      }
    }
  }

  ngOnInit(): void {
    this.viewParametro = true;
    this.actualizarPaginaClientes(this.tempPage, this.sizePage);
  }

  cancelar() {
    this.busqueda = '';
    this.fechaInicio = '';
    this.fechaFin = '';
    this.tabla = false;
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


  eliminarCertificado(certificado: any) {
    this.certificados.certificadoslist.splice(this.certificados.certificadoslist.indexOf(certificado), 1);
    this.calcularTotal();
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



  buscar(event: any) {
    this.tabla = true;
    if (event.target.value != '') {
      this.actualizarPagina(this.busqueda.toLocaleLowerCase(), this.fechaInicio.toString(), this.fechaFin.toString());
    } else {
      this.tabla = false;
    }
  }



  actualizarPagina(busqueda: any, fechaInicio: any, fechaFin: any) {
    const busquedaValor = busqueda || "";
    const fechaInicioValor = fechaInicio || "";
    const fechaFinValor = fechaFin || "";
    this.segurosService.mantenimientoSeguro(busquedaValor, fechaInicioValor, fechaFinValor).subscribe(
      res => {
        this.seguros = res;
      },
    );
  }

  actualizar(seguro: any) {
    this.tabla = false;
    this.viewParametro = false;
    this.tabla2 = true;
    let formatoDestino = 'yyyy-MM-dd';
    this.segurosService.buscarPorId(seguro.id).subscribe(
      res => {
        this.seguroTemp = res;
        console.log(this.seguroTemp);
        this.polizaSeleccionada.nombre = this.seguroTemp.nombreContratanteP;
        this.primaTotal = this.seguroTemp.primaTotal;
        this.sumaAsegurada = this.seguroTemp.sumaAsegurada;
        this.certificados.certificadoslist = this.seguroTemp.certificadosList;
        const primerCertificado = this.seguroTemp.certificadosList.find(() => true);
        this.tempPrimaTotal = primerCertificado.prima;
        this.tempSumaAsegurada = primerCertificado.sumaAsegurada;
        this.coberturasList = primerCertificado.coberturasList;
        this.poliza.tipo = res.tipo;
        this.poliza.fechaInicio = this.datePipe.transform(res.fechaInicio, formatoDestino); // <-- esta
        this.poliza.fechaFin = this.datePipe.transform(res.fechaFin, formatoDestino);
        this.poliza.id = this.seguroTemp.id;
        this.poliza.codigoContratante=this.seguroTemp.codigoContratante;
        for (let certificado of this.certificados.certificadoslist) {
          certificado.fechaInicio = this.datePipe.transform(certificado.fechaInicio, formatoDestino);
          certificado.fechaFin = this.datePipe.transform(certificado.fechaFin, formatoDestino);
        }        
      },
    );
  }

  agregarCertificado() {
    this.sizePage2 = 10;
    this.certificados.certificadoslist.push({ contratante: {}, asegurado: {}, coberturasList: this.coberturasList });
    this.calcularTotal();
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


  calcularTotal() {
    const cantidadCertificados = this.certificados.certificadoslist.length;
    this.sumaAsegurada = this.tempSumaAsegurada * cantidadCertificados;
    this.primaTotal = this.tempPrimaTotal * cantidadCertificados;
    this.poliza.primaTotal = this.primaTotal;
    this.poliza.sumaAsegurada = this.sumaAsegurada;
  }

  guardarCertificado() {

    this.calcularTotal();
    this.poliza.certificadosList = this.certificados.certificadoslist;
    console.log(this.poliza);
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

  limpiarTodo() {
    this.certificados.certificadoslist.splice(0, this.certificados.certificadoslist.length);
    this.coberturasList.splice(0, this.coberturasList.length);
    if (this.coberturasList.length === 0) {
      this.tabla2 = false;
    }
    this.tempSumaAsegurada = 0;
    this.tempPrimaTotal = 0;
    this.sumaAsegurada = 0;
    this.primaTotal = 0;
  }

  showSuccesscoberturas() {
    this.messageService.add({ severity: 'success', summary: 'Creado', detail: 'Su seguro fue creado' });
  }

}
