import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormPresenter } from '@speed/common/helpers';
import { IPurchaseTransaction } from '@speed/common/interfaces/forms';

@Injectable()
export class PurchaseTransactionModalPresenter extends FormPresenter<IPurchaseTransaction> {
  public constructor(private fb: FormBuilder) {
    super();

    this.form = this.fb.group({
      id: [null],
      descripcion: [null, Validators.required],
      cantidad: [null, Validators.required],
      costo: [null],
    });
  }
}
