import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProcessMaintenanceComponent } from './process-maintenance.component';

const routes: Routes = [{ path: '', component: ProcessMaintenanceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProcessMaintenanceRoutingModule {}
