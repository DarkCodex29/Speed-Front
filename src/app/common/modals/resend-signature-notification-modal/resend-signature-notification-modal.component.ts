import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DialogConfig, DialogRef } from '@speed/common/dialog';
import { CustomReactiveFormDirective } from '@speed/common/directives';
import { Utils } from '@speed/common/helpers';
import { SpinnerOverlayService } from '@speed/common/services';
import { RegisterRequestService } from '@speed/final-user/common/services';
import { Subject, takeUntil } from 'rxjs';

@Component({
  standalone: true,
  selector: 'ui-resend-signature-notification-modal',
  templateUrl: './resend-signature-notification-modal.component.html',
  styleUrls: ['./resend-signature-notification-modal.component.scss'],
  imports: [NgIf, NgFor, ReactiveFormsModule, CustomReactiveFormDirective],
  providers: [RegisterRequestService],
})
export class ResendSignatureNotificationModalComponent {
  public data: any;
  public requestForm;
  private unsubscribe: Subject<void>;

  public constructor(
    private service: RegisterRequestService,
    private dialogRef: DialogRef<unknown>,
    private dialogConfig: DialogConfig,
    private fb: FormBuilder,
    private spinnerService: SpinnerOverlayService,
  ) {
    this.data = this.dialogConfig.data || {};
    this.unsubscribe = new Subject();
    this.requestForm = this.fb.group({
      idExpediente: [],
    });
    this.requestForm.get('idExpediente')?.setValue(this.data?.idExpediente);
  }

  public sendRequest() {
    Utils.validateAllFields(this.requestForm);
    if (this.requestForm.valid) {
      this.spinnerService.show();
      const params = this.requestForm.value;
      this.service
        .resendElectronicSignatureNotification(params)
        .pipe(takeUntil(this.unsubscribe))
        .subscribe({
          next: (response) => {
            this.spinnerService.hide();
            const params = { success: true, message: response.message };
            this.dialogRef.close(params);
          },
          error: (e) => {
            this.spinnerService.hide();
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
