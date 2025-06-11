import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRepMaintenanceComponent } from './user-rep-maintenance.component';

const routes: Routes = [{ path: '', component: UserRepMaintenanceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRepMaintenanceRoutingModule {}
