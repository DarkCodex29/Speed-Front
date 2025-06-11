import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomReactiveFormDirective } from '@speed/common/directives';
import { UserMaintenanceComponent } from './user-maintenance.component';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { UserMaintenanceRoutingModule } from './user-maintenance-routing.module';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, CustomReactiveFormDirective, TableModule, InputTextModule, UserMaintenanceRoutingModule],
  declarations: [UserMaintenanceComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UserMaintenanceModule {}
