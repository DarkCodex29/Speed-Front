import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IPurchaseTransaction } from '@speed/common/interfaces/forms';
import { PurchaseTransactionModalPresenter } from './purchase-transaction-modal.presenter';

@Component({
  selector: 'ui-purchase-transaction-modal',
  templateUrl: 'purchase-transaction-modal.component.html',
  styleUrls: ['./purchase-transaction-modal.component.scss'],
  providers: [PurchaseTransactionModalPresenter],
})
export class PurchaseTransactionModalComponent implements OnInit {
  @Input() public purchaseTransaction?: IPurchaseTransaction;
  @Output() private savePurchase: EventEmitter<IPurchaseTransaction>;
  @Output() private closeModal: EventEmitter<void>;

  public constructor(public purchaseTransactionPresenter: PurchaseTransactionModalPresenter) {
    this.savePurchase = new EventEmitter();
    this.closeModal = new EventEmitter();
  }

  public ngOnInit() {
    if (this.purchaseTransaction?.id) {
      this.purchaseTransactionPresenter.patchValue(this.purchaseTransaction);
    }
  }

  public clickedCloseModal() {
    this.closeModal.emit();
  }

  public clickedSavePurchaseTransaction(form: IPurchaseTransaction) {
    this.savePurchase.emit(form);
  }
}
