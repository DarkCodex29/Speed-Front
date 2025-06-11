import { FormControl } from '@angular/forms';

export class SearchDocumentModel {
  public numero: FormControl;
  public sumilla: FormControl;
  public fechaFirmaInicio: FormControl;
  public fechaFirmaFin: FormControl;
  public fechaVencimientoInicio: FormControl;
  public fechaVencimientoFin: FormControl;
  public idPais: FormControl;
  public idCompania: FormControl;
  public idArea: FormControl;
  public tipoUbicacion: FormControl;
  public idUbicacion: FormControl;
  public textoArchivo: FormControl;
  public idSolicitante: FormControl;
  public idResponsable: FormControl;
  public idContraparte: FormControl;
  public idRepresentante: FormControl;
  public montoDesde: FormControl;
  public montoHasta: FormControl;
  public idTipoContrato: FormControl;
  public estado: FormControl;
  public tipoSolicitud: FormControl;

  public constructor() {
    this.numero = new FormControl('');
    this.sumilla = new FormControl('');
    this.fechaFirmaInicio = new FormControl(null);
    this.fechaFirmaFin = new FormControl(null);
    this.fechaVencimientoInicio = new FormControl(null);
    this.fechaVencimientoFin = new FormControl(null);
    this.idCompania = new FormControl(0);
    this.idPais = new FormControl(0);
    this.idArea = new FormControl(0);
    this.tipoUbicacion = new FormControl(0);
    this.idUbicacion = new FormControl(0);
    this.textoArchivo = new FormControl('');
    this.idSolicitante = new FormControl();
    this.idResponsable = new FormControl();
    this.idContraparte = new FormControl();
    this.idRepresentante = new FormControl();
    this.montoDesde = new FormControl();
    this.montoHasta = new FormControl();
    this.idTipoContrato = new FormControl(0);
    this.estado = new FormControl();
    this.tipoSolicitud = new FormControl(0);
  }
}
