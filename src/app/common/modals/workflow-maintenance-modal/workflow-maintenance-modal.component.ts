import { NgIf, NgFor } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogRef } from '@speed/common/dialog/dialog.ref';
import { DialogConfig } from '@speed/common/dialog/dialog.service';
import { ActionModal } from '@speed/common/enums';
import { SpinnerOverlayService } from '@speed/common/services';
import { Subject, takeUntil } from 'rxjs';
import { Utils } from '@speed/common/helpers';
import { ProcessBD } from '@speed/common/interfaces/process.interface';
import { WorkflowModel } from '@speed/common/models/workflow.model';
import { WorkflowService } from '@speed/final-user/common/services/workflow.service';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  standalone: true,
  selector: 'ui-workflow-modal',
  templateUrl: 'workflow-maintenance-modal.component.html',
  styleUrls: ['./workflow-maintenance-modal.component.scss'],
  providers: [WorkflowService],
  imports: [NgIf, NgFor, ReactiveFormsModule, InputNumberModule, FormsModule],
})
export class WorkflowMaintenanceModalComponent implements OnInit, OnDestroy {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public idWorkflow?: number;
  public procesos: Array<ProcessBD> = [];
  public workflowForm: FormGroup;
  public readonly action = ActionModal;
  public actionType = ActionModal.REGISTRAR;
  private unsubscribe: Subject<void>;

  public constructor(
    private cd: ChangeDetectorRef,
    private workflowService: WorkflowService,
    private dialogConfig: DialogConfig<{ id?: number; actionType?: ActionModal }>,
    private dialogRef: DialogRef<unknown>,
    private spinnerService: SpinnerOverlayService,
  ) {
    this.unsubscribe = new Subject();
    const workflowModel = new WorkflowModel();
    this.workflowForm = new FormGroup({ ...workflowModel });
    this.idWorkflow = this.dialogConfig.data?.id;
    this.actionType = this.dialogConfig.data?.actionType || ActionModal.REGISTRAR;
  }

  public async ngOnInit() {
    this.workflowForm.get('contenido')?.disable();
    this.procesos = await this.workflowService.getProcesos();
    if (this.idWorkflow) {
      await this.patchValue();
    } else {
      this.workflowForm.get('version')?.setValue(1);
    }
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public close() {
    const params = { modified: false };
    this.dialogRef.close(params);
  }

  public submit() {
    Utils.validateAllFields(this.workflowForm);
    if (this.workflowForm.valid) {
      try {
        const params = this.workflowForm.value;
        // eslint-disable-next-line no-console
        console.log(params);
        this.workflowService
          .registerWorkflow(params)
          .pipe(takeUntil(this.unsubscribe))
          .subscribe({
            next: (response) => {
              this.spinnerService.hide();
              const params = { success: true, message: response.message };
              this.dialogRef.close(params);
            },
            error: (e) => {
              this.spinnerService.hide();
              console.error(e.error.message);
              const params = { success: false, message: e.error.message };
              this.dialogRef.close(params);
            },
          });
      } catch (err) {
        console.error(err);
      }
    }
  }

  private async patchValue() {
    const data = await this.workflowService.getWorkflowById(this.idWorkflow as number);

    this.workflowForm.get('id')?.setValue(data.id);
    this.workflowForm.get('nombre')?.setValue(data.nombre);
    this.workflowForm.get('descripcion')?.setValue(data.descripcion);
    this.workflowForm.get('version')?.setValue(data.version);
    this.workflowForm.get('idProceso')?.setValue(data.proceso.id);
  }
}
