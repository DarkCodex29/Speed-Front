import { NgIf, NgFor } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnDestroy, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogConfig, DialogRef, DialogService } from '@speed/common/dialog';
import { IAttachDocumentModal, IFile, IResponseFile } from '@speed/common/interfaces';
import { SpinnerOverlayService } from '@speed/common/services';
import { ContractDetailService, FileService } from '@speed/final-user/common/services';
import { Subject, takeUntil } from 'rxjs';
import { AttachDocumentModalPresenter } from './attach-document-modal.presenter';
import { CustomReactiveFormDirective } from '@speed/common/directives';
import { MessageModalComponent } from '../message-modal';

@Component({
  standalone: true,
  selector: 'ui-attach-document-modal',
  templateUrl: './attach-document-modal.component.html',
  styleUrls: ['./attach-document-modal.component.scss'],
  imports: [NgIf, NgFor, ReactiveFormsModule, CustomReactiveFormDirective],
  providers: [ContractDetailService, FileService, AttachDocumentModalPresenter],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AttachDocumentModalComponent implements OnInit, OnDestroy {
  public attachDocumentConfig?: IAttachDocumentModal;
  public file?: IFile;
  public idExpediente?: number;
  private unsubscribe: Subject<void>;

  public constructor(
    private dialogService: DialogService,
    private dialogRef: DialogRef<boolean>,
    private dialogConfig: DialogConfig<number>,
    private contractDetailService: ContractDetailService,
    private spinnerService: SpinnerOverlayService,
    public attachDocumentForm: AttachDocumentModalPresenter,
    private fileService: FileService,
  ) {
    this.unsubscribe = new Subject();
    this.idExpediente = this.dialogConfig.data;
  }

  public ngOnInit(): void {
    this.spinnerService.show();
    this.contractDetailService
      .dataConfigAttachDocument()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe({
        next: (response) => {
          this.attachDocumentConfig = response;
          this.attachDocumentForm.Form.get('idExpediente')?.setValue(this.idExpediente);
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public onUpload(event: any) {
    this.spinnerService.show();
    const fileUpload = event.target.files[0];
    const formData = new FormData();
    formData.append('archivoSubir', fileUpload);
    this.fileService.uploadFile(formData).subscribe((response: IResponseFile) => {
      event.target.value = '';
      this.file = {
        name: response.archivo,
        path: response.nombreArchivoDisco,
        size: (fileUpload.size * 0.00097656).toFixed(2),
      };
      this.attachDocumentForm.Form.get('archivo')?.setValue([response.nombreArchivoDisco]);
      this.spinnerService.hide();
    });
  }

  public deleteFileUpload() {
    this.file = undefined;
  }

  public onClickedSaveDocument() {
    const params = this.attachDocumentForm.Value;
    this.spinnerService.show();
    this.contractDetailService
      .saveNewDocument(params)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe({
        next: (response) => {
          this.spinnerService.hide();
          this.dialogRef.close(true);
          this.dialogService.show({
            component: MessageModalComponent,
            config: {
              data: {
                message: response.message,
              },
            },
          });
        },
        error: (err) => {
          console.error(err);
          this.spinnerService.hide();
          this.dialogService.show({
            component: MessageModalComponent,
            config: {
              data: {
                message: 'Hubo un error al guardar el documento.',
              },
            },
          });
        },
      });
  }
}
