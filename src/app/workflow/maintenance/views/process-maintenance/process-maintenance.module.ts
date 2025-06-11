import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomReactiveFormDirective } from '@speed/common/directives';
import { ProcessMaintenanceComponent } from './process-maintenance.component';
import { ProcessMaintenanceRoutingModule } from './process-maintenance-routing.module';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, ProcessMaintenanceRoutingModule, CustomReactiveFormDirective, TableModule, InputTextModule],
  declarations: [ProcessMaintenanceComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProcessMaintenanceModule {}
