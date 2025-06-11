import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormPresenter } from '@speed/common/helpers';
import { ISecurityModalModel } from '@speed/common/interfaces/forms/security-form.interface';

@Injectable()
export class SecurityModalPresenter extends FormPresenter<ISecurityModalModel> {
  public constructor(private fb: FormBuilder) {
    super();
    this.form = this.fb.group({
      idExpediente: [],
      esConfidencial: [false],
      usuarios: [[]],
      buscadorUsuarios: [],
    });
  }
}
