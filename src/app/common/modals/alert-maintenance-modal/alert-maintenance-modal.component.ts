import { NgIf, NgFor } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DialogRef } from '@speed/common/dialog/dialog.ref';
import { DialogConfig } from '@speed/common/dialog/dialog.service';
import { ActionModal } from '@speed/common/enums';
import { SpinnerOverlayService } from '@speed/common/services';
import { Subject, takeUntil } from 'rxjs';
import { Utils } from '@speed/common/helpers';
import { SliderModule } from 'primeng/slider';
import { AlertService } from '@speed/final-user/common/services/alert.service';
import { AlertModel } from '@speed/common/models/alert.model';
import { AlertTypeBD, GridBD } from '@speed/common/interfaces/alert.interface';
import { CustomReactiveFormDirective } from '@speed/common/directives/custom-reactive-form.directive';

@Component({
  standalone: true,
  selector: 'ui-alert-modal',
  templateUrl: 'alert-maintenance-modal.component.html',
  styleUrls: ['./alert-maintenance-modal.component.scss'],
  providers: [AlertService],
  imports: [NgIf, NgFor, ReactiveFormsModule, CustomReactiveFormDirective, SliderModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AlertMaintenanceModalComponent implements OnInit, OnDestroy {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public idAlert?: number;
  public grids: Array<GridBD> = [];
  public tipoAlertas: Array<AlertTypeBD> = [];
  public alertForm: FormGroup;
  public readonly action = ActionModal;
  public actionType = ActionModal.REGISTRAR;
  private unsubscribe: Subject<void>;

  public constructor(
    private cd: ChangeDetectorRef,
    private alertService: AlertService,
    private dialogConfig: DialogConfig<{ id?: number; actionType?: ActionModal }>,
    private dialogRef: DialogRef<unknown>,
    private spinnerService: SpinnerOverlayService,
  ) {
    this.unsubscribe = new Subject();
    const alertModel = new AlertModel();
    this.alertForm = new FormGroup({ ...alertModel });
    this.idAlert = this.dialogConfig.data?.id;
    this.actionType = this.dialogConfig.data?.actionType || ActionModal.REGISTRAR;
  }

  public async ngOnInit() {
    this.alertForm.get('contenido')?.disable();
    this.grids = await this.alertService.getGrids();
    this.tipoAlertas = await this.alertService.getTipoAlertas();
    if (this.idAlert) {
      await this.patchValue();
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
    Utils.validateAllFields(this.alertForm);
    if (this.alertForm.valid) {
      try {
        const params = this.alertForm.value;
        // eslint-disable-next-line no-console
        console.log(params);
        this.alertService
          .registerAlerta(params)
          .pipe(takeUntil(this.unsubscribe))
          .subscribe(() => {
            const params = { modified: true };
            this.dialogRef.close(params);
          });
      } catch (err) {
        console.error(err);
      }
    }
  }

  private async patchValue() {
    const data = await this.alertService.getAlertaById(this.idAlert as number);
    this.alertForm.get('id')?.setValue(data.id);
    this.alertForm.get('idGrid')?.setValue(data.grid.id);
    this.alertForm.get('idTipoAlerta')?.setValue(data.tipoAlerta.id);
  }
}
