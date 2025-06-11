import { Component } from '@angular/core';
import { DialogConfig, DialogRef } from '@speed/common/dialog';
import { IPurchaseTransaction } from '@speed/common/interfaces/forms';
import { SpinnerOverlayService } from '@speed/common/services';
import { Subject, takeUntil } from 'rxjs';
import { PurchaseTransactionService } from 'src/app/workflow/maintenance/common/services';

@Component({
  selector: 'app-purchase-transaction-modal',
  templateUrl: 'purchase-transaction-modal.container.html',
  providers: [PurchaseTransactionService],
})
export class PurchaseTransactionModalContainer {
  public purchaseTransaction?: IPurchaseTransaction;
  private unsubscribe: Subject<void>;

  public constructor(
    private dialogConfig: DialogConfig<{ purchaseTransaction?: IPurchaseTransaction }>,
    private dialogRef: DialogRef<boolean>,
    private purchaseTransactionService: PurchaseTransactionService,
    private spinnerService: SpinnerOverlayService,
  ) {
    this.unsubscribe = new Subject();
    this.purchaseTransaction = this.dialogConfig.data?.purchaseTransaction;
  }

  public closeModal() {
    this.dialogRef.close();
  }

  public savePurchaseTransaction(formValue: IPurchaseTransaction) {
    this.spinnerService.show();
    this.purchaseTransactionService
      .guardar(formValue)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe({
        next: () => {
          this.spinnerService.hide();
          this.dialogRef.close(true);
        },
        error: (error) => {
          this.spinnerService.hide();
          console.error(error);
        },
      });
  }
}
