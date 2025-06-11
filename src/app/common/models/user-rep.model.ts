/* eslint-disable no-useless-escape */
/* eslint-disable max-len */
import { FormControl, Validators } from '@angular/forms';

export class UserRepModel {

  public id: FormControl;
  public idUsuario: FormControl;
  public usuario: FormControl;
  public correo: FormControl;
  public numeroDocumento: FormControl;
  public estado: FormControl;

  public constructor() {
    this.id = new FormControl();
    this.idUsuario = new FormControl(null, Validators.required);
    this.usuario = new FormControl();
    this.correo = new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      ),
    ]);
    this.numeroDocumento = new FormControl(null, Validators.required);
    this.estado = new FormControl(true);
  }
}
