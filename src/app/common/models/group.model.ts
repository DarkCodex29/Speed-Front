/* eslint-disable no-useless-escape */
/* eslint-disable max-len */
import { FormControl, Validators } from '@angular/forms';

export class GroupModel {

  public id: FormControl;
  public nombre: FormControl;
  public idTipoGrupo: FormControl;
  public estado: FormControl;
  public usuario: FormControl;
  public idUsuario: FormControl;
  public usuarios: FormControl;

  public constructor() {
    this.id = new FormControl();
    this.nombre = new FormControl(null, Validators.required);
    this.idTipoGrupo = new FormControl(null, Validators.required);
    this.estado = new FormControl(true);
    this.usuario = new FormControl();
    this.idUsuario = new FormControl();
    this.usuarios = new FormControl();
  }
}
