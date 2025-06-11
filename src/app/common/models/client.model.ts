/* eslint-disable no-useless-escape */
/* eslint-disable max-len */
import { FormControl, Validators } from '@angular/forms';

export class ClientModel {
  public idCliente: FormControl;
  public apellidoMaterno: FormControl;
  public apellidoPaterno: FormControl;
  public estado: FormControl;
  public fechaCreacion: FormControl;
  public nombre: FormControl;
  public numeroIdentificacion: FormControl;
  public razonSocial: FormControl;
  public telefono: FormControl;
  public tipoCliente: FormControl;
  public correo: FormControl;
  public distancia: FormControl;
  public esContraparte: FormControl;
  public esRepresentante: FormControl;
  public situacionSunat: FormControl;
  public direccion: FormControl;
  public contacto: FormControl;

  public constructor() {
    this.idCliente = new FormControl();
    this.apellidoMaterno = new FormControl();
    this.apellidoPaterno = new FormControl();
    this.estado = new FormControl(false);
    this.fechaCreacion = new FormControl();
    this.nombre = new FormControl();
    this.numeroIdentificacion = new FormControl('', Validators.required);
    this.razonSocial = new FormControl();
    this.telefono = new FormControl();
    this.tipoCliente = new FormControl(Validators.required);
    this.correo = new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      ),
    ]);
    this.distancia = new FormControl();
    this.esContraparte = new FormControl(false);
    this.esRepresentante = new FormControl(false);
    this.situacionSunat = new FormControl();

    //campo solicitado por wilder
    this.direccion = new FormControl('');
    this.contacto = new FormControl('');
  }
}
