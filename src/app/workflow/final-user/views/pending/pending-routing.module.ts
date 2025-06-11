import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PendingContainer } from './pending.container';

const routes: Routes = [{ path: '', component: PendingContainer }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PendingRoutingModule {}
