import { FormControl } from '@angular/forms';

export class TrackingDocumentModel {
  public numero: FormControl;
  public sumilla: FormControl;
  public idSolicitante: FormControl;
  public idResponsable: FormControl;
  public idContraparte: FormControl;
  public estado: FormControl;

  public constructor() {
    this.numero = new FormControl();
    this.sumilla = new FormControl();
    this.idSolicitante = new FormControl();
    this.idResponsable = new FormControl();
    this.idContraparte = new FormControl();
    this.estado = new FormControl(0);
  }
}
