import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StatusReportRoutingModule } from './status-report-routing.module';
import { StatusReportComponent } from './status-report.component';
import { CustomReactiveFormDirective } from '@speed/common/directives';
import { TableModule } from 'primeng/table';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, StatusReportRoutingModule, CustomReactiveFormDirective, TableModule],
  declarations: [StatusReportComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class StatusReportModule {}
