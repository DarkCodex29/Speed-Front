/* eslint-disable no-useless-escape */
/* eslint-disable max-len */
import { FormControl, Validators } from '@angular/forms';

export class DocumentTypeModel {
  public id: FormControl;
  public nombre: FormControl;
  public descripcion: FormControl;
  public firmable: FormControl;
  public estado: FormControl;

  public constructor() {
    this.id = new FormControl();
    this.nombre = new FormControl(null, Validators.required);
    this.descripcion = new FormControl(null, Validators.required);
    this.firmable = new FormControl(false);
    this.estado = new FormControl(true);
  }
}
