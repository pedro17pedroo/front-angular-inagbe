import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceberEmailComponent } from './receber-email.component';

describe('ReceberEmailComponent', () => {
  let component: ReceberEmailComponent;
  let fixture: ComponentFixture<ReceberEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceberEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceberEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
