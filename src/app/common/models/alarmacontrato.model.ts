import { FormControl, Validators } from '@angular/forms';

export class AlarmaContratoModel {
  public abogadoResponsableIdAC: FormControl;
  public idContraparte: FormControl;
  public idCompania: FormControl;
  public idArea: FormControl;
  public numeroContrato: FormControl;
  public fecInicio: FormControl;
  public fecFin: FormControl;

  public constructor() {
    this.abogadoResponsableIdAC = new FormControl(null);
    this.idContraparte = new FormControl();
    this.idCompania = new FormControl(0);
    this.idArea = new FormControl(0);

    this.numeroContrato = new FormControl('');
    this.fecInicio = new FormControl(null, Validators.required);
    this.fecFin = new FormControl(null, Validators.required);
  }
}
