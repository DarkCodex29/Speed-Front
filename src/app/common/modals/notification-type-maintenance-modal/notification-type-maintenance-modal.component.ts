import { NgIf, NgFor } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DialogRef } from '@speed/common/dialog/dialog.ref';
import { DialogConfig } from '@speed/common/dialog/dialog.service';
import { ActionModal } from '@speed/common/enums';
import { SpinnerOverlayService } from '@speed/common/services';
import { Subject, takeUntil } from 'rxjs';
import { Utils } from '@speed/common/helpers';
import { NotificationTypeService } from '@speed/final-user/common/services/notification-type.service';
import { NotificationTypeModel } from '@speed/common/models/notification-type.model';

@Component({
  standalone: true,
  selector: 'ui-field-notification-type',
  templateUrl: 'notification-type-maintenance-modal.component.html',
  styleUrls: ['./notification-type-maintenance-modal.component.scss'],
  providers: [NotificationTypeService],
  imports: [NgIf, NgFor, ReactiveFormsModule],
})
export class NotificationTypeMaintenanceModalComponent implements OnInit, OnDestroy {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public idNotificationType?: number;
  public notificationTypeForm: FormGroup;
  public readonly action = ActionModal;
  public actionType = ActionModal.REGISTRAR;
  private unsubscribe: Subject<void>;

  public constructor(
    private cd: ChangeDetectorRef,
    private notificationTypeService: NotificationTypeService,
    private dialogConfig: DialogConfig<{ id?: number; actionType?: ActionModal }>,
    private dialogRef: DialogRef<unknown>,
    private spinnerService: SpinnerOverlayService,
  ) {
    this.unsubscribe = new Subject();
    const notificationTypeModel = new NotificationTypeModel();
    this.notificationTypeForm = new FormGroup({ ...notificationTypeModel });
    this.idNotificationType = this.dialogConfig.data?.id;
    this.actionType = this.dialogConfig.data?.actionType || ActionModal.REGISTRAR;
  }

  public async ngOnInit() {
    this.notificationTypeForm.get('contenido')?.disable();
    if (this.idNotificationType) {
      await this.patchValue();
    }
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public close() {
    const params = { modified: false };
    this.dialogRef.close(params);
  }

  public submit() {
    Utils.validateAllFields(this.notificationTypeForm);
    if (this.notificationTypeForm.valid) {
      try {
        const params = this.notificationTypeForm.value;
        // eslint-disable-next-line no-console
        console.log(params);
        this.notificationTypeService
          .registerTipoNotificacion(params)
          .pipe(takeUntil(this.unsubscribe))
          .subscribe(() => {
            const params = { modified: true };
            this.dialogRef.close(params);
          });
      } catch (err) {
        console.error(err);
      }
    }
  }

  private async patchValue() {
    const data = await this.notificationTypeService.getTipoNotificacionById(this.idNotificationType as number);

    this.notificationTypeForm.get('id')?.setValue(data.id);
    this.notificationTypeForm.get('nombre')?.setValue(data.nombre);
    this.notificationTypeForm.get('descripcion')?.setValue(data.descripcion);
    this.notificationTypeForm.get('codigo')?.setValue(data.codigo);
    this.notificationTypeForm.get('estado')?.setValue(data.estado == 'A' ? true : false);
  }
}
