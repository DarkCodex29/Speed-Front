import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampusMaintenanceComponent } from './campus-maintenance.component';

const routes: Routes = [{ path: '', component: CampusMaintenanceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CampusMaintenanceRoutingModule {}
