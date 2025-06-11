import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterRequestContainer } from './register-request.container';

const routes: Routes = [{ path: '', component: RegisterRequestContainer }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterRequestRoutingModule {}
