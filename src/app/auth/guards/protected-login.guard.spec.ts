import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { protectedLoginGuard } from './protected-login.guard';

describe('protectedLoginGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => protectedLoginGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
