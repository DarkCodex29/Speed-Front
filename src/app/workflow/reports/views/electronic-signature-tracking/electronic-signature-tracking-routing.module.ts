import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ElectronicSignatureTrackingComponent } from './electronic-signature-tracking.component';

const routes: Routes = [{ path: '', component: ElectronicSignatureTrackingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ElectronicSignatureTrackingRoutingModule {}
