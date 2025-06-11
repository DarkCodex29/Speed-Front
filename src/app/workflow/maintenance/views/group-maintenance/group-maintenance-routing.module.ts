import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupMaintenanceComponent } from './group-maintenance.component';

const routes: Routes = [{ path: '', component: GroupMaintenanceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupMaintenanceRoutingModule {}
