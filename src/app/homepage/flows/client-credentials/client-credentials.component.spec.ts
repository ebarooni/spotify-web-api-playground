import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientCredentialsComponent } from './client-credentials.component';

describe('ClientCredentialsFlowComponent', () => {
  let component: ClientCredentialsComponent;
  let fixture: ComponentFixture<ClientCredentialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientCredentialsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientCredentialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
