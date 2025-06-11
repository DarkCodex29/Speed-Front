import { FormControl, Validators } from '@angular/forms';

export class NewRequestedModel {
  public idExpediente: FormControl;
  public titulo: FormControl;
  public idProceso: FormControl;
  public aplicaPenalidad: FormControl;

  public constructor() {
    this.idExpediente = new FormControl();
    this.titulo = new FormControl();
    this.idProceso = new FormControl('', Validators.required);
    this.aplicaPenalidad = new FormControl(false);
  }
}
