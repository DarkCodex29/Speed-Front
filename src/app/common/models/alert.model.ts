/* eslint-disable no-useless-escape */
/* eslint-disable max-len */
import { FormControl, Validators } from '@angular/forms';

export class AlertModel {

  public id: FormControl;
  public idGrid: FormControl;
  public idTipoAlerta: FormControl;

  public constructor() {
    this.id = new FormControl();
    this.idGrid = new FormControl(null, Validators.required);
    this.idTipoAlerta = new FormControl();
  }
}
