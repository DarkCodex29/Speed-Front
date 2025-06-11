import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PendingTrayStatusComponent } from './pending-tray-status.component';

const routes: Routes = [{ path: '', component: PendingTrayStatusComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PendingTrayStatusRoutingModule {}
