import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImplicitGrantComponent } from './implicit-grant.component';

describe('ImplicitGrantComponent', () => {
  let component: ImplicitGrantComponent;
  let fixture: ComponentFixture<ImplicitGrantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImplicitGrantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImplicitGrantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
