import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomReactiveFormDirective } from '@speed/common/directives';
import { ProfileMaintenanceComponent } from './profile-maintenance.component';
import { ProfileMaintenanceRoutingModule } from './profile-maintenance-routing.module';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, ProfileMaintenanceRoutingModule, CustomReactiveFormDirective, TableModule, InputTextModule],
  declarations: [ProfileMaintenanceComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProfileMaintenanceModule {}
