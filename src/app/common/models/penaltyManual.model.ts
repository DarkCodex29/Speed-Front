/* eslint-disable no-useless-escape */
/* eslint-disable max-len */
import { FormControl, Validators } from '@angular/forms';

export class PenaltyManualModel {
  public id: FormControl;
  public penalidad: FormControl;
  public idReiterancia: FormControl;
  public aplicaPenalidad: FormControl;
  public estado: FormControl;
  public etiqueta: FormControl;
  public aplicaValorDefecto: FormControl;
  public numeroReiterancia: FormControl;
  public idTipoValor: FormControl;
  public valor: FormControl;

  public constructor() {
    this.id = new FormControl();
    this.penalidad = new FormControl(null, Validators.required);
    this.idReiterancia = new FormControl();
    this.aplicaPenalidad = new FormControl(false);
    this.estado = new FormControl(true);
    this.etiqueta = new FormControl(null, Validators.required);
    this.aplicaValorDefecto = new FormControl(false);
    this.numeroReiterancia = new FormControl();
    this.idTipoValor = new FormControl();
    this.valor = new FormControl();
  }
}
