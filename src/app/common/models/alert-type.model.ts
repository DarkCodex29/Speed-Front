/* eslint-disable no-useless-escape */
/* eslint-disable max-len */
import { FormControl, Validators } from '@angular/forms';

export class AlertTypeModel {
  public id: FormControl;
  public nombre: FormControl;
  public imagen: FormControl;
  public porcentajeIntervalo: FormControl;
  public defecto: FormControl;

  public constructor() {
    this.id = new FormControl();
    this.nombre = new FormControl(null, Validators.required);
    this.imagen = new FormControl(null, Validators.required);
    this.porcentajeIntervalo = new FormControl();
    this.nombre = new FormControl();
    this.defecto = new FormControl(false);
  }
}
