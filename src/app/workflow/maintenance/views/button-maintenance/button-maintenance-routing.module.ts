import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ButtonMaintenanceComponent } from './button-maintenance.component';

const routes: Routes = [{ path: '', component: ButtonMaintenanceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ButtonMaintenanceRoutingModule {}
