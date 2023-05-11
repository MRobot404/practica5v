import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarPolizasComponent } from './consultar-polizas.component';

describe('ConsultarPolizasComponent', () => {
  let component: ConsultarPolizasComponent;
  let fixture: ComponentFixture<ConsultarPolizasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultarPolizasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultarPolizasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
