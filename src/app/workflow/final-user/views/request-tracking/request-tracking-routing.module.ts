import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestTrackingComponent } from './request-tracking.component';

const routes: Routes = [{ path: '', component: RequestTrackingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestTrackingRoutingModule {}
