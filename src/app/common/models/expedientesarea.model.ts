import { FormControl, Validators } from '@angular/forms';

export class ExpedienteAreaModel {
  public idUsuario: FormControl;
  public idProceso: FormControl;
  public fechaInicio: FormControl;
  public fechaFin: FormControl;
  public areaDestino: FormControl;
  public estado: FormControl;

  public areaCreadora: FormControl;
  public sedeOrigen: FormControl;
  public sedeDestino: FormControl;
  public idUsuarioFinal: FormControl;
  public fechaUltDerivacion: FormControl;
  public numeroExpediente: FormControl;

  public constructor() {
    this.idUsuario = new FormControl();
    this.idProceso = new FormControl();
    this.fechaInicio = new FormControl(null, Validators.required);
    this.fechaFin = new FormControl(null, Validators.required);
    this.areaDestino = new FormControl();
    this.estado = new FormControl();

    this.areaCreadora = new FormControl();
    this.sedeOrigen = new FormControl();
    this.sedeDestino = new FormControl();
    this.idUsuarioFinal = new FormControl();

    this.fechaUltDerivacion = new FormControl('');
    this.numeroExpediente = new FormControl('');
  }
}
