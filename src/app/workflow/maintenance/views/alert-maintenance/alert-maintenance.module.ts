import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomReactiveFormDirective } from '@speed/common/directives';
import { AlertMaintenanceComponent } from './alert-maintenance.component';
import { AlertMaintenanceRoutingModule } from './alert-maintenance-routing.module';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, AlertMaintenanceRoutingModule, CustomReactiveFormDirective, TableModule, InputTextModule],
  declarations: [AlertMaintenanceComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AlertMaintenanceModule {}
