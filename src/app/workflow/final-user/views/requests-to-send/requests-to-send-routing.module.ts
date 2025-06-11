import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestsToSendContainer } from './requests-to-send.container';

const routes: Routes = [{ path: '', component: RequestsToSendContainer }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestsToSendRoutingModule {}
