import { Component, OnDestroy, OnInit } from '@angular/core';
import { PurchaseTransactionService } from '../../common/services';
import { IPurchaseTransaction } from '@speed/common/interfaces/forms';
import { SpinnerOverlayService } from '@speed/common/services';
import { DialogService } from '@speed/common/dialog';
import { MessageModalComponent } from '@speed/common/modals';
import { Subject, takeUntil } from 'rxjs';
import { WorkflowTabCacheService } from 'src/app/workflow/workflow-tab-cache-service';

@Component({
  selector: 'app-purchase-transaction-maintenance',
  templateUrl: 'purchase-transaction.container.html',
  providers: [PurchaseTransactionService],
})
export class PurchaseTransactionContainer implements OnInit, OnDestroy {
  public listPurchase: Array<IPurchaseTransaction> = [];
  private unsubscribe: Subject<void>;
  cachedData: any;

  public constructor(
    public purchaseService: PurchaseTransactionService,
    private spinnerService: SpinnerOverlayService,
    private dialogService: DialogService,
    private cacheService: WorkflowTabCacheService
  ) {
    this.unsubscribe = new Subject();
  }

  public async ngOnInit() {
    await this.recoverData();
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public async searchRecords(form: IPurchaseTransaction | null) {
    this.spinnerService.show();
    this.listPurchase = await this.purchaseService.filtrarByParams(form?.descripcion || '');
    this.cachedData.listPurchase = this.listPurchase;
    this.cacheService.set('Compra Transacción', this.cachedData);
    this.spinnerService.hide();
  }

  public deleteRecord(idModel: number) {
    this.spinnerService.show();
    this.purchaseService
      .eliminar(idModel)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe({
        next: async () => {
          this.spinnerService.hide();
          this.dialogService.show({
            component: MessageModalComponent,
            config: {
              data: { message: 'Registro eliminado exitósamente.' },
            },
          });
          this.listPurchase = await this.purchaseService.filtrarByParams();
          this.cachedData.listPurchase = this.listPurchase;
          this.cacheService.set('Compra Transacción', this.cachedData);
        },
        error: (error) => {
          this.spinnerService.hide();
          console.error(error);
        },
      });
  }

  private async recoverData() {
    this.cachedData = this.cacheService.get('Compra Transacción');
    if (this.cachedData && this.cachedData.listPurchase) {
      this.listPurchase = this.cachedData.listPurchase;
    }
    else {
      this.cachedData = {};
      this.spinnerService.show();
      this.listPurchase = await this.purchaseService.filtrarByParams();
      this.cachedData.listPurchase = this.listPurchase;
      this.cacheService.set('Compra Transacción', this.cachedData);
      this.spinnerService.hide();
    }
  }
}

