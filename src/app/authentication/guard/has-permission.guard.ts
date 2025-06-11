import { ActivatedRouteSnapshot } from '@angular/router';
import { LoginService } from '../services';
import { inject } from '@angular/core';

export const hasPermission = (routerActive: ActivatedRouteSnapshot) => {
  const loginService = inject(LoginService);
  return loginService.hasPermission(routerActive.routeConfig?.path || 'speed');
};
