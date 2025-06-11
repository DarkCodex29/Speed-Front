import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonitoringOpenProcessesComponent } from './monitoring-open-processes.component';

const routes: Routes = [{ path: '', component: MonitoringOpenProcessesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MonitoringOpenProcessesRoutingModule {}
