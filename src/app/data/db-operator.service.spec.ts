import { TestBed } from '@angular/core/testing';

import { DbOperatorService } from './db-operator.service';

describe('DbOperatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DbOperatorService = TestBed.get(DbOperatorService);
    expect(service).toBeTruthy();
  });
});
