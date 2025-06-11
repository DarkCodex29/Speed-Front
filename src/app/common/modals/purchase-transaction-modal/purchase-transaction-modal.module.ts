import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NumberOnlyDirective, NumericOnlyDirective } from '@speed/common/directives';
import { PurchaseTransactionModalContainer } from './purchase-transaction-modal.container';
import { PurchaseTransactionModalComponent } from './purchase-transaction-modal.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, NumberOnlyDirective, NumericOnlyDirective],
  declarations: [PurchaseTransactionModalContainer, PurchaseTransactionModalComponent],
  exports: [PurchaseTransactionModalContainer, PurchaseTransactionModalComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PurchaseTransactionModalModule {}
