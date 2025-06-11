/* eslint-disable no-useless-escape */
/* eslint-disable max-len */
import { FormControl, Validators } from '@angular/forms';

export class AreaModel {

  public id: FormControl;
  public nombre: FormControl;
  public idSede: FormControl;
  public idDependencia: FormControl;

  public constructor() {
    this.id = new FormControl();
    this.nombre = new FormControl(null, Validators.required);
    this.idSede = new FormControl();
    this.idDependencia = new FormControl();
  }
}
