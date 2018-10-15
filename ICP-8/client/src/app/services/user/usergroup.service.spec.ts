import { TestBed } from '@angular/core/testing';

import { UsergroupService } from './usergroup.service';

describe('UsergroupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsergroupService = TestBed.get(UsergroupService);
    expect(service).toBeTruthy();
  });
});
