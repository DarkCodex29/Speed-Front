import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserGroupsReportComponent } from './user-groups-report.component';

const routes: Routes = [{ path: '', component: UserGroupsReportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserGroupsReportRoutingModule {}
