import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogConfig, DialogRef, DialogService } from '@speed/common/dialog';
import { Utils } from '@speed/common/helpers';
import { ArchiveFileService, SpinnerOverlayService } from '@speed/common/services';
import { Subject, takeUntil } from 'rxjs';
import { MessageModalComponent } from '@speed/common/modals';
import { VisatorService } from '@speed/final-user/common/services/visator.service';
import { ICancelVisaResponse } from '@speed/common/interfaces';
import { NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'ui-cancel-visa-modal',
  templateUrl: './cancel-visa-modal.component.html',
  styleUrls: ['./cancel-visa-modal.component.scss'],
  imports: [ReactiveFormsModule, NgIf],
  providers: [VisatorService],
})
export class CancelVisaModalComponent implements OnInit, OnDestroy {
  @Output() public deleteDocumentEvent = new EventEmitter();
  public params?: any;
  public visationData?: ICancelVisaResponse;
  public loading = false;

  private unsubscribe: Subject<void>;

  public constructor(
    private spinnerService: SpinnerOverlayService,
    private fb: FormBuilder,
    private dialogRef: DialogRef<unknown>,
    private dialogConfig: DialogConfig,
    private visatorService: VisatorService,
    private dialogService: DialogService,
  ) {
    this.unsubscribe = new Subject();
  }

  public async ngOnInit() {
    this.loading = true;
    this.params = this.dialogConfig.data || null;
    this.spinnerService.show();
    this.visationData = await this.visatorService.verCancelarVisado(this.params);
    this.loading = false;
    this.spinnerService.hide();
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public close() {
    this.dialogRef.close();
  }

  public onSubmit() {
    this.spinnerService.show();
    const paramsDelete = {
      idExpediente: this.visationData?.idExpediente,
    };
    this.visatorService
      .cancelarVisado(paramsDelete)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe({
        next: () => {
          this.spinnerService.hide();
          this.dialogRef.close(true);
          this.dialogService.show({
            component: MessageModalComponent,
            config: {
              data: {
                message: 'Visado cancelado exitósamente',
              },
            },
          });
        },
        error: (error) => {
          this.spinnerService.hide();
          this.dialogService.show({
            component: MessageModalComponent,
            config: { data: { message: 'Error al cancelar visado, intente nuevamente.' } },
          });
        },
      });
  }

  public emitirEvento() {
    this.deleteDocumentEvent.emit();
  }
}
