import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ServiceReportComponent } from './service-report.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ServiceReportRoutingModule } from './service-report-routing.module';
import { CustomReactiveFormDirective } from '@speed/common/directives';
import { TableModule } from 'primeng/table';
import { ContractDetailModule } from '@speed/final-user/common/forms';
import { TabsModule } from '@speed/common/tabs';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ServiceReportRoutingModule,
    CustomReactiveFormDirective,
    TableModule,
    TabsModule,
    ContractDetailModule,
  ],
  declarations: [ServiceReportComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ServiceReportModule {}
