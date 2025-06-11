import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MonitoringOpenProcessesComponent } from './monitoring-open-processes.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MonitoringOpenProcessesRoutingModule } from './monitoring-open-processes-routing.module';
import { CustomReactiveFormDirective } from '@speed/common/directives';
import { TableModule } from 'primeng/table';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, MonitoringOpenProcessesRoutingModule, CustomReactiveFormDirective, TableModule],
  declarations: [MonitoringOpenProcessesComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MonitoringOpenProcessesModule {}
