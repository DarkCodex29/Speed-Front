import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomReactiveFormDirective } from '@speed/common/directives';
import { PenaltyMaintenanceComponent } from './penalty-maintenance.component';
import { PenaltyMaintenanceRoutingModule } from './penalty-maintenance-routing.module';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, PenaltyMaintenanceRoutingModule, CustomReactiveFormDirective, TableModule, InputTextModule],
  declarations: [PenaltyMaintenanceComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PenaltyMaintenanceModule {}
