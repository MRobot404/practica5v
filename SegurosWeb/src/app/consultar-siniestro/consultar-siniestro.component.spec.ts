import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarSiniestroComponent } from './consultar-siniestro.component';

describe('ConsultarSiniestroComponent', () => {
  let component: ConsultarSiniestroComponent;
  let fixture: ComponentFixture<ConsultarSiniestroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultarSiniestroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultarSiniestroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
