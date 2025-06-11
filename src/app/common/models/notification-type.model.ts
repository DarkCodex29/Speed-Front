/* eslint-disable no-useless-escape */
/* eslint-disable max-len */
import { FormControl, Validators } from '@angular/forms';

export class NotificationTypeModel {
  public id: FormControl;
  public nombre: FormControl;
  public descripcion: FormControl;
  public estado: FormControl;
  public codigo: FormControl;

  public constructor() {
    this.id = new FormControl();
    this.nombre = new FormControl(null, Validators.required);
    this.codigo = new FormControl(null, Validators.required);
    this.descripcion = new FormControl();
    this.estado = new FormControl(true);
  }
}
