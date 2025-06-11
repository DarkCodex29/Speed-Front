import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomReactiveFormDirective } from '@speed/common/directives';
import { RoleMaintenanceComponent } from './role-maintenance.component';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { RoleMaintenanceRoutingModule } from './role-maintenance-routing.module';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, CustomReactiveFormDirective, TableModule, InputTextModule, RoleMaintenanceRoutingModule],
  declarations: [RoleMaintenanceComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RoleMaintenanceModule {}
