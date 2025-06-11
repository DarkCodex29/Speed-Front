import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ContractsAlarmsComponent } from './contracts-alarms.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ContractsAlarmsRoutingModule } from './contracts-alarms-routing.module';
import { CustomReactiveFormDirective } from '@speed/common/directives';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, ContractsAlarmsRoutingModule, CustomReactiveFormDirective, TableModule, CalendarModule],
  declarations: [ContractsAlarmsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ContractsAlarmsModule { }
