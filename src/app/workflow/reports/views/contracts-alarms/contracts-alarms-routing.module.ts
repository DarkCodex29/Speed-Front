import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContractsAlarmsComponent } from './contracts-alarms.component';

const routes: Routes = [{ path: '', component: ContractsAlarmsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContractsAlarmsRoutingModule {}
