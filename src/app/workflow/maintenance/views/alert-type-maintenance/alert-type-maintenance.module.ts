import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomReactiveFormDirective } from '@speed/common/directives';
import { AlertTypeMaintenanceComponent } from './alert-type-maintenance.component';
import { AlertTypeMaintenanceRoutingModule } from './alert-type-maintenance-routing.module';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, AlertTypeMaintenanceRoutingModule, CustomReactiveFormDirective, TableModule, InputTextModule],
  declarations: [AlertTypeMaintenanceComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AlertTypeMaintenanceModule {}
