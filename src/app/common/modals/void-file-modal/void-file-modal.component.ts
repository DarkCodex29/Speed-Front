import { Component } from '@angular/core';
import { DialogConfig, DialogRef, DialogService } from '@speed/common/dialog';
import { AttachFileService } from '@speed/final-user/common/services';
import { TableModule } from 'primeng/table';
import { Subject, takeUntil } from 'rxjs';
import { MessageModalComponent } from '@speed/common/modals';

@Component({
  standalone: true,
  selector: 'app-void-file-modal',
  templateUrl: './void-file-modal.component.html',
  styleUrls: ['./void-file-modal.component.scss'],
  imports: [TableModule],
  providers: [AttachFileService],
})
export class VoidFileModalComponent {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public selectedItems!: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public dataArchivos: any;
  private unsubscribe: Subject<void>;

  public constructor(
    private dialogConfig: DialogConfig<number>,
    private dialogRef: DialogRef<unknown>,
    private attachFileService: AttachFileService,
    private dialogService: DialogService,
  ) {
    this.unsubscribe = new Subject();
    this.dataArchivos = this.dialogConfig.data;
  }

  public close() {
    this.dialogRef.close();
  }

  public anular() {
    if (this.selectedItems.length == 0) {
      this.dialogService.show({
        component: MessageModalComponent,
        config: {
          data: {
            message: 'Debe seleccionar al menos un archivo',
          },
        },
      });
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const params = this.selectedItems.map((item: any) => item.id);
      this.attachFileService
        .eliminarArchivo(params)
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
  }
}
