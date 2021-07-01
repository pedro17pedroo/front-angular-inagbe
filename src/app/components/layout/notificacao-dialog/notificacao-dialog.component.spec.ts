import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificacaoDialogComponent } from './notificacao-dialog.component';

describe('NotificacaoDialogComponent', () => {
  let component: NotificacaoDialogComponent;
  let fixture: ComponentFixture<NotificacaoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificacaoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificacaoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
