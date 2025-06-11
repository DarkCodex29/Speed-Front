import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DialogConfig, DialogRef } from '@speed/common/dialog';
import { CustomReactiveFormDirective } from '@speed/common/directives';
import { Subject, takeUntil } from 'rxjs';
import { IDestinatario } from '@speed/common/interfaces/output';
import { Utils } from '@speed/common/helpers';
import { VisatorService } from '@speed/final-user/common/services/visator.service';

@Component({
  standalone: true,
  selector: 'ui-observe-visa-modal',
  templateUrl: './observe-visa-modal.component.html',
  styleUrls: ['./observe-visa-modal.component.scss'],
  imports: [NgIf, NgFor, ReactiveFormsModule, CustomReactiveFormDirective],
  providers: [VisatorService],
})
export class ObserveVisaModalComponent implements OnInit {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public data: any;
  public destinatario!: IDestinatario;
  public requestForm;
  public loading = true;
  private unsubscribe: Subject<void>;

  public constructor(
    private dialogRef: DialogRef<unknown>,
    private service: VisatorService,
    private dialogConfig: DialogConfig,
    private fb: FormBuilder,
  ) {
    this.unsubscribe = new Subject();
    this.data = this.dialogConfig.data || {};
    this.requestForm = this.fb.group({
      idExpediente: [],
      observacion: ['', []],
      verificarDatos: [false],
      visadoresIncorrectos: [false],
      otros: [false],
    });
  }
  public async ngOnInit() {
    this.destinatario = await this.service.getDestinatario(this.data);
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
      if (params.visadoresIncorrectos == true) {
        params.observacion = 'Visadores Incorrectos <br>'.concat(String(params.observacion));
      }
      if (params.verificarDatos == true) {
        params.observacion = 'Verificar Datos <br>'.concat(String(params.observacion));
      }

      this.service
        .observarVisado(params)
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
