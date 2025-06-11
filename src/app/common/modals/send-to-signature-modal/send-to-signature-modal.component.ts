import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DialogConfig, DialogRef } from '@speed/common/dialog';
import { CustomReactiveFormDirective } from '@speed/common/directives';
import { Utils } from '@speed/common/helpers';
import { RegisterRequestService } from '@speed/final-user/common/services';
import { Subject, takeUntil } from 'rxjs';

@Component({
  standalone: true,
  selector: 'ui-send-to-signature-modal',
  templateUrl: './send-to-signature-modal.component.html',
  styleUrls: ['./send-to-signature-modal.component.scss'],
  imports: [NgIf, NgFor, ReactiveFormsModule, CustomReactiveFormDirective],
  providers: [RegisterRequestService],
})
export class SendToSignatureModalComponent {
  public data: any;
  public requestForm;
  public nombre: string;
  private unsubscribe: Subject<void>;

  public constructor(
    private service: RegisterRequestService,
    private dialogRef: DialogRef<unknown>,
    private dialogConfig: DialogConfig,
    private fb: FormBuilder,
  ) {
    this.data = this.dialogConfig.data || {};
    this.unsubscribe = new Subject();
    this.requestForm = this.fb.group({
      idExpediente: [],
    });
    this.requestForm.get('idExpediente')?.setValue(this.data.idExpediente);
    this.nombre = this.data.nombre;
  }

  public sendRequest() {
    Utils.validateAllFields(this.requestForm);
    if (this.requestForm.valid) {
      const params = this.requestForm.value;
      this.service
        .sendToSignture(params)
        .pipe(takeUntil(this.unsubscribe))
        .subscribe({
          next: (response) => {
            const params = { success: true, message: response.message };
            this.dialogRef.close(params);
          },
          error: (e) => {
            console.error(e.error.message);
            const params = { success: false, message: e.error.message };
            this.dialogRef.close(params);
          },
        });
    }
  }

  public close() {
    this.dialogRef.close();
  }
}
