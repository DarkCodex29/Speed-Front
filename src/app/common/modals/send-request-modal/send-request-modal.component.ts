import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogConfig, DialogRef } from '@speed/common/dialog';
import { Subject, takeUntil } from 'rxjs';
import { SendRequestService } from '../../../workflow/final-user/common/services/send-request.service';

@Component({
  standalone: true,
  selector: 'app-send-request-modal',
  templateUrl: './send-request-modal.component.html',
  styleUrls: ['./send-request-modal.component.scss'],
  imports: [NgIf, NgFor, ReactiveFormsModule],
  providers: [SendRequestService],
})
export class SendRequestModalComponent {
  public idExpediente?: number;
  private unsubscribe: Subject<void>;
  public constructor(
    private dialogRef: DialogRef<unknown>,
    private dialogConfig: DialogConfig<number>,
    private sendRequestService: SendRequestService,
  ) {
    this.unsubscribe = new Subject();
    this.idExpediente = this.dialogConfig.data;
  }

  public sendRequest() {
    this.sendRequestService
      .enviarSolicituid(this.idExpediente as number)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe({
        next: () => {
          const params = { success: true };
          this.dialogRef.close(params);
        },
        error: (e) => {
          console.error(e.error.message);
          const params = { success: false };
          this.dialogRef.close(params);
        },
      });
  }

  public close() {
    this.dialogRef.close();
  }
}
