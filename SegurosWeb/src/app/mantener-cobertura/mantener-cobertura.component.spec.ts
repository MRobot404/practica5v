import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenerCoberturaComponent } from './mantener-cobertura.component';

describe('MantenerCoberturaComponent', () => {
  let component: MantenerCoberturaComponent;
  let fixture: ComponentFixture<MantenerCoberturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MantenerCoberturaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MantenerCoberturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
