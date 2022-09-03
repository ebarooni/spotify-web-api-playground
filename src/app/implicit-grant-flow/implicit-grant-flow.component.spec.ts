import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImplicitGrantFlowComponent } from './implicit-grant-flow.component';

describe('ImplicitGrantFlowComponent', () => {
  let component: ImplicitGrantFlowComponent;
  let fixture: ComponentFixture<ImplicitGrantFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImplicitGrantFlowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImplicitGrantFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
