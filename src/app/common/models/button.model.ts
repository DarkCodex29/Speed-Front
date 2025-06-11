/* eslint-disable no-useless-escape */
/* eslint-disable max-len */
import { FormControl, Validators } from '@angular/forms';

export class ButtonModel {
  public id: FormControl;
  public nombre: FormControl;
  public descripcion: FormControl;
  public url: FormControl;
  public codigo: FormControl;
  public tipo: FormControl;
  public icono: FormControl;
  public parametro: FormControl;
  public eventoSubmit: FormControl;
  public eventoComplete: FormControl;
  public orden: FormControl;
  public estado: FormControl;
  public bloqueable: FormControl;
  public bloqueableParalelo: FormControl;

  public constructor() {
    this.id = new FormControl();
    this.nombre = new FormControl(null, Validators.required);
    this.descripcion = new FormControl();
    this.url = new FormControl();
    this.codigo = new FormControl();
    this.tipo = new FormControl(null, Validators.required);
    this.icono = new FormControl();
    this.parametro = new FormControl();
    this.eventoSubmit = new FormControl();
    this.eventoComplete = new FormControl();
    this.orden = new FormControl();
    this.estado = new FormControl(false);
    this.bloqueable = new FormControl(false);
    this.bloqueableParalelo = new FormControl(false);
  }
}
