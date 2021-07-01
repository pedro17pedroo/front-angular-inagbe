import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCandidaturaInternaComponent } from './form-candidatura-interna.component';

describe('FormCandidaturaInternaComponent', () => {
  let component: FormCandidaturaInternaComponent;
  let fixture: ComponentFixture<FormCandidaturaInternaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCandidaturaInternaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCandidaturaInternaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
