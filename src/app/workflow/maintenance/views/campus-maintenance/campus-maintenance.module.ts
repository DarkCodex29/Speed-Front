import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomReactiveFormDirective } from '@speed/common/directives';
import { CampusMaintenanceComponent } from './campus-maintenance.component';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { CampusMaintenanceRoutingModule } from './campus-maintenance-routing.module';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, CustomReactiveFormDirective, TableModule, InputTextModule, CampusMaintenanceRoutingModule],
  declarations: [CampusMaintenanceComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CampusMaintenanceModule {}
