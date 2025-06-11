import { Injectable } from '@angular/core';
import { IAttachFileModalModel } from '@speed/common/interfaces/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { FormPresenter } from '@speed/common/helpers';

@Injectable()
export class AttachFileModalPresenter extends FormPresenter<IAttachFileModalModel> {
  public constructor(private fb: FormBuilder) {
    super();
    this.form = this.fb.group({
      idDocumento: [null, Validators.required],
      nombreArchivoDisco: [null, Validators.required],
    });
  }
}
