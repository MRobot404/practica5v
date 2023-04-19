import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenerClienteComponent } from './mantener-cliente.component';

describe('MantenerClienteComponent', () => {
  let component: MantenerClienteComponent;
  let fixture: ComponentFixture<MantenerClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MantenerClienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MantenerClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
