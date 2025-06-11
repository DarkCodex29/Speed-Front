import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AreaMaintenanceComponent } from './area-maintenance.component';

const routes: Routes = [{ path: '', component: AreaMaintenanceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AreaMaintenanceRoutingModule {}
