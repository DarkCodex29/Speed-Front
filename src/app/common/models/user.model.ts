/* eslint-disable no-useless-escape */
/* eslint-disable max-len */
import { FormControl, Validators } from '@angular/forms';

export class UserModel {
  public id: FormControl;
  public usuario: FormControl;
  public clave: FormControl;
  public nombres: FormControl;
  public apellidos: FormControl;
  public idArea: FormControl;
  public jefe: FormControl;
  public idJefe: FormControl;
  public correo: FormControl;
  public estado: FormControl;
  public requiereAprobacion: FormControl;

  public constructor() {
    this.id = new FormControl();
    this.usuario = new FormControl(null, Validators.required);
    this.clave = new FormControl();
    this.nombres = new FormControl(null, Validators.required);
    this.apellidos = new FormControl(null, Validators.required);
    this.idArea = new FormControl(null, Validators.required);
    this.jefe = new FormControl();
    this.idJefe = new FormControl();
    this.correo = new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      ),
    ]);
    this.estado = new FormControl(true);
    this.requiereAprobacion = new FormControl(false);
  }
}
