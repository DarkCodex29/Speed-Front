import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DialogService } from '@speed/common/dialog';
import { Subject, takeUntil } from 'rxjs';
import { MessageModalComponent } from '@speed/common/modals';
import { SpinnerOverlayService } from '@speed/common/services';
import { Table } from 'primeng/table';
import { HolidayService } from '@speed/final-user/common/services/holiday.service';
import { HolidayBD } from '@speed/common/interfaces/holiday.interface';
import { HolidayMaintenanceModalComponent } from '@speed/common/modals/holiday-maintenance-modal/holiday-maintenance-modal.component';
import { ActionModal } from '@speed/common/enums';
import { WorkflowTabCacheService } from 'src/app/workflow/workflow-tab-cache-service';

@Component({
  selector: 'app-holiday-maintenance',
  templateUrl: './holiday-maintenance.component.html',
  styleUrls: ['./holiday-maintenance.component.scss'],
  providers: [HolidayService],
})
export class HolidayMaintenanceComponent implements OnInit, OnDestroy {
  public data: Array<HolidayBD> = [];
  public filterForm!: FormGroup;
  @ViewChild('pt') public pTable?: Table;
  private unsubscribe: Subject<void>;
  cachedData: any;

  public constructor(
    private holidayService: HolidayService,
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
        component: HolidayMaintenanceModalComponent,
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

  public openEditFeriado(id: number) {
    this.dialogService
      .show({
        component: HolidayMaintenanceModalComponent,
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
    this.cachedData = this.cacheService.get('Feriados');
    if (this.cachedData && this.cachedData.data) {
      this.data = this.cachedData.data;
    } else {
      this.spinnerService.show();
      this.cachedData = {};
      this.data = await this.holidayService.getFeriados(this.filterForm.value);
      this.cachedData.data = this.data;
      this.cacheService.set('Feriados', this.cachedData);
      this.spinnerService.hide();
    }
  }


  public async clean() {
    this.data = [];
    this.filterForm.get('nombre')?.setValue(null);
    this.spinnerService.show();
    this.data = await this.holidayService.getFeriados(this.filterForm.value);
    this.cachedData.data = this.data;
    this.cacheService.set('Feriados', this.cachedData);
    this.spinnerService.hide();
  }

  public async submit() {
    this.data = [];
    this.spinnerService.show();
    this.data = await this.holidayService.getFeriados(this.filterForm.value);
    this.cachedData.data = this.data;
    this.cacheService.set('Feriados', this.cachedData);
    this.spinnerService.hide();
  }

  public filterRows(event: Event) {
    const value = (event.target as EventTarget & { value: string }).value;
    this.pTable?.filterGlobal(value, 'contains');
  }
}
