import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContractModel } from './contract.model';
import { AddendumModel } from './addendum.model';
import { ObjectValidator } from '@speed/common/validators';

export class LegalDocumentModel {
  //Expediente
  public idExpediente: FormControl;
  public esAvance: FormControl;
  public esContrato: FormControl;
  public esAdenda: FormControl;
  public esAdendaAutomatica: FormControl;

  //Documento legal
  public idDocumentoLegal: FormControl;

  //Datos generales
  public aplicaPenalidad: FormControl;
  public abogadoResponsable: FormControl;

  //Tipo proceso
  public contrato: FormGroup;
  public adenda: FormGroup;

  public constructor() {
    this.idExpediente = new FormControl();
    this.esAvance = new FormControl(false);
    this.esContrato = new FormControl(false);
    this.esAdenda = new FormControl(false);
    this.esAdendaAutomatica = new FormControl(false);

    this.idDocumentoLegal = new FormControl();

    this.aplicaPenalidad = new FormControl(false);
    this.abogadoResponsable = new FormControl(null, [Validators.required, ObjectValidator.validarObjeto()]);

    const contratoForm = new ContractModel();
    this.contrato = new FormGroup({ ...contratoForm });

    const adendaForm = new AddendumModel();
    this.adenda = new FormGroup({ ...adendaForm });
  }
}
