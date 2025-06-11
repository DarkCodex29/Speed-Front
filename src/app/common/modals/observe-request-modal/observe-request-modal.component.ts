import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogConfig, DialogRef } from '@speed/common/dialog';
import { CustomReactiveFormDirective } from '@speed/common/directives';
import { RegisterRequestService } from '@speed/final-user/common/services';
import { Subject, takeUntil } from 'rxjs';
import { IDestinatario } from '@speed/common/interfaces/output';
import { Utils } from '@speed/common/helpers';

@Component({
  standalone: true,
  selector: 'ui-observe-request-modal',
  templateUrl: './observe-request-modal.component.html',
  styleUrls: ['./observe-request-modal.component.scss'],
  imports: [NgIf, NgFor, ReactiveFormsModule, CustomReactiveFormDirective],
  providers: [RegisterRequestService],
})
export class ObserveRequestModalComponent implements OnInit {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public data: any;
  public destinatario!: IDestinatario;
  public requestForm;
  public loading = true;
  private unsubscribe: Subject<void>;

  public constructor(
    private dialogRef: DialogRef<unknown>,
    private service: RegisterRequestService,
    private dialogConfig: DialogConfig,
    private fb: FormBuilder,
  ) {
    this.unsubscribe = new Subject();
    this.data = this.dialogConfig.data || {};
    this.requestForm = this.fb.group({
      idExpediente: [],
      observacion: ['', [Validators.required, Validators.minLength(1)]],
      documentacionIncompleta: [false],
      solicitudDuplicada: [false],
      otros: [false],
    });
  }
  public async ngOnInit() {
    this.destinatario = await this.service.getDestinatarioExpediente({ idExpediente: this.data });
    this.requestForm.get('idExpediente')?.setValue(this.data);
    this.loading = false;
  }
  public sendRequest() {
    Utils.validateAllFields(this.requestForm);
    if (this.requestForm.valid) {
      const params = this.requestForm.value;
      if (params.otros == true) {
        params.observacion = 'Otros <br>'.concat(String(params.observacion));
      }
      if (params.solicitudDuplicada == true) {
        params.observacion = 'Solicitud Duplicada <br>'.concat(String(params.observacion));
      }
      if (params.documentacionIncompleta == true) {
        params.observacion = 'Documentación Incompleta <br>'.concat(String(params.observacion));
      }
      this.service
        .sendObservartion(params)
        .pipe(takeUntil(this.unsubscribe))
        .subscribe(() => {
          const params = { modified: true };
          this.dialogRef.close(params);
        });
    }
  }
  public close() {
    this.dialogRef.close({ modified: false });
  }
}
