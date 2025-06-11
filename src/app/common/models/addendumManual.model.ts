import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddendumModel } from './addendum.model';

export class AddendumManualModel {
  //Expediente
  public idExpediente: FormControl;
  public esAdenda: FormControl;
  public esContrato: FormControl;
  public esAdendaAutomatica: FormControl;

  //Documento legal
  public idDocumentoLegal: FormControl;

  //Datos generales
  public solicitante: FormControl;
  public sumilla: FormControl;
  public abogadoResponsable: FormControl;

  //Tipo proceso
  public adenda: FormGroup;

  public constructor() {
    this.idExpediente = new FormControl();
    this.esAdenda = new FormControl(true);
    this.esContrato = new FormControl(false);
    this.esAdendaAutomatica = new FormControl(false);

    this.idDocumentoLegal = new FormControl();

    this.solicitante = new FormControl(null, Validators.required);
    this.sumilla = new FormControl(null, Validators.required);
    this.abogadoResponsable = new FormControl(null, Validators.required);

    const addendum = new AddendumModel();
    this.adenda = new FormGroup({ ...addendum });
  }
}
