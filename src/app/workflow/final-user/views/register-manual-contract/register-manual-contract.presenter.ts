import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormPresenter } from '@speed/common/helpers/form.presenter';
import { IManualContract } from '@speed/common/interfaces';
import { CounterpartModel } from '@speed/common/models';

@Injectable()
export class RegisterManualContractPresenter extends FormPresenter<IManualContract> {
  public counterpartData!: FormGroup;
  public elaborationDocument!: FormGroup;

  public constructor(private fb: FormBuilder) {
    super();
    this.form = this.fb.group({});
  }

  public initContractForm(): FormGroup {
    this.counterpartData = this.fb.group(new CounterpartModel());
    this.form.addControl('counterpart', this.counterpartData);
    return this.counterpartData;
  }
}
