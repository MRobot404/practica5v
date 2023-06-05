import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  items: any;

  ngOnInit() {
    this.items = [
      {
        label: 'Inicio',
        icon: 'pi pi-home',
        routerLink: ["/home"]
      },
      {
        label: 'Clientes',
        items: [
          {
            label: 'Crear',
            icon: 'pi pi-fw pi-plus',
            routerLink: ["/crearCliente"]
          },
          {
            label: 'Mantenimiento',
            icon: 'pi pi-fw pi-wrench',
            routerLink: ["/mantenerCliente"]
          }
        ]
      },
      {
        label: 'Coberturas',
        items: [
          {
            label: 'Crear',
            icon: 'pi pi-fw pi-plus',
            routerLink: ["/crearCobertura"]
          },
          {
            label: 'Mantenimiento',
            icon: 'pi pi-fw pi-wrench',
            routerLink: ["/mantenerCobertura"]
          }
        ]
      },
      {
        label: 'Polizas',
        items: [
          {
            label: 'Emisión',
            icon: 'pi pi-fw pi-send',
            routerLink: ["/emitirPoliza"]
          },
          {
            label: 'Consultar',
            icon: 'pi pi-fw pi-eye',
            routerLink: ["/consultarPoliza"]
          },
          {
            label: 'Siniestros',
            items: [
              {
                label: 'Crear',
                icon: 'pi pi-fw pi-plus',
                routerLink: ["/crearSiniestro"]
              },
              {
                label: 'Consultar',
                icon: 'pi pi-fw pi-eye',
                routerLink: ["/consultarSiniestro"]
              },
            ]
          },
          {
            label: 'Facturas',
            items: [
              {
                label: 'Consultar',
                icon: 'pi pi-fw pi-eye',
                routerLink: ["/consultarFactura"]
              },
            ]
          }
        ]
      }
    ];
  }
}
