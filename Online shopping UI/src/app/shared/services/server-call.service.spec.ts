import { TestBed, inject } from '@angular/core/testing';

import { ServerCallService } from './server-call.service';

describe('ServerCallService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServerCallService]
    });
  });

  it('should be created', inject([ServerCallService], (service: ServerCallService) => {
    expect(service).toBeTruthy();
  }));
});
