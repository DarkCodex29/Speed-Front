import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomReactiveFormDirective } from '@speed/common/directives';
import { WorkflowMaintenanceComponent } from './workflow-maintenance.component';
import { WorkflowMaintenanceRoutingModule } from './workflow-maintenance-routing.module';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, WorkflowMaintenanceRoutingModule, CustomReactiveFormDirective, TableModule, InputTextModule],
  declarations: [WorkflowMaintenanceComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WorkflowMaintenanceModule {}
