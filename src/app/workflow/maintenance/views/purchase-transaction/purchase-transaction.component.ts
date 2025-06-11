import { Component, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { DialogService } from '@speed/common/dialog';
import { IPurchaseTransaction } from '@speed/common/interfaces/forms';
import { Table } from 'primeng/table';
import { Subject, takeUntil } from 'rxjs';
import { PurchaseTransactionMaintenancePresenter } from './purchase-transaction.presenter';
import { PurchaseTransactionModalContainer } from '@speed/common/modals';

@Component({
  selector: 'app-purchase-transaction',
  templateUrl: 'purchase-transaction.component.html',
  styleUrls: ['purchase-transaction.component.scss'],
  providers: [PurchaseTransactionMaintenancePresenter],
})
export class PurchaseTransactionComponent implements OnDestroy {
  @ViewChild('pt') public pTable?: Table;
  @Input() public listPurchase: Array<IPurchaseTransaction> = [];
  @Output() private searchRecords: EventEmitter<IPurchaseTransaction | null>;
  @Output() private deleteRecord: EventEmitter<number>;
  private unsubscribe: Subject<void>;

  public constructor(
    private dialogService: DialogService,
    public purchaseTransactionPresenter: PurchaseTransactionMaintenancePresenter,
  ) {
    this.unsubscribe = new Subject();
    this.searchRecords = new EventEmitter();
    this.deleteRecord = new EventEmitter();
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public filterRows(event: Event) {
    const value = (event.target as EventTarget & { value: string }).value;
    this.pTable?.filterGlobal(value, 'contains');
  }

  public clickedOpenModalRegister() {
    this.dialogService
      .show({
        component: PurchaseTransactionModalContainer,
      })
      .afterClosed.pipe(takeUntil(this.unsubscribe))
      .subscribe((response) => {
        if (response) {
          this.searchRecords.emit(null);
        }
      });
  }

  public clickedOpenModalEditPurchase(model: IPurchaseTransaction) {
    this.dialogService
      .show({
        component: PurchaseTransactionModalContainer,
        config: {
          data: {
            purchaseTransaction: model,
          },
        },
      })
      .afterClosed.pipe(takeUntil(this.unsubscribe))
      .subscribe((response) => {
        if (response) {
          this.searchRecords.emit(null);
        }
      });
  }

  public clickedClearSearchPanel() {
    this.purchaseTransactionPresenter.clearForm();
  }

  public clickedFilter(formValues: IPurchaseTransaction) {
    this.searchRecords.emit(formValues);
  }

  public onClickedDelete(idModel: number) {
    this.deleteRecord.emit(idModel);
  }
}
