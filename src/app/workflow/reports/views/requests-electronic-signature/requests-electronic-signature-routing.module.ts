import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestsElectronicSignatureComponent } from './requests-electronic-signature.component';

const routes: Routes = [{ path: '', component: RequestsElectronicSignatureComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestsElectronicSignatureRoutingModule {}
