import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseTransactionContainer } from './purchase-transaction.container';

const routes: Routes = [{ path: '', component: PurchaseTransactionContainer }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PurchaseTransactionRoutingModule {}
