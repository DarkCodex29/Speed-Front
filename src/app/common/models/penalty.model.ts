import { FormArray, FormControl, FormGroup } from '@angular/forms';

export class ReiterationModel {
  public index: FormControl;
  public descripcion: FormControl;
  public valor: FormControl;
  public moneda: FormControl;

  public constructor() {
    this.index = new FormControl();
    this.descripcion = new FormControl();
    this.valor = new FormControl();
    this.moneda = new FormControl();
  }
}

export class PenaltyModel {
  public aplica: FormControl;
  public aplicaValorDefecto: FormControl;
  public descripcion: FormControl;
  public idPenalidad: FormControl;
  public numeroReiterancia: FormControl;
  public reiterancias: FormArray<FormGroup>;
  public tipoValor: FormControl;
  public valor: FormControl;

  public constructor() {
    this.aplica = new FormControl();
    this.aplicaValorDefecto = new FormControl();
    this.descripcion = new FormControl();
    this.idPenalidad = new FormControl();
    this.numeroReiterancia = new FormControl();
    this.reiterancias = new FormArray<FormGroup>([]);
    this.tipoValor = new FormControl();
    this.valor = new FormControl();
  }
}
