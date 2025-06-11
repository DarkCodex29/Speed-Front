import { FormArray, FormControl, FormGroup } from '@angular/forms';

export class CounterpartModel {
  public idContraparte: FormControl;
  public domicilioContraparte: FormControl;
  public nombreContraparte: FormControl;
  public telefonoContraparte: FormControl;
  public emailContraparte: FormControl;
  public representantesLegales: FormArray<FormGroup>;

  public constructor() {
    this.idContraparte = new FormControl();
    this.domicilioContraparte = new FormControl();
    this.nombreContraparte = new FormControl();
    this.telefonoContraparte = new FormControl();
    this.emailContraparte = new FormControl();
    this.representantesLegales = new FormArray<FormGroup>([]);
  }
}
