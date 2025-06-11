/* eslint-disable no-useless-escape */
/* eslint-disable max-len */
import { FormControl, Validators } from '@angular/forms';

export class ProcessModel {
  //Datos del Proceso
  public id: FormControl;
  public nombre: FormControl;
  public idTipoProceso: FormControl;
  public idConfidencialidad: FormControl;
  public descripcion: FormControl;
  public plazo: FormControl;
  public estado: FormControl;
  public conCliente: FormControl;
  //Responsable
  public creadorResponsable: FormControl;
  public idUsuarioResponsable: FormControl;
  public idRolResponsable: FormControl;

  public constructor() {
    this.id = new FormControl();
    this.nombre = new FormControl(null, Validators.required);
    this.idTipoProceso = new FormControl(null, Validators.required);
    this.idConfidencialidad = new FormControl(null, Validators.required);
    this.descripcion = new FormControl(null, Validators.required);
    this.plazo = new FormControl(null, Validators.required);
    this.estado = new FormControl(true);
    this.conCliente = new FormControl(false);
    this.creadorResponsable = new FormControl(false);
    this.idUsuarioResponsable = new FormControl();
    this.idRolResponsable = new FormControl();
  }
}
