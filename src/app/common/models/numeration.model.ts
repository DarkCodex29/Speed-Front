/* eslint-disable no-useless-escape */
/* eslint-disable max-len */
import { FormControl, Validators } from '@angular/forms';

export class NumerationModel {
  public id: FormControl;
  public idArea: FormControl;
  public idTipoDocumento: FormControl;
  public longitud: FormControl;
  public postFormato: FormControl;
  public preFormato: FormControl;
  public tipoNumeracion: FormControl;
  public numeroActual: FormControl;

  public constructor() {
    this.id = new FormControl();
    this.idArea = new FormControl(null, Validators.required);
    this.idTipoDocumento = new FormControl(null, Validators.required);
    this.longitud = new FormControl('', Validators.required);
    this.postFormato = new FormControl();
    this.preFormato = new FormControl();
    this.tipoNumeracion = new FormControl();
    this.numeroActual = new FormControl(null, Validators.required);
  }
}
