import { NgFor, NgIf } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogConfig, DialogRef, DialogService } from '@speed/common/dialog';
import { Subject, takeUntil } from 'rxjs';
import { SendRequestService } from '../../../workflow/final-user/common/services/send-request.service';
import { DocumentService } from '@speed/final-user/common/services';
import { HcTipoContrato } from '@speed/common/interfaces';
import { CustomReactiveFormDirective } from '@speed/common/directives';
import { Utils } from '@speed/common/helpers';
import { environment } from '@speed/env/environment';
import { SpinnerOverlayService } from '@speed/common/services';
import { MessageModalComponent } from '../message-modal';

@Component({
  standalone: true,
  selector: 'app-addendum-template-modal',
  templateUrl: './generate-addendum-template-modal.component.html',
  styleUrls: ['./generate-addendum-template-modal.component.scss'],
  imports: [NgIf, NgFor, ReactiveFormsModule, CustomReactiveFormDirective],
  providers: [DocumentService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GenerateAddendumTemplateComponent implements OnInit, OnDestroy {
  public idDocumento?: number;
  public tiposContrato?: Array<HcTipoContrato> = [];
  public formRequest: FormGroup;
  private unsubscribe: Subject<void>;
  public constructor(
    private dialogService: DialogService,
    private dialogRef: DialogRef<unknown>,
    private formBuilder: FormBuilder,
    private dialogConfig: DialogConfig<number>,
    private documentService: DocumentService,
    private spinnerService: SpinnerOverlayService,
  ) {
    this.unsubscribe = new Subject();
    this.idDocumento = this.dialogConfig.data;
    this.formRequest = this.formBuilder.group({
      idDocumento: [this.idDocumento, Validators.required],
      idHcTipoContrato: ['', Validators.required],
    });
  }

  public async ngOnInit() {
    this.tiposContrato = await this.documentService.findTipoContratos();
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
  public downloadPlantilla() {
    Utils.validateAllFields(this.formRequest);
    if (this.formRequest.valid) {
      this.documentService
        .validarPlantilla(this.formRequest.value)
        .pipe(takeUntil(this.unsubscribe))
        .subscribe({
          next: () => {
            this.documentService.downloadPlatillaDocument(this.formRequest.value).subscribe({
              next: (response) => {
                this.spinnerService.hide();
                const fileName = response.headers.get('Content-Disposition')?.split(';')[1].split('=')[1];
                const blob: Blob = response.body as Blob;
                const a = document.createElement('a');
                a.download = fileName ?? '';
                a.href = window.URL.createObjectURL(blob);
                a.click();
              },
              error: () => {
                this.spinnerService.hide();
                this.dialogService.show({
                  component: MessageModalComponent,
                  config: {
                    data: {
                      message: 'No existe la plantilla',
                    },
                  },
                });
              },
            });
            this.close();
          },
          error: (e) => {
            this.spinnerService.hide();
            this.dialogService.show({
              component: MessageModalComponent,
              config: {
                data: {
                  message: 'No existe la plantilla',
                },
              },
            });
            this.close();
          },
        });
    }
  }
  public downloadFile(idArchivo: number) {
    const fileURL = String(environment.apiUrl + '/descargarArchivo/' + idArchivo + '/');
    window.open(fileURL, '_blank');
  }
  public close() {
    this.dialogRef.close();
  }
}
