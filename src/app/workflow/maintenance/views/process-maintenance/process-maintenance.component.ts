import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DialogService } from '@speed/common/dialog';
import { Subject, takeUntil } from 'rxjs';
import { MessageModalComponent } from '@speed/common/modals';
import { SpinnerOverlayService } from '@speed/common/services';
import { Table } from 'primeng/table';
import { ProcessMaintenanceModalComponent } from '@speed/common/modals/process-maintenance-modal/process-maintenance-modal.component';
import { ProcessService } from '@speed/final-user/common/services/process.service';
import { ProcessBD, TipoProcesoBD } from '@speed/common/interfaces/process.interface';
import { ActionModal } from '@speed/common/enums';
import { WorkflowTabCacheService } from 'src/app/workflow/workflow-tab-cache-service';

@Component({
  selector: 'app-process-maintenance',
  templateUrl: './process-maintenance.component.html',
  styleUrls: ['./process-maintenance.component.scss'],
  providers: [ProcessService],
})
export class ProcessMaintenanceComponent implements OnInit, OnDestroy {
  public data: Array<ProcessBD> = [];
  public filterForm!: FormGroup;
  //Datos del proceso
  public tipoProcesos: Array<TipoProcesoBD> = [];
  @ViewChild('pt') public pTable?: Table;
  private unsubscribe: Subject<void>;
  cachedData: any;

  public constructor(
    private processService: ProcessService,
    private fb: FormBuilder,
    private dialogService: DialogService,
    private spinnerService: SpinnerOverlayService,
    private cacheService: WorkflowTabCacheService
  ) {
    this.filterForm = this.fb.group({
      nombre: null,
      idTipoProceso: null,
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
        component: ProcessMaintenanceModalComponent,
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

  public openEditProceso(id: number) {
    this.dialogService
      .show({
        component: ProcessMaintenanceModalComponent,
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
    this.cachedData = this.cacheService.get('Mant. Procesos');
    if (this.cachedData && this.cachedData.data && this.cachedData.tipoProcesos) {
      this.data = this.cachedData.data;
      this.tipoProcesos = this.cachedData.tipoProcesos;
    } else {
      this.spinnerService.show();
      this.cachedData = {};
      this.tipoProcesos = await this.processService.getTipoProcesos();
      this.cachedData.tipoProcesos = this.tipoProcesos;
      this.data = await this.processService.getProcesos(this.filterForm.value);
      this.cachedData.data = this.data;
      this.cacheService.set('Mant. Procesos', this.cachedData);
      this.spinnerService.hide();
    }
  }


  public async clean() {
    this.data = [];
    this.filterForm.get('nombre')?.setValue(null);
    this.filterForm.get('idTipoProceso')?.setValue(null);
    this.spinnerService.show();
    this.data = await this.processService.getProcesos(this.filterForm.value);
    this.cachedData.data = this.data;
    this.cacheService.set('Mant. Procesos', this.cachedData);
    this.spinnerService.hide();
  }

  public async submit() {
    this.data = [];
    this.spinnerService.show();
    this.data = await this.processService.getProcesos(this.filterForm.value);
    this.cachedData.data = this.data;
    this.cacheService.set('Mant. Procesos', this.cachedData);
    this.spinnerService.hide();
  }

  public filterRows(event: Event) {
    const value = (event.target as EventTarget & { value: string }).value;
    this.pTable?.filterGlobal(value, 'contains');
  }
}
