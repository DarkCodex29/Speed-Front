import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagementIndicatorsComponent } from './management-indicators.component';

const routes: Routes = [{ path: '', component: ManagementIndicatorsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagementIndicatorsRoutingModule {}
