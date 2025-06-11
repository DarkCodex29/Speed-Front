/* eslint-disable no-useless-escape */
/* eslint-disable max-len */
import { FormControl, Validators } from '@angular/forms';

export class TemplateModel {
  public id: FormControl;
  public nombre: FormControl;
  public idTipoContrato: FormControl;
  public estado: FormControl;
  public archivo: FormControl;
  public ruta: FormControl;
  public name: FormControl;

  public constructor() {
    this.id = new FormControl();
    this.nombre = new FormControl(null, Validators.required);
    this.idTipoContrato = new FormControl(null, Validators.required);
    this.estado = new FormControl(true);
    this.archivo = new FormControl();
    this.ruta = new FormControl();
    this.name = new FormControl();
  }
}
