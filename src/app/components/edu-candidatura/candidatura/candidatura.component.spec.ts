import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidaturaComponent } from './candidatura.component';

describe('CandidaturaComponent', () => {
  let component: CandidaturaComponent;
  let fixture: ComponentFixture<CandidaturaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidaturaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidaturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
