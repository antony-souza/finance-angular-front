import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { RouterGuard } from './router-guards.guard';

describe('RouterGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => RouterGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
