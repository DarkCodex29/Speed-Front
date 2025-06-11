/* eslint-disable no-useless-escape */
/* eslint-disable max-len */
import { FormControl, Validators } from '@angular/forms';

export class ReplacementModel {
  public id: FormControl;
  public usuarioReemplazado: FormControl;
  public idReemplazado: FormControl;
  public usuarioReemplazante: FormControl;
  public idReemplazante: FormControl;
  public fechaDesde: FormControl;
  public fechaHasta: FormControl;

  public constructor() {
    this.id = new FormControl();
    this.usuarioReemplazado = new FormControl(null, Validators.required);
    this.idReemplazado = new FormControl();
    this.usuarioReemplazante = new FormControl(null, Validators.required);
    this.idReemplazante = new FormControl();
    this.fechaDesde = new FormControl('', Validators.required);
    this.fechaHasta = new FormControl('', Validators.required);
  }
}
