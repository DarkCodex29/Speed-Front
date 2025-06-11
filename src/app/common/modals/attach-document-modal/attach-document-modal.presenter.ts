import { Injectable } from '@angular/core';
import { IAttachDocumentModalModel } from '@speed/common/interfaces/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { FormPresenter } from '@speed/common/helpers';

@Injectable()
export class AttachDocumentModalPresenter extends FormPresenter<IAttachDocumentModalModel> {
  public constructor(private fb: FormBuilder) {
    super();
    this.form = this.fb.group({
      idExpediente: [null, Validators.required],
      idTipoDocumento: [null, Validators.required],
      numero: ['ND', Validators.required],
      titulo: [null, Validators.required],
      archivo: [null, Validators.required],
    });
  }
}
