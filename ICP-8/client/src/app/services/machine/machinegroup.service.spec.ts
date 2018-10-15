import { TestBed } from '@angular/core/testing';

import { MachinegroupService } from './machinegroup.service';

describe('MachinegroupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MachinegroupService = TestBed.get(MachinegroupService);
    expect(service).toBeTruthy();
  });
});
