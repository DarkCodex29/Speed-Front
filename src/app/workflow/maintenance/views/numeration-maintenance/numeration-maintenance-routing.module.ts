import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NumerationMaintenanceComponent } from './numeration-maintenance.component';

const routes: Routes = [{ path: '', component: NumerationMaintenanceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NumerationMaintenanceRoutingModule {}
