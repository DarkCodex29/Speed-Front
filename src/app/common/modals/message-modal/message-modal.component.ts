import { Component } from '@angular/core';
import { DialogConfig, DialogRef } from '@speed/common/dialog';

@Component({
  selector: 'ui-message-modal',
  templateUrl: 'message-modal.component.html',
  styleUrls: ['message-modal.component.scss'],
})
export class MessageModalComponent {
  public data?: { message: string };

  public constructor(
    private dialogConfig: DialogConfig<{ message: string }>,
    private dialogRef: DialogRef,
  ) {
    this.data = this.dialogConfig.data || undefined;
  }

  public close() {
    this.dialogRef.close();
  }
}
