import { TestBed } from '@angular/core/testing';

import { ReciverRequestServiceService } from './reciver-request-service.service';

describe('ReciverRequestServiceService', () => {
  let service: ReciverRequestServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReciverRequestServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
