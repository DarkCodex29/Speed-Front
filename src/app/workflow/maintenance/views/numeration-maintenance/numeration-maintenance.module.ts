import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomReactiveFormDirective } from '@speed/common/directives';
import { NumerationMaintenanceComponent } from './numeration-maintenance.component';
import { NumerationMaintenanceRoutingModule } from './numeration-maintenance-routing.module';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NumerationMaintenanceRoutingModule,
    CustomReactiveFormDirective,
    TableModule,
    InputTextModule,
  ],
  declarations: [NumerationMaintenanceComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NumerationMaintenanceModule {}
