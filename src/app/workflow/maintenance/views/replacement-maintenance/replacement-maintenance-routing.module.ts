import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReplacementMaintenanceComponent } from './replacement-maintenance.component';

const routes: Routes = [{ path: '', component: ReplacementMaintenanceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReplacementMaintenanceRoutingModule {}
