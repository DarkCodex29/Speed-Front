import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ArrayValidators } from '../validators';
import { ObjectValidator } from '@speed/common/validators';

export class ContractModel {
  //Contraparte
  public idContraparte: FormControl;
  public situacionSunatContraparte: FormControl;
  public domicilioContraparte: FormControl;
  public nombreContraparte: FormControl;
  public telefonoContraparte: FormControl;
  public emailContraparte: FormControl;
  public representantesLegales: FormArray<FormGroup>;
  public numeroIdentificacion: FormControl;

  //Elaboración de Documento
  public idPais: FormControl;
  public idCompania: FormControl;
  public idArea: FormControl;

  //Ubicacion
  public idOperacion: FormControl;
  public idOficina: FormControl;
  public idProyecto: FormControl;
  public exploracion: FormControl;
  public ubicaciones: FormArray<FormGroup>;

  public propositoObservaciones: FormControl;
  public fechaInicio: FormControl;
  public fechaFin: FormControl;
  public idMoneda: FormControl;

  //Modalidad Pago
  public modalidadPago: FormControl;
  public esPrecioFijo: FormControl;
  public esPrecioUnitario: FormControl;
  public esIndefinido: FormControl;
  public aplicaModalidadPago: FormControl;
  public aplicaAdelanto: FormControl;
  public aplicaRenovacionAutomatica: FormControl;
  public aplicaPeriodicidad: FormControl;
  public aplicaArrendamiento: FormControl;
  public montoFijoTotalEstimado: FormControl;
  public montoAdelanto: FormControl;
  public periodicidadPago: FormControl;
  public periodoRenovar: FormControl;

  //Documentos Solicitud
  public propuestaTenica: FormArray<FormGroup>;
  public comunicacionAdjudicacion: FormArray<FormGroup>;
  public otrosSolicitud: FormArray<FormGroup>;

  //Poderes
  public vigenciaPoder: FormArray<FormGroup>;
  public copiaDni: FormArray<FormGroup>;
  public otrosPoderes: FormArray<FormGroup>;

  //Penalidades
  public penalidades: FormArray<FormGroup>;

  public constructor() {
    //Contraparte
    this.idContraparte = new FormControl(null, [Validators.required, ObjectValidator.validarObjeto()]);
    this.situacionSunatContraparte = new FormControl(null);
    this.domicilioContraparte = new FormControl(null);
    this.nombreContraparte = new FormControl(null);
    this.telefonoContraparte = new FormControl(null);
    this.emailContraparte = new FormControl(null);
    this.numeroIdentificacion = new FormControl(null);
    this.representantesLegales = new FormArray<FormGroup>([], ArrayValidators.minLength(1));

    //Elaboración de Documento
    this.idPais = new FormControl(null, Validators.required);
    this.idCompania = new FormControl(null, Validators.required);
    this.idArea = new FormControl(null, Validators.required);

    //Ubicacion
    this.idOperacion = new FormControl('');
    this.idOficina = new FormControl('');
    this.idProyecto = new FormControl('');
    this.exploracion = new FormControl('');
    this.ubicaciones = new FormArray<FormGroup>([], ArrayValidators.minLength(1));

    this.propositoObservaciones = new FormControl(null, Validators.required);
    this.fechaInicio = new FormControl(null, Validators.required);
    this.fechaFin = new FormControl(null, Validators.required);
    this.idMoneda = new FormControl(null, Validators.required);

    //ModalidadPago
    this.modalidadPago = new FormControl(null);
    this.esPrecioFijo = new FormControl(true, Validators.required);
    this.esPrecioUnitario = new FormControl(false, Validators.required);
    this.esIndefinido = new FormControl(false);
    this.aplicaModalidadPago = new FormControl(false);
    this.aplicaAdelanto = new FormControl(false);
    this.aplicaRenovacionAutomatica = new FormControl(false);
    this.aplicaPeriodicidad = new FormControl(false);
    this.aplicaArrendamiento = new FormControl(false);
    this.montoFijoTotalEstimado = new FormControl(0);
    this.montoAdelanto = new FormControl(0);
    this.periodicidadPago = new FormControl('');
    this.periodoRenovar = new FormControl(0);

    //Documentos Solicitud
    this.propuestaTenica = new FormArray<FormGroup>([]);
    this.comunicacionAdjudicacion = new FormArray<FormGroup>([]);
    this.otrosSolicitud = new FormArray<FormGroup>([]);

    //Poderes
    this.vigenciaPoder = new FormArray<FormGroup>([]);
    this.copiaDni = new FormArray<FormGroup>([]);
    this.otrosPoderes = new FormArray<FormGroup>([]);

    //Penalidades
    this.penalidades = new FormArray<FormGroup>([]);
  }
}
