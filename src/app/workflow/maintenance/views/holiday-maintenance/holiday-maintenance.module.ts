import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomReactiveFormDirective } from '@speed/common/directives';
import { HolidayMaintenanceComponent } from './holiday-maintenance.component';
import { HolidayMaintenanceRoutingModule } from './holiday-maintenance-routing.module';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, HolidayMaintenanceRoutingModule, CustomReactiveFormDirective, TableModule, InputTextModule],
  declarations: [HolidayMaintenanceComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HolidayMaintenanceModule {}
