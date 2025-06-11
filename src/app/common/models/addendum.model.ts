import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

export class AddendumModel {
  //Contraparte
  public idContraparte: FormControl;
  public domicilioContraparte: FormControl;
  public nombreContraparte: FormControl;
  public telefonoContraparte: FormControl;
  public situacionSunatContraparte: FormControl;
  public emailContraparte: FormControl;
  public representantesLegales: FormArray<FormGroup>;
  public nameCounterPart: FormControl;
  public numeroIdentificacion: FormControl;
  //Elaboración de Documento
  public tipoDocumento: FormControl;
  public idContrato: FormControl;
  public idCompania: FormControl;
  public idArea: FormControl;

  //Ubicacion
  public idOperacion: FormControl;
  public idOficina: FormControl;
  public idProyecto: FormControl;
  public exploracion: FormControl;
  public ubicaciones: FormArray<FormGroup>;

  public fechaInicio: FormControl;
  public fechaFin: FormControl;
  public aplicaFechaFin: FormControl;
  public esIndefinido: FormControl;
  public propositoObservaciones: FormControl;

  public constructor() {
    //Contraparte
    this.idContraparte = new FormControl();
    this.domicilioContraparte = new FormControl();
    this.situacionSunatContraparte = new FormControl(null);
    this.nombreContraparte = new FormControl();
    this.telefonoContraparte = new FormControl();
    this.emailContraparte = new FormControl();
    this.representantesLegales = new FormArray<FormGroup>([]);

    //Elaboración de Documento
    this.tipoDocumento = new FormControl('');
    this.idContrato = new FormControl(null, Validators.required);
    this.idCompania = new FormControl();
    this.idArea = new FormControl();

    //Ubicacion
    this.idOperacion = new FormControl('');
    this.idOficina = new FormControl('');
    this.idProyecto = new FormControl('');
    this.exploracion = new FormControl('');
    this.ubicaciones = new FormArray<FormGroup>([]);

    this.fechaInicio = new FormControl(null, Validators.required);
    this.fechaFin = new FormControl();
    this.aplicaFechaFin = new FormControl(false);
    this.esIndefinido = new FormControl();
    this.propositoObservaciones = new FormControl(null, Validators.required);

    //CounterpartName
    this.nameCounterPart = new FormControl('');
    this.numeroIdentificacion = new FormControl('');
  }
}
