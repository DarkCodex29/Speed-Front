import { Injectable } from '@angular/core';
import { ICommunicateStakeholdersForm } from '@speed/common/interfaces/forms';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormPresenter } from '@speed/common/helpers';

@Injectable()
export class CommunicateStakeholdersModalPresenter extends FormPresenter<ICommunicateStakeholdersForm> {
  public constructor(private fb: FormBuilder) {
    super();
    this.form = this.fb.group({
      userFilter: [null],
      idExpediente: new FormControl<number | null>(null, Validators.required),
      idInteresados: [null, Validators.required],
      esGrupo: [null, Validators.required],
    });
  }
}
