import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { WorkflowRoutingModule } from './workflow-routing.module';
import { WorkflowComponent } from './workflow.component';
import { WorkflowContainer } from './workflow.container';
import { CommonModule } from '@angular/common';
import { SidebarMenuModule, VirtualAssistantModule } from '@speed/common/components';
import { DialogModule } from '@speed/common/dialog';
import { TabsModule } from '@speed/common/tabs';
import { DashboardModule } from './dashboard/dashboard.module';

@NgModule({
  imports: [CommonModule, WorkflowRoutingModule, SidebarMenuModule, DialogModule, VirtualAssistantModule, TabsModule, DashboardModule],
  declarations: [WorkflowContainer, WorkflowComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WorkflowModule {}
