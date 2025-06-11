import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DialogService } from '@speed/common/dialog';
import { Subject, takeUntil } from 'rxjs';
import { MessageModalComponent } from '@speed/common/modals';
import { SpinnerOverlayService } from '@speed/common/services';
import { Table } from 'primeng/table';
import { NotificationTypeService } from '@speed/final-user/common/services/notification-type.service';
// eslint-disable-next-line max-len
import { NotificationTypeMaintenanceModalComponent } from '@speed/common/modals/notification-type-maintenance-modal/notification-type-maintenance-modal.component';
import { NotificationTypeBD } from '@speed/common/interfaces/notification-type.interface';
import { ActionModal } from '@speed/common/enums';
import { WorkflowTabCacheService } from 'src/app/workflow/workflow-tab-cache-service';

@Component({
  selector: 'app-notification-type-maintenance',
  templateUrl: './notification-type-maintenance.component.html',
  styleUrls: ['./notification-type-maintenance.component.scss'],
  providers: [NotificationTypeService],
})
export class NotificationTypeMaintenanceComponent implements OnInit, OnDestroy {
  public data: Array<NotificationTypeBD> = [];
  public filterForm!: FormGroup;
  @ViewChild('pt') public pTable?: Table;
  private unsubscribe: Subject<void>;
  cachedData: any;

  public constructor(
    private notificationTypeService: NotificationTypeService,
    private fb: FormBuilder,
    private dialogService: DialogService,
    private spinnerService: SpinnerOverlayService,
    private cacheService: WorkflowTabCacheService
  ) {
    this.filterForm = this.fb.group({
      nombre: null,
    });
    this.unsubscribe = new Subject();
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public openModalRegistrar() {
    this.dialogService
      .show({
        component: NotificationTypeMaintenanceModalComponent,
      })
      .afterClosed.pipe(takeUntil(this.unsubscribe))
      .subscribe((action) => {
        const response = action as { modified: boolean };
        try {
          if (response.modified) {
            this.dialogService.show({
              component: MessageModalComponent,
              config: {
                data: {
                  message: 'Se registró correctamente',
                },
              },
            });
            this.submit();
          }
        } catch (err) {
          console.error(err);
        }
      });
  }

  public openEditTipoNotificacion(id: number) {
    this.dialogService
      .show({
        component: NotificationTypeMaintenanceModalComponent,
        config: {
          data: {
            id: id,
            actionType: ActionModal.EDITAR,
          },
        },
      })
      .afterClosed.pipe(takeUntil(this.unsubscribe))
      .subscribe(async (action) => {
        const response = action as { modified: boolean };
        try {
          if (response.modified) {
            this.dialogService.show({
              component: MessageModalComponent,
              config: {
                data: {
                  message: 'Se editó correctamente',
                },
              },
            });
            this.submit();
          }
        } catch (err) {
          console.error(err);
        }
      });
  }

  public async ngOnInit() {
    this.data = [];
    this.cachedData = this.cacheService.get('Tipo Notificación');
    if (this.cachedData && this.cachedData.data) {
      this.data = this.cachedData.data;
    } else {
      this.spinnerService.show();
      this.cachedData = {};
      this.data = await this.notificationTypeService.getTipoNotificaciones(this.filterForm.value);
      this.cachedData.data = this.data;
      this.cacheService.set('Tipo Notificación', this.cachedData);
      this.spinnerService.hide();
    }
  }


  public async clean() {
    this.data = [];
    this.filterForm.get('nombre')?.setValue(null);
    this.spinnerService.show();
    this.data = await this.notificationTypeService.getTipoNotificaciones(this.filterForm.value);
    this.cachedData.data = this.data;
    this.cacheService.set('Tipo Notificación', this.cachedData);
    this.spinnerService.hide();
  }

  public async submit() {
    this.data = [];
    this.spinnerService.show();
    this.data = await this.notificationTypeService.getTipoNotificaciones(this.filterForm.value);
    this.cachedData.data = this.data;
    this.cacheService.set('Tipo Notificación', this.cachedData);
    this.spinnerService.hide();
  }

  public filterRows(event: Event) {
    const value = (event.target as EventTarget & { value: string }).value;
    this.pTable?.filterGlobal(value, 'contains');
  }
}
