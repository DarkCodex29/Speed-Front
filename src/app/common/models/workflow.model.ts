import { FormControl, Validators } from '@angular/forms';

export class WorkflowModel {
  public id: FormControl;
  public nombre: FormControl;
  public descripcion: FormControl;
  public idProceso: FormControl;
  public version: FormControl;

  public constructor() {
    this.id = new FormControl();
    this.nombre = new FormControl(null, Validators.required);
    this.descripcion = new FormControl();
    this.idProceso = new FormControl(null, Validators.required);
    this.version = new FormControl(null, Validators.required);
  }
}
