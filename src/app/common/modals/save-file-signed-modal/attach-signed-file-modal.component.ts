import { NgIf, NgFor } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnDestroy, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogConfig, DialogRef, DialogService } from '@speed/common/dialog';
import { IAttachDocumentModal, IFile, IResponseFile } from '@speed/common/interfaces';
import { SpinnerOverlayService } from '@speed/common/services';
import { AttachFileService, FileService } from '@speed/final-user/common/services';
import { Subject, takeUntil } from 'rxjs';
import { CustomReactiveFormDirective } from '@speed/common/directives';
import { MessageModalComponent } from '../message-modal';
import { AttachSignedFileModalPresenter } from './attach-signed-file-modal.presenter';
import { SignedFileService } from '@speed/final-user/common/services/signed-file.service';

@Component({
  standalone: true,
  selector: 'ui-attach-file-modal',
  templateUrl: './attach-signed-file-modal.component.html',
  styleUrls: ['./attach-signed-file-modal.component.scss'],
  imports: [NgIf, NgFor, ReactiveFormsModule, CustomReactiveFormDirective],
  providers: [AttachSignedFileModalPresenter, SignedFileService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AttachSignedFileModalComponent implements OnInit, OnDestroy {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public attachDocumentConfig?: IAttachDocumentModal;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public datosDocument?: any;
  public file?: IFile;
  public id?: number;
  private unsubscribe: Subject<void>;

  public constructor(
    private dialogService: DialogService,
    private dialogRef: DialogRef<unknown>,
    private dialogConfig: DialogConfig<number>,
    private spinnerService: SpinnerOverlayService,
    public attachDraftForm: AttachSignedFileModalPresenter,
    private signedFileService: SignedFileService,
  ) {
    this.unsubscribe = new Subject();
    this.id = this.dialogConfig.data;
  }
  public ngOnInit(): void {
    this.attachDraftForm.Form.get('idDocumento')?.setValue(this.id);
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public close() {
    const params = { modified: false };
    this.dialogRef.close(params);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public onUpload(event: any) {
    this.spinnerService.show();
    try {
      const fileUpload = event.target.files[0];
      const formData = new FormData();
      formData.append('archivoSubir', fileUpload);
      this.signedFileService.uploadFile(formData).subscribe((response: IResponseFile) => {
        event.target.value = '';
        this.file = {
          name: response.archivo,
          path: response.nombreArchivoDisco,
          size: (fileUpload.size * 0.00097656).toFixed(2),
        };
        this.attachDraftForm.Form.get('archivo')?.setValue(response.nombreArchivoDisco);
        this.spinnerService.hide();
      });
    } catch (error) {
      this.spinnerService.hide();
    }
  }

  public deleteFileUpload() {
    this.file = undefined;
  }

  public async onClickedSaveDocument() {
    try {
      this.spinnerService.show();
      const paramsUpload = this.attachDraftForm.Value;
      this.signedFileService
        .saveSigned(paramsUpload)
        .pipe(takeUntil(this.unsubscribe))
        .subscribe({
          next: () => {
            this.spinnerService.hide();
            const params = { modified: true };
            this.dialogRef.close(params);
            this.dialogService.show({
              component: MessageModalComponent,
              config: {
                data: {
                  message: 'Se adjuntó el archivo correctamente',
                },
              },
            });
          },
          error: (err: unknown) => {
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
    } catch (err) {
      this.dialogService.show({
        component: MessageModalComponent,
        config: {
          data: {
            message: 'Error al verificar el archivo',
          },
        },
      });
    }
  }
}
