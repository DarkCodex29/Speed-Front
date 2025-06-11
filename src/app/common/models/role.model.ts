/* eslint-disable no-useless-escape */
/* eslint-disable max-len */
import { FormControl, Validators } from '@angular/forms';

export class RoleModel {
  public id: FormControl;
  public nombre: FormControl;
  public codigo: FormControl;
  public descripcion: FormControl;
  public codigoSCA: FormControl;
  public estado: FormControl;

  public constructor() {
    this.id = new FormControl();
    this.nombre = new FormControl(null, Validators.required);
    this.codigo = new FormControl(null, Validators.required);
    this.descripcion = new FormControl();
    this.codigoSCA = new FormControl(null, Validators.required);
    this.estado = new FormControl(true);
  }
}
