import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidaturaFormComponent } from './candidatura-form.component';

describe('CandidaturaFormComponent', () => {
  let component: CandidaturaFormComponent;
  let fixture: ComponentFixture<CandidaturaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidaturaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidaturaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
