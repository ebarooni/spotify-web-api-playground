import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImplicitGrantDialogComponent } from './implicit-grant-dialog.component';

describe('ImplicitGrantDialogComponent', () => {
  let component: ImplicitGrantDialogComponent;
  let fixture: ComponentFixture<ImplicitGrantDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImplicitGrantDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImplicitGrantDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
