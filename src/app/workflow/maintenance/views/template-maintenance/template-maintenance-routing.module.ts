import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateMaintenanceComponent } from './template-maintenance.component';

const routes: Routes = [{ path: '', component: TemplateMaintenanceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TemplateMaintenanceRoutingModule {}
