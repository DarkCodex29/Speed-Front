import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormPresenter } from '@speed/common/helpers';
import { IPurchaseTransaction } from '@speed/common/interfaces/forms';

@Injectable()
export class PurchaseTransactionMaintenancePresenter extends FormPresenter<IPurchaseTransaction> {
  public constructor(private fb: FormBuilder) {
    super();

    this.form = this.fb.group({
      descripcion: null,
    });
  }

  public clearForm() {
    this.form.reset();
  }
}
