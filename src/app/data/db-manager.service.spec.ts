import { TestBed } from '@angular/core/testing';

import { DbManagerService } from './db-manager.service';

describe('DbManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DbManagerService = TestBed.get(DbManagerService);
    expect(service).toBeTruthy();
  });
});
