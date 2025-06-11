import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DialogService } from '@speed/common/dialog';
import { Subject, takeUntil } from 'rxjs';
import { MessageModalComponent } from '@speed/common/modals';
import { SpinnerOverlayService } from '@speed/common/services';
import { CampusService } from '@speed/final-user/common/services/campus.service';
import { CampusMaintenanceModalComponent } from '@speed/common/modals/campus-maintenance-modal/campus-maintenance-modal.component';
import { SedeBD } from '@speed/common/interfaces/campus.interface';
import { Table } from 'primeng/table';
import { ActionModal } from '@speed/common/enums';
import { WorkflowTabCacheService } from 'src/app/workflow/workflow-tab-cache-service';

@Component({
  selector: 'app-campus-maintenance',
  templateUrl: './campus-maintenance.component.html',
  styleUrls: ['./campus-maintenance.component.scss'],
  providers: [CampusService],
})
export class CampusMaintenanceComponent implements OnInit, OnDestroy {
  public data: Array<SedeBD> = [];
  public filterForm!: FormGroup;
  @ViewChild('pt') public pTable?: Table;
  private unsubscribe: Subject<void>;
  cachedData: any;

  public constructor(
    private campusService: CampusService,
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
        component: CampusMaintenanceModalComponent,
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

  public openEditSede(id: number) {
    this.dialogService
      .show({
        component: CampusMaintenanceModalComponent,
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
    this.cachedData = this.cacheService.get('Sede');
    if (this.cachedData && this.cachedData.data) {
      this.data = this.cachedData.data;
    } else {
      this.spinnerService.show();
      this.cachedData = {};
      this.data = await this.campusService.getSedes(this.filterForm.value);
      this.cachedData.data = this.data;
      this.cacheService.set('Sede', this.cachedData);
      this.spinnerService.hide();
    }
  }

  public async clean() {
    this.data = [];
    this.filterForm.get('descripcion')?.setValue(null);
    this.filterForm.get('nombre')?.setValue(null);
    this.spinnerService.show();
    this.data = await this.campusService.getSedes(this.filterForm.value);
    this.cachedData.data = this.data;
    this.cacheService.set('Sede', this.cachedData);
    this.spinnerService.hide();
  }

  public async submit() {
    this.data = [];
    this.spinnerService.show();
    this.data = await this.campusService.getSedes(this.filterForm.value);
    this.cachedData.data = this.data;
    this.cacheService.set('Sede', this.cachedData);
    this.spinnerService.hide();
  }

  public filterRows(event: Event) {
    const value = (event.target as EventTarget & { value: string }).value;
    this.pTable?.filterGlobal(value, 'contains');
  }
}
