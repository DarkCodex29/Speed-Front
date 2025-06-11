import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContractSituationComponent } from './contract-situation.component';

const routes: Routes = [{ path: '', component: ContractSituationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContractSituationRoutingModule {}
