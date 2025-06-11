import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DialogService } from '@speed/common/dialog';
import { Subject, takeUntil } from 'rxjs';
import { SpinnerOverlayService } from '@speed/common/services';
import { Table } from 'primeng/table';
import { MessageModalComponent } from '@speed/common/modals';
import { AreaService } from '@speed/final-user/common/services/area.service';
import { AreaBD } from '@speed/common/interfaces';
import { AreaMaintenanceModalComponent } from '@speed/common/modals/area-maintenance-modal/area-maintenance-modal.component';
import { ActionModal } from '@speed/common/enums';
import { WorkflowTabCacheService } from 'src/app/workflow/workflow-tab-cache-service';

@Component({
  selector: 'app-area-maintenance',
  templateUrl: './area-maintenance.component.html',
  styleUrls: ['./area-maintenance.component.scss'],
  providers: [AreaService],
})
export class AreaMaintenanceComponent implements OnInit, OnDestroy {
  public data: Array<AreaBD> = [];
  public filterForm!: FormGroup;
  @ViewChild('pt') public pTable?: Table;
  private unsubscribe: Subject<void>;
  cachedData: any;

  public constructor(
    private areaService: AreaService,
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
        component: AreaMaintenanceModalComponent,
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
          //Preugntar si hay un modal de exito
        } catch (err) {
          console.error(err);
        }
      });
  }

  public openEditArea(id: number) {
    this.dialogService
      .show({
        component: AreaMaintenanceModalComponent,
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
    this.cachedData = this.cacheService.get('Areas');
    if (this.cachedData && this.cachedData.data) {
      this.data = this.cachedData.data;
    } else {
      this.spinnerService.show();
      this.cachedData = {};
      this.data = await this.areaService.getAreas(this.filterForm.value);
      this.cachedData.data = this.data;
      this.cacheService.set('Areas', this.cachedData);
      this.spinnerService.hide();
    }
  }

  public async clean() {
    this.data = [];
    this.filterForm.get('nombre')?.setValue(null);
    this.spinnerService.show();
    this.data = await this.areaService.getAreas(this.filterForm.value);
    this.cachedData.data = this.data;
    this.cacheService.set('Areas', this.cachedData);
    this.spinnerService.hide();
  }

  public async submit() {
    this.data = [];
    this.spinnerService.show();
    this.data = await this.areaService.getAreas(this.filterForm.value);
    this.cachedData.data = this.data;
    this.cacheService.set('Areas', this.cachedData);
    this.spinnerService.hide();
  }

  public filterRows(event: Event) {
    const value = (event.target as EventTarget & { value: string }).value;
    this.pTable?.filterGlobal(value, 'contains');
  }
}
