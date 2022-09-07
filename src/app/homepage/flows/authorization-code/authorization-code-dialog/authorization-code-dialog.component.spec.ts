import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizationCodeDialogComponent } from './authorization-code-dialog.component';

describe('AuthorizationCodeDialogComponent', () => {
  let component: AuthorizationCodeDialogComponent;
  let fixture: ComponentFixture<AuthorizationCodeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorizationCodeDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorizationCodeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
