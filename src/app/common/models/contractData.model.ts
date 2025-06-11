import { FormArray, FormControl, FormGroup } from '@angular/forms';

export class ContractDataModel {
  // Area Legal
  public abogadoResponsable: FormControl;
  public tipoContrato: FormControl;
  public sumilla: FormControl;
  public solicitante: FormControl;
  public fechaPrimerBorrador: FormControl;

  //Contraparte
  public idContraparte: FormControl;
  // public nombreContraparte: FormControl;
  public situacionContraparte: FormControl;
  public domicilioContraparte: FormControl;
  public nombreContactoContraparte: FormControl;
  public telefonoContactoContraparte: FormControl;
  public emailContactoContraparte: FormControl;
  public representanteLegalIpt: FormControl;
  public representantesLegales: FormArray<FormGroup>;

  // Elaboracion de documento
  public ubicaciones: FormArray<FormGroup>;
  public pais: FormControl;
  public compania: FormControl;
  public area: FormControl;

  public propositoObservaciones: FormControl;
  public fechaInicio: FormControl;
  public fechaFin: FormControl;
  public esIndefinido: FormControl;
  public idMoneda: FormControl;

  public monto: FormControl;
  public montoAdelantado: FormControl;
  public periodicidad: FormControl;
  public periodoRenovar: FormControl;

  public modalidadPago: FormControl;
  public aplicaModalidadPago: FormControl;
  public aplicaAdelanto: FormControl;
  public aplicaRenovacionAutomatica: FormControl;
  public aplicaPeriodicidad: FormControl;
  public aplicaArrendamiento: FormControl;

  public constructor() {
    this.abogadoResponsable = new FormControl();
    this.tipoContrato = new FormControl(null);
    this.sumilla = new FormControl();
    this.solicitante = new FormControl();
    this.fechaPrimerBorrador = new FormControl();

    // Contraparte
    this.idContraparte = new FormControl(null);
    // this.nombreContraparte = new FormControl(null);
    this.situacionContraparte = new FormControl(null);
    this.domicilioContraparte = new FormControl(null);
    this.nombreContactoContraparte = new FormControl(null);
    this.telefonoContactoContraparte = new FormControl(null);
    this.emailContactoContraparte = new FormControl(null);
    this.representanteLegalIpt = new FormControl(null);
    this.representantesLegales = new FormArray<FormGroup>([]);

    // Elaboracion de documento
    this.ubicaciones = new FormArray<FormGroup>([]);
    this.pais = new FormControl(0);
    this.compania = new FormControl(0);
    this.area = new FormControl(0);
    this.propositoObservaciones = new FormControl();
    this.fechaInicio = new FormControl(null);
    this.fechaFin = new FormControl(null);
    this.esIndefinido = new FormControl(false);
    this.idMoneda = new FormControl(null);

    this.monto = new FormControl(0);
    this.montoAdelantado = new FormControl(0);
    this.periodicidad = new FormControl(0);
    this.periodoRenovar = new FormControl(0);

    this.modalidadPago = new FormControl('');
    this.aplicaModalidadPago = new FormControl(true);
    this.aplicaAdelanto = new FormControl(true);
    this.aplicaRenovacionAutomatica = new FormControl(true);
    this.aplicaPeriodicidad = new FormControl(true);
    this.aplicaArrendamiento = new FormControl(true);
  }
}
