import { FormControl } from '@angular/forms';

export class ReportServiceModel {
  public num: FormControl;
  public idP: FormControl;
  public idC: FormControl;
  public idA: FormControl;
  public tUb: FormControl;
  public idU: FormControl;
  public idCo: FormControl;
  public fVI: FormControl;
  public fVF: FormControl;
  public mD: FormControl;
  public mH: FormControl;
  public idTC: FormControl;
  public est: FormControl;

  public constructor() {
    this.num = new FormControl('');
    this.idP = new FormControl(0);
    this.idC = new FormControl(0);
    this.idA = new FormControl(0);
    this.tUb = new FormControl(0);
    this.idU = new FormControl(0);
    this.idCo = new FormControl();
    this.fVI = new FormControl('');
    this.fVF = new FormControl('');
    this.mD = new FormControl(0);
    this.mH = new FormControl(0);
    this.idTC = new FormControl(0);
    this.est = new FormControl(0);
  }
}
