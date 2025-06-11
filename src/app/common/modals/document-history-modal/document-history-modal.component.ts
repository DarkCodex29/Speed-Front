import { Component } from '@angular/core';
import { DialogRef } from '@speed/common/dialog';

@Component({
  standalone: true,
  selector: 'ui-document-history-modal',
  templateUrl: './document-history-modal.component.html',
  styleUrls: ['./document-history-modal.component.scss'],
})
export class DocumentHistoryModalComponent {
  public constructor(private dialogRef: DialogRef<unknown>) {}

  public close() {
    this.dialogRef.close();
  }
}
