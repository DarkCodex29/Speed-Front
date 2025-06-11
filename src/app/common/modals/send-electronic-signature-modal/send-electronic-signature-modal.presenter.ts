import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormPresenter } from '@speed/common/helpers';
import { ISendEletronicSignatureModalModel } from '@speed/common/interfaces/forms/send-electronic-signature-form.interface';

@Injectable()
export class SendElectronicSignaturePresenter extends FormPresenter<ISendEletronicSignatureModalModel> {
  public constructor(private fb: FormBuilder) {
    super();
    this.form = this.fb.group({
      idExpediente: [],
      idRepresentante: [-1, [Validators.required, Validators.pattern('^[0-9]*$')]],
      tipoFirma: ['', [Validators.required, Validators.minLength(2)]],
      idioma: ['', [Validators.required, Validators.minLength(2)]],
    });
  }
}
