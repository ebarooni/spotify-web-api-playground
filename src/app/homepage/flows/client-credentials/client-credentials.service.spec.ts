import { TestBed } from '@angular/core/testing';

import { ClientCredentialsService } from './client-credentials.service';

describe('ClientCredentialsService', () => {
  let service: ClientCredentialsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientCredentialsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
