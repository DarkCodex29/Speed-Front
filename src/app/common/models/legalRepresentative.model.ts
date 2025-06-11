import { FormControl } from '@angular/forms';

export class LegalRepresentativeModel {
  public idRepresentanteLegal: FormControl;
  public tipoCliente: FormControl;
  public tipoDocumento: FormControl;
  public numeroIdentificacion: FormControl;
  public nombre: FormControl;
  public apellidoPaterno: FormControl;
  public apellidoMaterno: FormControl;
  public nombreCompleto: FormControl;
  public correo: FormControl;
  public esRepresentante: FormControl;
  public esContraparte: FormControl;
  public eliminado: FormControl;

  public constructor() {
    this.idRepresentanteLegal = new FormControl();
    this.tipoCliente = new FormControl();
    this.tipoDocumento = new FormControl();
    this.numeroIdentificacion = new FormControl();
    this.nombre = new FormControl();
    this.apellidoPaterno = new FormControl();
    this.apellidoMaterno = new FormControl();
    this.nombreCompleto = new FormControl();
    this.correo = new FormControl();
    this.esRepresentante = new FormControl();
    this.esContraparte = new FormControl();
    this.eliminado = new FormControl();
  }
}
