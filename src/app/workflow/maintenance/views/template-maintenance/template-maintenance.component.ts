import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DialogService } from '@speed/common/dialog';
import { ActionModal } from '@speed/common/enums';
import { Subject, takeUntil } from 'rxjs';
import { MessageModalComponent } from '@speed/common/modals';
import { SpinnerOverlayService } from '@speed/common/services';
import { Table } from 'primeng/table';
import { TemplateService } from '@speed/final-user/common/services/template.service';
import { TemplateMaintenanceModalComponent } from '@speed/common/modals/template-maintenance-modal/template-maintenance-modal.component';
import { PlantillaBD } from '@speed/common/interfaces/template.interface';

@Component({
  selector: 'app-template-maintenance',
  templateUrl: './template-maintenance.component.html',
  styleUrls: ['./template-maintenance.component.scss'],
  providers: [TemplateService],
})
export class TemplateMaintenanceComponent implements OnInit, OnDestroy {
  public data: Array<PlantillaBD> = [];
  public filterForm!: FormGroup;
  @ViewChild('pt') public pTable?: Table;
  private unsubscribe: Subject<void>;

  public constructor(
    private templateService: TemplateService,
    private fb: FormBuilder,
    private dialogService: DialogService,
    private spinnerService: SpinnerOverlayService,
  ) {
    this.filterForm = this.fb.group({
      nombre: null,
      tipoContrato: null,
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
        component: TemplateMaintenanceModalComponent,
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

  public openEditPlantilla(id: number) {
    this.dialogService
      .show({
        component: TemplateMaintenanceModalComponent,
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
    const dataSpeed = JSON.parse(localStorage.getItem('dataSpeed') ?? '');
    if (dataSpeed != null) {
      const index = dataSpeed.findIndex((tab: any) => tab.title.includes('Plantillas'))
      if (index > -1) {
        if (dataSpeed[index].dataTab != null && dataSpeed[index].dataTab.data) {
          this.data = dataSpeed[index].dataTab.data;
        } else {
          this.spinnerService.show();
          dataSpeed[index].dataTab = {};
          this.data = await this.templateService.getPlantillas(this.filterForm.value);
          dataSpeed[index].dataTab.data = this.data;
          localStorage.setItem('dataSpeed', JSON.stringify(dataSpeed));
          this.spinnerService.hide();
        }
      }
    }
  }

  public async clean() {
    this.data = [];
    this.filterForm.get('nombre')?.setValue(null);
    this.filterForm.get('tipoContrato')?.setValue(null);
    this.spinnerService.show();
    this.data = await this.templateService.getPlantillas(this.filterForm.value);
    this.spinnerService.hide();
  }

  public async submit() {
    this.data = [];
    this.spinnerService.show();
    this.data = await this.templateService.getPlantillas(this.filterForm.value);
    this.spinnerService.hide();
  }

  public filterRows(event: Event) {
    const value = (event.target as EventTarget & { value: string }).value;
    this.pTable?.filterGlobal(value, 'contains');
  }
}
