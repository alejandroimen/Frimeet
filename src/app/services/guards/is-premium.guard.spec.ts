import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { isPremiumGuard } from './is-premium.guard';

describe('isPremiumGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => isPremiumGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
