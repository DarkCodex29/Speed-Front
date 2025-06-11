import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterManualAddendumContainer } from './register-manual-addendum.container';

const routes: Routes = [{ path: '', component: RegisterManualAddendumContainer }];

@NgModule({
  imports: [RouterModule.forChild(routes), FormsModule, ReactiveFormsModule],
  exports: [RouterModule],
})
export class RegisterManualAddendumRoutingModule {}
