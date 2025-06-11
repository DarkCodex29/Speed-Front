import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FieldMaintenanceComponent } from './field-maintenance.component';

const routes: Routes = [{ path: '', component: FieldMaintenanceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FieldMaintenanceRoutingModule {}
