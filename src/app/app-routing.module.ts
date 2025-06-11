import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent, LoginExternalComponent } from './authentication';
import { authGuard } from './authentication/guard/auth.guard';

const routes: Routes = [
  { path: 'login-external/:key/:idTraza', component: LoginExternalComponent },
  { path: 'login', canActivate: [authGuard], component: LoginComponent },
  {
    path: 'speed',
    canActivate: [authGuard],
    loadChildren: () => import('./workflow/workflow.module').then((m) => m.WorkflowModule),
  },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: '**', pathMatch: 'full', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
