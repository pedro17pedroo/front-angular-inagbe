import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BolsaResultadoDetalhesComponent } from './bolsa-resultado-detalhes.component';

describe('BolsaResultadoDetalhesComponent', () => {
  let component: BolsaResultadoDetalhesComponent;
  let fixture: ComponentFixture<BolsaResultadoDetalhesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BolsaResultadoDetalhesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BolsaResultadoDetalhesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
