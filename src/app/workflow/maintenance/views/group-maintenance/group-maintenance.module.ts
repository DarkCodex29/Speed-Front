import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomReactiveFormDirective } from '@speed/common/directives';
import { GroupMaintenanceComponent } from './group-maintenance.component';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { GroupMaintenanceRoutingModule } from './group-maintenance-routing.module';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, CustomReactiveFormDirective, TableModule, InputTextModule, GroupMaintenanceRoutingModule],
  declarations: [GroupMaintenanceComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GroupMaintenanceModule {}
