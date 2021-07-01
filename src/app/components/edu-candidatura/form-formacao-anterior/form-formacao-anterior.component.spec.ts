import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFormacaoAnteriorComponent } from './form-formacao-anterior.component';

describe('FormFormacaoAnteriorComponent', () => {
  let component: FormFormacaoAnteriorComponent;
  let fixture: ComponentFixture<FormFormacaoAnteriorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormFormacaoAnteriorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFormacaoAnteriorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
