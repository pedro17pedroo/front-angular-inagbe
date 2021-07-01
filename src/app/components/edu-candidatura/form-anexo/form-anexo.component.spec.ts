import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAnexoComponent } from './form-anexo.component';

describe('FormAnexoComponent', () => {
  let component: FormAnexoComponent;
  let fixture: ComponentFixture<FormAnexoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormAnexoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAnexoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
