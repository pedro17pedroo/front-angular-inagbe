import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPessoalComponent } from './form-pessoal.component';

describe('FormPessoalComponent', () => {
  let component: FormPessoalComponent;
  let fixture: ComponentFixture<FormPessoalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormPessoalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPessoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
