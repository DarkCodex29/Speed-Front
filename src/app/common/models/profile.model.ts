/* eslint-disable no-useless-escape */
/* eslint-disable max-len */
import { FormControl, Validators } from '@angular/forms';

export class ProfileModel {

  public id: FormControl;
  public nombre: FormControl;
  public descripcion: FormControl;
  public codigo: FormControl;
  public estado: FormControl;

  public constructor() {
    this.id = new FormControl();
    this.nombre = new FormControl(null, Validators.required);
    this.descripcion = new FormControl();
    this.codigo = new FormControl('', Validators.required);
    this.estado = new FormControl(true);
  }
}
