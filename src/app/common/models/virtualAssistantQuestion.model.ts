import { FormControl, Validators } from '@angular/forms';

export class QuestionVirtualAssistantModel {
  public idAplicacion: FormControl;
  public codigo: FormControl;
  public codigoArea: FormControl;
  public codigoTema: FormControl;
  public codigoPregunta: FormControl;
  public descripcionPregunta: FormControl;
  public codigoRespuesta: FormControl;
  public descripcionRespuesta: FormControl;
  public vigente: FormControl;

  public constructor() {
    this.idAplicacion = new FormControl('');
    this.codigo = new FormControl(0);
    this.codigoArea = new FormControl(0, Validators.required);
    this.codigoTema = new FormControl(0, Validators.required);
    this.codigoPregunta = new FormControl('');
    this.descripcionPregunta = new FormControl('');
    this.codigoRespuesta = new FormControl('');
    this.descripcionRespuesta = new FormControl('');
    this.vigente = new FormControl('');
  }
}
