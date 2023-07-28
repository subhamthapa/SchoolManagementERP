import { TestBed } from '@angular/core/testing';

import { DataModelManagerService } from './data-model-manager.service';

describe('DataModelManagerService', () => {
  let service: DataModelManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataModelManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
