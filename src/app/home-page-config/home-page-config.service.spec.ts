import { TestBed } from '@angular/core/testing';

import { HomePageConfigService } from './home-page-config.service';

describe('HomePageConfigService', () => {
  let service: HomePageConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomePageConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
