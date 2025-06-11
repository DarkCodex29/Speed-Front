import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContractDetailExternalContainer } from './contract-detail-external.container';

const routes: Routes = [{ path: '', component: ContractDetailExternalContainer }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContractDetailExternalRoutingModule {}
