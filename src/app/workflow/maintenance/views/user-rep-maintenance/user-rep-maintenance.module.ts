import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomReactiveFormDirective } from '@speed/common/directives';
import { UserRepMaintenanceComponent } from './user-rep-maintenance.component';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { UserRepMaintenanceRoutingModule } from './user-rep-maintenance-routing.module';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, CustomReactiveFormDirective, TableModule, InputTextModule, UserRepMaintenanceRoutingModule],
  declarations: [UserRepMaintenanceComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UserRepMaintenanceModule {}
