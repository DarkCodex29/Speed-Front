import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DialogService } from '@speed/common/dialog';
import { Subject, takeUntil } from 'rxjs';
import { MessageModalComponent } from '@speed/common/modals';
import { SpinnerOverlayService } from '@speed/common/services';
import { Table } from 'primeng/table';
import { ReplacementService } from '@speed/final-user/common/services/replacement.service';
import { ReplacementBD } from '@speed/common/interfaces/replacement.interface';
import { ReplacementMaintenanceModalComponent } from '@speed/common/modals/replacement-maintenance-modal/replacement-maintenance-modal.component';
import { ActionModal } from '@speed/common/enums';

@Component({
  selector: 'app-replacement-maintenance',
  templateUrl: './replacement-maintenance.component.html',
  styleUrls: ['./replacement-maintenance.component.scss'],
  providers: [ReplacementService],
})
export class ReplacementMaintenanceComponent implements OnInit, OnDestroy {
  public data: Array<ReplacementBD> = [];
  public filterForm!: FormGroup;
  @ViewChild('pt') public pTable?: Table;
  private unsubscribe: Subject<void>;

  public constructor(
    private replacementService: ReplacementService,
    private fb: FormBuilder,
    private dialogService: DialogService,
    private spinnerService: SpinnerOverlayService,
  ) {
    this.filterForm = this.fb.group({
      reemplazante: null,
      reemplazado: null,
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
        component: ReplacementMaintenanceModalComponent,
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

  public openEditReemplazo(id: number) {
    this.dialogService
      .show({
        component: ReplacementMaintenanceModalComponent,
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
      const index = dataSpeed.findIndex((tab: any) => tab.title.includes('Reemplazos'))
      if (index > -1) {
        if (dataSpeed[index].dataTab != null && dataSpeed[index].dataTab.data) {
          this.data = dataSpeed[index].dataTab.data;
        } else {
          this.spinnerService.show();
          dataSpeed[index].dataTab = {};
          this.data = await this.replacementService.getReemplazos(this.filterForm.value);
          dataSpeed[index].dataTab.data = this.data;
          localStorage.setItem('dataSpeed', JSON.stringify(dataSpeed));
          this.spinnerService.hide();
        }
      }
    }
  }

  public async clean() {
    this.data = [];
    this.filterForm.get('reemplazante')?.setValue(null);
    this.filterForm.get('reemplazado')?.setValue(null);
    this.spinnerService.show();
    this.data = await this.replacementService.getReemplazos(this.filterForm.value);
    this.spinnerService.hide();
  }

  public async submit() {
    this.data = [];
    this.spinnerService.show();
    this.data = await this.replacementService.getReemplazos(this.filterForm.value);
    this.spinnerService.hide();
  }

  public filterRows(event: Event) {
    const value = (event.target as EventTarget & { value: string }).value;
    this.pTable?.filterGlobal(value, 'contains');
  }
}
