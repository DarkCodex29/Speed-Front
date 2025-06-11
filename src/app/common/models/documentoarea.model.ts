import { FormControl, Validators } from '@angular/forms';

export class DocumentoAreaModel {
  public idAreaCreacion: FormControl;
  public idAreaActual: FormControl;
  public estado: FormControl;
  public idTipoDocumento: FormControl;
  public numeroExpediente: FormControl;
  public fechaInicio: FormControl;
  public fechaFin: FormControl;

  public constructor() {
    this.idAreaCreacion = new FormControl(0);
    this.idAreaActual = new FormControl(0);
    this.estado = new FormControl(0);
    this.idTipoDocumento = new FormControl(0);
    this.numeroExpediente = new FormControl('');
    this.fechaInicio = new FormControl(null, Validators.required);
    this.fechaFin = new FormControl(null, Validators.required);
  }
}
