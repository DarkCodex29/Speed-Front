import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomReactiveFormDirective } from '@speed/common/directives';
import { ReplacementMaintenanceComponent } from './replacement-maintenance.component';
import { ReplacementMaintenanceRoutingModule } from './replacement-maintenance-routing.module';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ReplacementMaintenanceRoutingModule,
    CustomReactiveFormDirective,
    TableModule,
    InputTextModule,
  ],
  declarations: [ReplacementMaintenanceComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ReplacementMaintenanceModule {}
