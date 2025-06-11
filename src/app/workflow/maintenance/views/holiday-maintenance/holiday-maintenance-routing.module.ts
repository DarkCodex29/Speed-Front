import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HolidayMaintenanceComponent } from './holiday-maintenance.component';

const routes: Routes = [{ path: '', component: HolidayMaintenanceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HolidayMaintenanceRoutingModule {}
