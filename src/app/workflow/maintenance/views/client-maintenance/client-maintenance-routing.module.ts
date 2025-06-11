import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientMaintenanceComponent } from './client-maintenance.component';

const routes: Routes = [{ path: '', component: ClientMaintenanceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientMaintenanceRoutingModule {}
