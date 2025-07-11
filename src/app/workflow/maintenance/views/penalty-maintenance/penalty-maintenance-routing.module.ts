import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PenaltyMaintenanceComponent } from './penalty-maintenance.component';

const routes: Routes = [{ path: '', component: PenaltyMaintenanceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PenaltyMaintenanceRoutingModule {}
