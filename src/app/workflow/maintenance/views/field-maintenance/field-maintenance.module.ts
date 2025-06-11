import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomReactiveFormDirective } from '@speed/common/directives';
import { FieldMaintenanceComponent } from './field-maintenance.component';
import { FieldMaintenanceRoutingModule } from './field-maintenance-routing.module';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, FieldMaintenanceRoutingModule, CustomReactiveFormDirective, TableModule, InputTextModule],
  declarations: [FieldMaintenanceComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FieldMaintenanceModule {}
