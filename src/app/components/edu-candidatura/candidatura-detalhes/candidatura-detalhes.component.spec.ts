import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidaturaDetalhesComponent } from './candidatura-detalhes.component';

describe('CandidaturaDetalhesComponent', () => {
  let component: CandidaturaDetalhesComponent;
  let fixture: ComponentFixture<CandidaturaDetalhesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidaturaDetalhesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidaturaDetalhesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
