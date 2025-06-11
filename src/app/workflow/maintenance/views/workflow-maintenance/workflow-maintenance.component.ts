import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DialogService } from '@speed/common/dialog';
import { Subject, takeUntil } from 'rxjs';
import { MessageModalComponent } from '@speed/common/modals';
import { SpinnerOverlayService } from '@speed/common/services';
import { Table } from 'primeng/table';
import { WorkflowService } from '@speed/final-user/common/services/workflow.service';
import { WorkflowBD } from '@speed/common/interfaces/workflow.interface';
import { WorkflowMaintenanceModalComponent } from '@speed/common/modals/workflow-maintenance-modal/workflow-maintenance-modal.component';
import { ActionModal } from '@speed/common/enums';

@Component({
  selector: 'app-workflow-maintenance',
  templateUrl: './workflow-maintenance.component.html',
  styleUrls: ['./workflow-maintenance.component.scss'],
  providers: [WorkflowService],
})
export class WorkflowMaintenanceComponent implements OnInit, OnDestroy {
  public data: Array<WorkflowBD> = [];
  public filterForm!: FormGroup;
  @ViewChild('pt') public pTable?: Table;
  private unsubscribe: Subject<void>;

  public constructor(
    private workflowService: WorkflowService,
    private fb: FormBuilder,
    private dialogService: DialogService,
    private spinnerService: SpinnerOverlayService,
  ) {
    this.filterForm = this.fb.group({
      nombre: null,
      descripcion: null,
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
        component: WorkflowMaintenanceModalComponent,
      })
      .afterClosed.pipe(takeUntil(this.unsubscribe))
      .subscribe((action) => {
        const response = action as { success: boolean; message: string };
        try {
          this.dialogService.show({
            component: MessageModalComponent,
            config: {
              data: {
                message: response.message,
              },
            },
          });
          this.submit();
        } catch (err) {
          console.error(err);
        }
      });
  }

  public openEditWorkflow(id: number) {
    this.dialogService
      .show({
        component: WorkflowMaintenanceModalComponent,
        config: {
          data: {
            id: id,
            actionType: ActionModal.EDITAR,
          },
        },
      })
      .afterClosed.pipe(takeUntil(this.unsubscribe))
      .subscribe(async (action) => {
        const response = action as { success: boolean; message: string };
        try {
          this.dialogService.show({
            component: MessageModalComponent,
            config: {
              data: {
                message: response.message,
              },
            },
          });
          this.submit();
        } catch (err) {
          console.error(err);
        }
      });
  }

  public async ngOnInit() {
    this.data = [];
    const dataSpeed = JSON.parse(localStorage.getItem('dataSpeed') ?? '');
    if (dataSpeed != null) {
      const index = dataSpeed.findIndex((tab: any) => tab.title.includes('Workflow'))
      if (index > -1) {
        if (dataSpeed[index].dataTab != null && dataSpeed[index].dataTab.data) {
          this.data = dataSpeed[index].dataTab.data;
        } else {
          this.spinnerService.show();
          dataSpeed[index].dataTab = {};
          this.data = await this.workflowService.getWorkflows(this.filterForm.value);
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
    this.filterForm.get('descripcion')?.setValue(null);
    this.spinnerService.show();
    this.data = await this.workflowService.getWorkflows(this.filterForm.value);
    this.spinnerService.hide();
  }

  public async submit() {
    this.data = [];
    this.spinnerService.show();
    this.data = await this.workflowService.getWorkflows(this.filterForm.value);
    this.spinnerService.hide();
  }

  public filterRows(event: Event) {
    const value = (event.target as EventTarget & { value: string }).value;
    this.pTable?.filterGlobal(value, 'contains');
  }
}
