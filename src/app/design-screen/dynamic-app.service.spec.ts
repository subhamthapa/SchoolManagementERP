import { TestBed } from '@angular/core/testing';

import { DynamicAppService } from './dynamic-app.service';

describe('DynamicAppService', () => {
  let service: DynamicAppService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicAppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
