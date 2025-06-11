/* eslint-disable no-useless-escape */
/* eslint-disable max-len */
import { FormControl, Validators } from '@angular/forms';

export class CampusModel {
  public id: FormControl;
  public nombre: FormControl;
  public idDepartamento: FormControl;
  public idProvincia: FormControl;
  public idUbigeo: FormControl;
  public estado: FormControl;

  public constructor() {
    this.id = new FormControl();
    this.nombre = new FormControl('', Validators.required);
    this.idDepartamento = new FormControl(null, Validators.required);
    this.idProvincia = new FormControl(null, Validators.required);
    this.idUbigeo = new FormControl(null, Validators.required);
    this.estado = new FormControl(true);
  }
}
