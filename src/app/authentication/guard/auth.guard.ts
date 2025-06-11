import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { LoginService } from '../services';
import { inject } from '@angular/core';

export const authGuard = (routerActive: ActivatedRouteSnapshot) => {
  const loginService = inject(LoginService);
  const router = inject(Router);
  if (routerActive.routeConfig?.path == 'login-external') {
    return true;
  } else {
    if (loginService.isLoggedIn()) {
      if (routerActive.routeConfig?.path == 'login') {
        router.navigateByUrl('/speed');
        return true;
      }
      return true;
    } else {
      if (routerActive.routeConfig?.path == 'login') {
        return true;
      }
      router.navigateByUrl('/login');
      return false;
    }
  }
};
