import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomReactiveFormDirective } from '@speed/common/directives';
import { AreaMaintenanceComponent } from './area-maintenance.component';
import { AreaMaintenanceRoutingModule } from './area-maintenance-routing.module';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, AreaMaintenanceRoutingModule, CustomReactiveFormDirective, TableModule, InputTextModule],
  declarations: [AreaMaintenanceComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AreaMaintenanceModule {}
