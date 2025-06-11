import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DialogService } from '@speed/common/dialog';
import { Subject, takeUntil } from 'rxjs';
import { MessageModalComponent } from '@speed/common/modals';
import { SpinnerOverlayService } from '@speed/common/services';
import { Table } from 'primeng/table';
import { NumerationMaintenanceModalComponent } from '@speed/common/modals/numeration-maintenance-modal/numeration-maintenance-modal.component';
import { NumerationService } from '@speed/final-user/common/services/numeration.service';
import { NumerationBD } from '@speed/common/interfaces/numeration.interface';
import { ActionModal } from '@speed/common/enums';
import { WorkflowTabCacheService } from 'src/app/workflow/workflow-tab-cache-service';

@Component({
  selector: 'app-numeration-maintenance',
  templateUrl: './numeration-maintenance.component.html',
  styleUrls: ['./numeration-maintenance.component.scss'],
  providers: [NumerationService],
})
export class NumerationMaintenanceComponent implements OnInit, OnDestroy {
  public data: Array<NumerationBD> = [];
  public filterForm!: FormGroup;
  @ViewChild('pt') public pTable?: Table;
  private unsubscribe: Subject<void>;
  cachedData: any;

  public constructor(
    private numerationService: NumerationService,
    private fb: FormBuilder,
    private dialogService: DialogService,
    private spinnerService: SpinnerOverlayService,
    private cacheService: WorkflowTabCacheService
  ) {
    this.filterForm = this.fb.group({
      numeroActual: null,
      formato: null,
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
        component: NumerationMaintenanceModalComponent,
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

  public openEditNumeracion(id: number) {
    this.dialogService
      .show({
        component: NumerationMaintenanceModalComponent,
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
    this.cachedData = this.cacheService.get('Numeración');
    if (this.cachedData && this.cachedData.data) {
      this.data = this.cachedData.data;
    } else {
      this.spinnerService.show();
      this.cachedData = {};
      this.data = await this.numerationService.getNumeraciones(this.filterForm.value);
      this.cachedData.data = this.data;
      this.cacheService.set('Numeración', this.cachedData);
      this.spinnerService.hide();
    }
  }

  public async clean() {
    this.data = [];
    this.filterForm.get('numeroActual')?.setValue(null);
    this.filterForm.get('formato')?.setValue(null);
    this.spinnerService.show();
    this.data = await this.numerationService.getNumeraciones(this.filterForm.value);
    this.cachedData.data = this.data;
    this.cacheService.set('Numeración', this.cachedData);
    this.spinnerService.hide();
  }

  public async submit() {
    this.data = [];
    this.spinnerService.show();
    this.data = await this.numerationService.getNumeraciones(this.filterForm.value);
    this.cachedData.data = this.data;
    this.cacheService.set('Numeración', this.cachedData);
    this.spinnerService.hide();
  }

  public filterRows(event: Event) {
    const value = (event.target as EventTarget & { value: string }).value;
    this.pTable?.filterGlobal(value, 'contains');
  }
}
