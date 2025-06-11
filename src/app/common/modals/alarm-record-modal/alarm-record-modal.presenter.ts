import { Injectable } from '@angular/core';
import { IAlarmModel } from '@speed/common/interfaces/forms';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormPresenter, Utils } from '@speed/common/helpers';
import { IHcAlarma } from '@speed/common/interfaces/output';

@Injectable()
export class AlarmRecordModalPresenter extends FormPresenter<IAlarmModel> {
  public constructor(private fb: FormBuilder) {
    super();
    this.form = this.fb.group({
      id: [null],
      userFilter: [null],
      idDocumentoLegal: new FormControl<number | null>(null, Validators.required),
      nombreGrupo: [null],
      idVisadores: [null, Validators.required],
      esGrupo: [null, Validators.required],
      fechaAlarma: [null, Validators.required],
      anual: [false],
      activacion: new FormControl<number | null>(null, Validators.required),
      intervalo: new FormControl<number | null>(null, Validators.required),
      titulo: new FormControl<string | null>(null, Validators.required),
      mensaje: new FormControl<string | null>(null, Validators.required),
    });
  }

  public setValues(values: IAlarmModel) {
    this.patchValue({
      id: values.id,
      fechaAlarma: values.fechaAlarma,
      anual: values.anual ?? false,
      activacion: values.activacion,
      intervalo: values.intervalo,
      titulo: values.titulo,
      mensaje: values.mensaje,
    });
  }
}
