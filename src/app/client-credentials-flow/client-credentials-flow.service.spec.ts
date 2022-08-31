import { TestBed } from '@angular/core/testing';

import { ClientCredentialsFlowService } from './client-credentials-flow.service';

describe('ClientCredentialsFlowService', () => {
  let service: ClientCredentialsFlowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientCredentialsFlowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
