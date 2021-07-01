import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BolsaDetalhesComponent } from './bolsa-detalhes.component';

describe('BolsaDetalhesComponent', () => {
  let component: BolsaDetalhesComponent;
  let fixture: ComponentFixture<BolsaDetalhesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BolsaDetalhesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BolsaDetalhesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
