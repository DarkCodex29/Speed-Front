import { FormControl } from '@angular/forms';

export class LegalAreaModel {
  public tipoContrato: FormControl;
  public sumilla: FormControl;
  public solicitante: FormControl;
  public fechaBorrador: FormControl;

  public constructor() {
    this.tipoContrato = new FormControl(null);
    this.sumilla = new FormControl(null);
    this.solicitante = new FormControl(null);
    this.fechaBorrador = new FormControl(null);
  }
}
