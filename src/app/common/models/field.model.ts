/* eslint-disable no-useless-escape */
/* eslint-disable max-len */
import { FormControl, Validators } from '@angular/forms';

export class FieldModel {
  public id: FormControl;
  public contenido: FormControl;
  public descripcion: FormControl;
  public etiqueta: FormControl;
  public nombre: FormControl;
  public idTipoCampo: FormControl;
  public buscable: FormControl;
  public obligatorio: FormControl;

  public constructor() {
    this.id = new FormControl();
    this.contenido = new FormControl(null, Validators.required);
    this.descripcion = new FormControl();
    this.etiqueta = new FormControl('', Validators.required);
    this.nombre = new FormControl('', Validators.required);
    this.idTipoCampo = new FormControl(null, Validators.required);
    this.buscable = new FormControl(false);
    this.obligatorio = new FormControl(false);
  }
}
