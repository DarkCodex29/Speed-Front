import { NgFor, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DialogConfig, DialogRef } from '@speed/common/dialog';
import { ContractDetailService } from '@speed/final-user/common/services';
import { Subject, takeUntil } from 'rxjs';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { IHistorialOutput } from '@speed/common/interfaces';
import { SpinnerOverlayService } from '@speed/common/services';

@Component({
  standalone: true,
  selector: 'ui-trace-modal',
  templateUrl: './trace-modal.component.html',
  styleUrls: ['./trace-modal.component.scss'],
  imports: [NgIf, NgFor, TableModule, InputTextModule],
  providers: [ContractDetailService],
})
export class TraceModalComponent implements OnInit, OnDestroy {
  public historialOutput?: IHistorialOutput;
  private idExpedient?: number;
  private unsubscribe: Subject<void>;

  public constructor(
    private dialogRef: DialogRef<unknown>,
    private dialogConfig: DialogConfig<number>,
    private contractDetailService: ContractDetailService,
    private spinnerService: SpinnerOverlayService,
  ) {
    this.unsubscribe = new Subject();
    this.idExpedient = this.dialogConfig.data;
  }

  public ngOnInit(): void {
    this.spinnerService.show();
    this.contractDetailService
      .getViewHistory(Number(this.idExpedient))
      .pipe(takeUntil(this.unsubscribe))
      .subscribe({
        next: (response) => {
          this.historialOutput = response;
          this.spinnerService.hide();
        },
        error: (error) => {
          console.error(error);
          this.spinnerService.hide();
        },
      });
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public close() {
    this.dialogRef.close();
  }
}
