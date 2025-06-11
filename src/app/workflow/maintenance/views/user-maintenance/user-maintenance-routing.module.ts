import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserMaintenanceComponent } from './user-maintenance.component';

const routes: Routes = [{ path: '', component: UserMaintenanceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserMaintenanceRoutingModule {}
