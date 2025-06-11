import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { UserGroupsReportComponent } from './user-groups-report.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UserGroupsReportRoutingModule } from './user-groups-report-routing.module';
import { CustomReactiveFormDirective } from '@speed/common/directives';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, UserGroupsReportRoutingModule, CustomReactiveFormDirective],
  declarations: [UserGroupsReportComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UserGroupsReportModule {}
