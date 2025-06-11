import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InboxContainer } from './inbox.container';

const routes: Routes = [{ path: '', component: InboxContainer }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InboxRoutingModule {}
