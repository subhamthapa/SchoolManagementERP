import { TestBed } from '@angular/core/testing';

import { BaseWebsiteService } from './base-website.service';

describe('BaseWebsiteService', () => {
  let service: BaseWebsiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseWebsiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
