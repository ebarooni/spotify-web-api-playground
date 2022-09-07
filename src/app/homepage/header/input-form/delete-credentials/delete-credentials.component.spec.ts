import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCredentialsComponent } from './delete-credentials.component';

describe('DeleteCredentialsComponent', () => {
  let component: DeleteCredentialsComponent;
  let fixture: ComponentFixture<DeleteCredentialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteCredentialsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteCredentialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
