import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogConfig, DialogRef, DialogService } from '@speed/common/dialog';
import { IParamsDelete } from '../../interfaces/params-delete.interface';
import { Utils } from '@speed/common/helpers';
import { ArchiveFileService, SpinnerOverlayService } from '@speed/common/services';
import { Subject, takeUntil } from 'rxjs';
import { MessageModalComponent } from '@speed/common/modals';

@Component({
  standalone: true,
  selector: 'ui-delete-document-modal',
  templateUrl: './delete-document-modal.component.html',
  styleUrls: ['./delete-document-modal.component.scss'],
  imports: [ReactiveFormsModule],
  providers: [ArchiveFileService],
})
export class DeleteDocumentModalComponent implements OnInit, OnDestroy {
  @Output() public deleteDocumentEvent = new EventEmitter();
  public params?: IParamsDelete;
  public deleteDocumentForm = this.fb.group({
    observacion: [''],
  });
  private unsubscribe: Subject<void>;

  public constructor(
    private spinnerService: SpinnerOverlayService,
    private fb: FormBuilder,
    private dialogRef: DialogRef<unknown>,
    private dialogConfig: DialogConfig,
    private archiveFileService: ArchiveFileService,
    private dialogService: DialogService,
  ) {
    this.unsubscribe = new Subject();
  }

  public ngOnInit() {
    this.params = (this.dialogConfig.data as IParamsDelete) || null;
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public close() {
    this.dialogRef.close();
  }

  public onSubmit() {
    Utils.validateAllFields(this.deleteDocumentForm);
    if (this.deleteDocumentForm.valid) {
      this.spinnerService.show();
      const paramsDelete = {
        idExpediente: this.params?.idExpediente,
        observacion: this.deleteDocumentForm.get('observacion')?.value,
        accion: this.params?.accion,
        eliminarSolicitud: this.params?.eliminarSolicitud,
      };
      this.archiveFileService
        .archivar(paramsDelete)
        .pipe(takeUntil(this.unsubscribe))
        .subscribe({
          next: () => {
            this.spinnerService.hide();
            this.dialogRef.close(true);
            this.dialogService.show({
              component: MessageModalComponent,
              config: {
                data: {
                  message: 'Documento eliminado exitósamente',
                },
              },
            });
          },
          error: (error) => {
            this.spinnerService.hide();
            console.error(error);
            this.dialogService.show({
              component: MessageModalComponent,
              config: { data: { message: 'Error al eliminar, intente nuevamente.' } },
            });
          },
        });
    }
  }

  public emitirEvento() {
    this.deleteDocumentEvent.emit();
  }
}
