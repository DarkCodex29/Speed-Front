import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FieldBD } from '@speed/common/interfaces';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DialogService } from '@speed/common/dialog';
import { ActionModal } from '@speed/common/enums';
import { Subject, takeUntil } from 'rxjs';
import { MessageModalComponent } from '@speed/common/modals';
import { FieldService } from '@speed/final-user/common/services/field.service';
import { SpinnerOverlayService } from '@speed/common/services';
import { Table } from 'primeng/table';
import { FieldMaintenanceModalComponent } from '@speed/common/modals/field-maintenance-modal/field-maintenance-modal.component';
import { WorkflowTabCacheService } from 'src/app/workflow/workflow-tab-cache-service';

@Component({
  selector: 'app-field-maintenance',
  templateUrl: './field-maintenance.component.html',
  styleUrls: ['./field-maintenance.component.scss'],
  providers: [FieldService],
})
export class FieldMaintenanceComponent implements OnInit, OnDestroy {
  public data: Array<FieldBD> = [];
  public filterForm!: FormGroup;
  @ViewChild('pt') public pTable?: Table;
  private unsubscribe: Subject<void>;
  cachedData: any;

  public constructor(
    private fieldService: FieldService,
    private fb: FormBuilder,
    private dialogService: DialogService,
    private spinnerService: SpinnerOverlayService,
    private cacheService: WorkflowTabCacheService
  ) {
    this.filterForm = this.fb.group({
      descripcion: null,
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
        component: FieldMaintenanceModalComponent,
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

  public openEditCampo(id: number) {
    this.dialogService
      .show({
        component: FieldMaintenanceModalComponent,
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
    this.cachedData = this.cacheService.get('Campos');
    if (this.cachedData && this.cachedData.data) {
      this.data = this.cachedData.data;
    } else {
      this.spinnerService.show();
      this.cachedData = {};
      this.data = await this.fieldService.getCampos(this.filterForm.value);
      this.cachedData.data = this.data;
      this.cacheService.set('Campos', this.cachedData);
      this.spinnerService.hide();
    }
  }


  public async clean() {
    this.data = [];
    this.filterForm.get('descripcion')?.setValue(null);
    this.filterForm.get('nombre')?.setValue(null);
    this.spinnerService.show();
    this.data = await this.fieldService.getCampos(this.filterForm.value);
    this.cachedData.data = this.data;
    this.cacheService.set('Campos', this.cachedData);
    this.spinnerService.hide();
  }

  public async submit() {
    this.data = [];
    this.spinnerService.show();
    this.data = await this.fieldService.getCampos(this.filterForm.value);
    this.cachedData.data = this.data;
    this.cacheService.set('Campos', this.cachedData);
    this.spinnerService.hide();
  }

  public filterRows(event: Event) {
    const value = (event.target as EventTarget & { value: string }).value;
    this.pTable?.filterGlobal(value, 'contains');
  }
}
