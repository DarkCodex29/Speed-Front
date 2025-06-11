import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormPresenter } from '@speed/common/helpers';
import { ISendVisaModalModel } from '@speed/common/interfaces/forms/send-visa-form.interface';

@Injectable()
export class SendVisaModalPresenter extends FormPresenter<ISendVisaModalModel> {
  public constructor(private fb: FormBuilder) {
    super();
    this.form = this.fb.group({
      idExpediente: [],
      observacion: [''],
      esUrgente: [false],
      tieneObservacion: [false],
      idVisadores: [[]],
    });
  }
}
