import { TestBed } from '@angular/core/testing';

import { SalesSharedService } from './sales-shared.service';

describe('SalesSharedService', () => {
  let service: SalesSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalesSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
