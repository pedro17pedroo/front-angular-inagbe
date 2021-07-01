import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServidorIndisponivelComponent } from './servidor-indisponivel.component';

describe('ServidorIndisponivelComponent', () => {
  let component: ServidorIndisponivelComponent;
  let fixture: ComponentFixture<ServidorIndisponivelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServidorIndisponivelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServidorIndisponivelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
