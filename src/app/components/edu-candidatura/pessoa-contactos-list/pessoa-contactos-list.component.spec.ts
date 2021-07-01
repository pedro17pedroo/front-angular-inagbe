import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoaContactosListComponent } from './pessoa-contactos-list.component';

describe('PessoaContactosListComponent', () => {
  let component: PessoaContactosListComponent;
  let fixture: ComponentFixture<PessoaContactosListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PessoaContactosListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PessoaContactosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
