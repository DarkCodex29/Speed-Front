import { Injectable } from '@angular/core';
import { IAttachDraftModalModel } from '@speed/common/interfaces/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { FormPresenter } from '@speed/common/helpers';

@Injectable()
export class AttachDraftModalPresenter extends FormPresenter<IAttachDraftModalModel> {
  public constructor(private fb: FormBuilder) {
    super();
    this.form = this.fb.group({
      id: [null, Validators.required],
      archivo: [null, Validators.required],
      idDestinatarios: [[]],
      enviadoC: [null],
    });
  }
}
