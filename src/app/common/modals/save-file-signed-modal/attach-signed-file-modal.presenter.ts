import { Injectable } from '@angular/core';
import { IAttachFileModalModel, IAttachSignedFileModel } from '@speed/common/interfaces/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { FormPresenter } from '@speed/common/helpers';

@Injectable()
export class AttachSignedFileModalPresenter extends FormPresenter<IAttachSignedFileModel> {
  public constructor(private fb: FormBuilder) {
    super();
    this.form = this.fb.group({
      idDocumento: [null, Validators.required],
      archivo: [null, Validators.required],
    });
  }
}
