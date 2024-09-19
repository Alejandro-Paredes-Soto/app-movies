import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const protectedLoginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (typeof window !== 'undefined') {
    if (localStorage.getItem('token')) {
      router.navigate(['/Home']);
      return false;
    }
  }
return true;
};
