import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomReactiveFormDirective } from '@speed/common/directives';
import { ButtonMaintenanceComponent } from './button-maintenance.component';
import { ButtonMaintenanceRoutingModule } from './button-maintenance-routing.module';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, ButtonMaintenanceRoutingModule, CustomReactiveFormDirective, TableModule, InputTextModule],
  declarations: [ButtonMaintenanceComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ButtonMaintenanceModule {}
