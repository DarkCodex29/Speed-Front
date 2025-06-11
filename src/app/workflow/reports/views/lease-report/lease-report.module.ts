import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { LeaseReportComponent } from './lease-report.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LeaseReportRoutingModule } from './lease-report-routing.module';
import { CustomReactiveFormDirective } from '@speed/common/directives';
import { TableModule } from 'primeng/table';
import { ContractDetailModule } from '@speed/final-user/common/forms';
import { TabsModule } from '@speed/common/tabs';

@NgModule({
  imports: [
    CommonModule,
    ContractDetailModule,
    TabsModule,
    ReactiveFormsModule,
    LeaseReportRoutingModule,
    CustomReactiveFormDirective,
    TableModule,
  ],
  declarations: [LeaseReportComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LeaseReportModule {}
