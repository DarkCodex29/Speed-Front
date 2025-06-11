import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomReactiveFormDirective } from '@speed/common/directives';
import { ClientMaintenanceComponent } from './client-maintenance.component';
import { ClientMaintenanceRoutingModule } from './client-maintenance-routing.module';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, ClientMaintenanceRoutingModule, CustomReactiveFormDirective, TableModule, InputTextModule],
  declarations: [ClientMaintenanceComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ClientMaintenanceModule {}
