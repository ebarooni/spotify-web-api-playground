import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientCredentialsFlowComponent } from './client-credentials-flow.component';

describe('ClientCredentialsFlowComponent', () => {
  let component: ClientCredentialsFlowComponent;
  let fixture: ComponentFixture<ClientCredentialsFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientCredentialsFlowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientCredentialsFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
