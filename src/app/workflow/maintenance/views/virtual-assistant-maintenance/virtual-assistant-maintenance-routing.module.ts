import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VirtualAssistantMaintenanceComponent } from './virtual-assistant-maintenance.component';

const routes: Routes = [{ path: '', component: VirtualAssistantMaintenanceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VirtualAssistantMaintenanceRoutingModule {}
