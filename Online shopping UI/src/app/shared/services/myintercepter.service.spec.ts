import { TestBed } from '@angular/core/testing';

import { MyintercepterService } from './myintercepter.service';

describe('MyintercepterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyintercepterService = TestBed.get(MyintercepterService);
    expect(service).toBeTruthy();
  });
});
