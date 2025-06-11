import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomReactiveFormDirective } from '@speed/common/directives';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { PurchaseTransactionContainer } from './purchase-transaction.container';
import { PurchaseTransactionComponent } from './purchase-transaction.component';
import { PurchaseTransactionRoutingModule } from './purchase-transaction-routing.module';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, PurchaseTransactionRoutingModule, CustomReactiveFormDirective, TableModule, InputTextModule],
  declarations: [PurchaseTransactionContainer, PurchaseTransactionComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PurchaseTransactionModule {}
