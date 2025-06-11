import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkflowMaintenanceComponent } from './workflow-maintenance.component';

const routes: Routes = [{ path: '', component: WorkflowMaintenanceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkflowMaintenanceRoutingModule {}
