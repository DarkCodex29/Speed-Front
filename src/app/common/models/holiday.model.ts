/* eslint-disable no-useless-escape */
/* eslint-disable max-len */
import { FormControl, Validators } from '@angular/forms';

export class HolidayModel {
  public id: FormControl;
  public fecha: FormControl;
  public idSede: FormControl;
  public estado: FormControl;

  public constructor() {
    this.id = new FormControl();
    this.fecha = new FormControl(null, Validators.required);
    this.idSede = new FormControl(null, Validators.required);
    this.estado = new FormControl(false);
  }
}
