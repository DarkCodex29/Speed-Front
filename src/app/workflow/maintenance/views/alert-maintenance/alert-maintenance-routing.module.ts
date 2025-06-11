import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlertMaintenanceComponent } from './alert-maintenance.component';

const routes: Routes = [{ path: '', component: AlertMaintenanceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlertMaintenanceRoutingModule {}
