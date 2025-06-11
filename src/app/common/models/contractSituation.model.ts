import { FormControl } from '@angular/forms';

export class ContractSituationModel {
  public pais: FormControl;
  public Estado: FormControl;
  public compania: FormControl;
  public area: FormControl;
  public tipoUbicacion: FormControl;
  public ubicacion: FormControl;

  public constructor() {
    this.pais = new FormControl(0);
    this.Estado = new FormControl('');
    this.compania = new FormControl(0);
    this.area = new FormControl(0);
    this.tipoUbicacion = new FormControl(0);
    this.ubicacion = new FormControl(0);
  }
}
