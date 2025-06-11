import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeaseReportComponent } from './lease-report.component';

const routes: Routes = [{ path: '', component: LeaseReportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeaseReportRoutingModule {}
