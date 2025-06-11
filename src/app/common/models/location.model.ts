import { FormControl } from '@angular/forms';
export class LocationModel {
  public idUbicacion: FormControl;
  public nombre: FormControl;
  public esNuevo: FormControl;
  public eliminado: FormControl;

  public constructor() {
    this.idUbicacion = new FormControl();
    this.nombre = new FormControl();
    this.esNuevo = new FormControl();
    this.eliminado = new FormControl();
  }
}
