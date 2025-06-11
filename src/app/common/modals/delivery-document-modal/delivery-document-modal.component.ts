import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DialogConfig, DialogRef, DialogService } from '@speed/common/dialog';
import { CustomReactiveFormDirective } from '@speed/common/directives';
import { Subject, takeUntil } from 'rxjs';
import { IDestinatario } from '@speed/common/interfaces/output';
import { Utils } from '@speed/common/helpers';
import { VisatorService } from '@speed/final-user/common/services/visator.service';
import { SendDocumentService } from '@speed/final-user/common/services/send-document.service';
import { MessageModalComponent } from '../message-modal';
import { SpinnerOverlayService } from '@speed/common/services';

@Component({
  standalone: true,
  selector: 'ui-delivery-document-modal',
  templateUrl: './delivery-document-modal.component.html',
  styleUrls: ['./delivery-document-modal.component.scss'],
  imports: [NgIf, NgFor, ReactiveFormsModule, CustomReactiveFormDirective],
  providers: [SendDocumentService],
})
export class DeliveryDocumentModalComponent implements OnInit {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public data: any;
  public destinatario!: IDestinatario;
  public requestForm;
  public loading = true;
  private unsubscribe: Subject<void>;

  public constructor(
    private dialogService: DialogService,
    private dialogRef: DialogRef<unknown>,
    private service: SendDocumentService,
    private dialogConfig: DialogConfig,
    private spinner: SpinnerOverlayService,
    private fb: FormBuilder,
  ) {
    this.unsubscribe = new Subject();
    this.data = this.dialogConfig.data || {};
    this.requestForm = this.fb.group({
      idExpediente: [],
      observacion: ['', []],
      firmaInterna: [false],
      firmaContraparte: [false],
      cargaSistema: [false],
      otros: [false],
    });
  }
  public async ngOnInit() {
    this.requestForm.get('idExpediente')?.setValue(this.data);
    this.loading = false;
  }
  public sendRequest() {
    Utils.validateAllFields(this.requestForm);
    if (this.requestForm.valid) {
      const params = { ...this.requestForm.value };
      if (params.otros == true) {
        params.observacion = 'Otros <br>'.concat(String(params.observacion));
      }
      if (params.firmaInterna == true) {
        params.observacion = 'Firma intern <br>'.concat(String(params.observacion));
      }
      if (params.firmaContraparte == true) {
        params.observacion = 'Firma contraparte <br>'.concat(String(params.observacion));
      }
      if (params.cargaSistema == true) {
        params.observacion = 'Carga en el sistema <br>'.concat(String(params.observacion));
      }
      this.spinner.show();
      this.service
        .registerDelivery(params)
        .pipe(takeUntil(this.unsubscribe))
        .subscribe({
          next: (value) => {
            const params = { modified: true };
            this.spinner.hide();
            this.dialogRef.close(params);
          },
          error: (value) => {
            this.spinner.hide();
            this.dialogService.show({
              component: MessageModalComponent,
              config: {
                data: {
                  message: 'Hubo un error en el envío, inténtelo nuevamente',
                },
              },
            });
          },
        });
    }
  }
  public close() {
    this.dialogRef.close({ modified: false });
  }
}
