import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BolsaResultadosComponent } from './bolsa-resultados.component';

describe('BolsaResultadosComponent', () => {
  let component: BolsaResultadosComponent;
  let fixture: ComponentFixture<BolsaResultadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BolsaResultadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BolsaResultadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
