import { NgFor, NgIf } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogConfig, DialogRef } from '@speed/common/dialog';
import { CustomReactiveFormDirective } from '@speed/common/directives';
import { Utils } from '@speed/common/helpers';
import { IParameter, IRepresentanteCompania, ISelect, IUser } from '@speed/common/interfaces';
import { CommunicateInterestedService, SpinnerOverlayService } from '@speed/common/services';
import { RegisterRequestService } from '@speed/final-user/common/services';
import { Subject, takeUntil } from 'rxjs';
import { SendElectronicSignaturePresenter } from './send-electronic-signature-modal.presenter';
import { __makeTemplateObject } from 'tslib';

@Component({
  standalone: true,
  selector: 'ui-send-electronic-signature-modal',
  templateUrl: './send-electronic-signature-modal.component.html',
  styleUrls: ['./send-electronic-signature-modal.component.scss'],
  imports: [NgFor, ReactiveFormsModule, CustomReactiveFormDirective, NgIf],
  providers: [CommunicateInterestedService, RegisterRequestService, SendElectronicSignaturePresenter],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SendEletronicSignatureModalComponent implements OnInit {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public representantesLegales: Array<IUser> = [];
  public tiposFirma: Array<IParameter> = [];
  public idiomas: Array<IParameter> = [];
  public data: any;
  private unsubscribe: Subject<void>;

  public constructor(
    private dialogRef: DialogRef<unknown>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private dialogConfig: DialogConfig<any>,
    private service: RegisterRequestService,
    public requestForm: SendElectronicSignaturePresenter,
    private spinnerService: SpinnerOverlayService,
  ) {
    this.unsubscribe = new Subject();
    this.data = this.dialogConfig.data || {};
    this.unsubscribe = new Subject();
  }
  public async ngOnInit() {
    this.requestForm.Form.get('idExpediente')?.setValue(this.data.idExpediente);
    await this.getComboData();
    /*
    this.representantesLegales.push({
      value: 617,
      label: 'CROMWELL ARMANDO YARROW LUMBRERAS',
    });
    this.tiposFirma.push({
      value: 'VF',
      label: 'Videofirma',
    });

    this.tiposFirma.push({
      value: 'FD',
      label: 'Firma dibujada',
    });

    this.idiomas.push({
      value: 'es',
      label: 'Español',
    });
    this.idiomas.push({
      value: 'en',
      label: 'Inglés',
    });
    */
    this.requestForm.Form.get('idRepresentante')?.setValue(this.representantesLegales[0].id);
    this.requestForm.Form.get('tipoFirma')?.setValue(this.tiposFirma[0].valor);
    this.requestForm.Form.get('idioma')?.setValue(this.idiomas[0].valor);
  }

  public sendRequest() {
    if (!this.data?.reenvio) {
      this.sendElectronicaSignature();
    } else {
      this.resendElectronicaSignature();
    }
  }

  public close() {
    this.dialogRef.close();
  }

  private async getComboData() {
    try {
      const responses = await Promise.all([
        this.service.getTiposFirma(),
        this.service.getTiposIdiomas(),
        this.service.getRepresentantesCompania(),
      ]);
      this.tiposFirma = responses[0];
      this.idiomas = responses[1];
      this.representantesLegales = responses[2];
    } catch (err) {
      console.error(err);
      this.spinnerService.hide();
    }
  }

  private sendElectronicaSignature() {
    Utils.validateAllFields(this.requestForm.Form);
    if (this.requestForm.Valid) {
      this.spinnerService.show();
      const params = this.requestForm.Value;
      this.service
        .sendToElectronicSignature(params)
        .pipe(takeUntil(this.unsubscribe))
        .subscribe({
          next: (response) => {
            this.spinnerService.hide();
            const params = { success: true, message: response.message };
            this.dialogRef.close(params);
          },
          error: (e) => {
            this.spinnerService.hide();
            const params = { success: false, message: e.error.message };
            this.dialogRef.close(params);
          },
        });
    }
  }

  private resendElectronicaSignature() {
    Utils.validateAllFields(this.requestForm.Form);
    if (this.requestForm.Valid) {
      this.spinnerService.show();
      const params = this.requestForm.Value;
      this.service
        .resendToElectronicSignature(params)
        .pipe(takeUntil(this.unsubscribe))
        .subscribe({
          next: (response) => {
            this.spinnerService.hide();
            const params = { success: true, message: response.message };
            this.dialogRef.close(params);
          },
          error: (e) => {
            this.spinnerService.hide();
            const params = { success: false, message: e.error.message };
            this.dialogRef.close(params);
          },
        });
    }
  }
}
