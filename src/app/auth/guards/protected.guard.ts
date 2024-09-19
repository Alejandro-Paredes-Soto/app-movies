import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const protectedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (typeof window !== 'undefined') {
    if (localStorage.getItem('token')) {
      return true;
    }  
  }
  
  router.navigate(['/']);
  return false; 
};
