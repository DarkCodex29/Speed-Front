import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContractModel } from './contract.model';

export class ContractManualModel {
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
  public tipoContrato: FormControl;
  public abogadoResponsable: FormControl;

  //Tipo proceso
  public contrato: FormGroup;

  public constructor() {
    this.idExpediente = new FormControl();
    this.esAdenda = new FormControl(false);
    this.esContrato = new FormControl(true);
    this.esAdendaAutomatica = new FormControl(false);
    this.idDocumentoLegal = new FormControl();

    this.solicitante = new FormControl(null, Validators.required);
    this.sumilla = new FormControl(null, Validators.required);
    this.tipoContrato = new FormControl(null, Validators.required);
    this.abogadoResponsable = new FormControl(null, Validators.required);

    const contratoForm = new ContractModel();
    this.contrato = new FormGroup({ ...contratoForm });
  }
}
