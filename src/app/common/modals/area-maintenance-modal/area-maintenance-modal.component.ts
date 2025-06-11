import { NgIf, NgFor } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DialogRef } from '@speed/common/dialog/dialog.ref';
import { DialogConfig } from '@speed/common/dialog/dialog.service';
import { ActionModal } from '@speed/common/enums';
import { SpinnerOverlayService } from '@speed/common/services';
import { Subject, takeUntil } from 'rxjs';
import { Utils } from '@speed/common/helpers';
import { SliderModule } from 'primeng/slider';
import { AreaService } from '@speed/final-user/common/services/area.service';
import { AreaBD, SedeBD } from '@speed/common/interfaces/area.interface';
import { AreaModel } from '@speed/common/models/area.model';

@Component({
  standalone: true,
  selector: 'ui-area-modal',
  templateUrl: 'area-maintenance-modal.component.html',
  styleUrls: ['./area-maintenance-modal.component.scss'],
  providers: [AreaService],
  imports: [NgIf, NgFor, ReactiveFormsModule, SliderModule],
})
export class AreaMaintenanceModalComponent implements OnInit, OnDestroy {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public idArea?: number;
  public sedes: Array<SedeBD> = [];
  public dependencias: Array<AreaBD> = [];
  public areaForm: FormGroup;
  public readonly action = ActionModal;
  public actionType = ActionModal.REGISTRAR;
  private unsubscribe: Subject<void>;

  public constructor(
    private cd: ChangeDetectorRef,
    private areaService: AreaService,
    private dialogConfig: DialogConfig<{ id?: number; actionType?: ActionModal }>,
    private dialogRef: DialogRef<unknown>,
    private spinnerService: SpinnerOverlayService,
  ) {
    this.unsubscribe = new Subject();
    const areaModel = new AreaModel();
    this.areaForm = new FormGroup({ ...areaModel });
    this.idArea = this.dialogConfig.data?.id;
    this.actionType = this.dialogConfig.data?.actionType || ActionModal.REGISTRAR;
  }

  public async ngOnInit() {
    this.areaForm.get('contenido')?.disable();
    this.sedes = await this.areaService.getSedes();
    this.dependencias = await this.areaService.getDependencias();
    if (this.idArea) {
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
    Utils.validateAllFields(this.areaForm);
    if (this.areaForm.valid) {
      try {
        const params = this.areaForm.value;
        // eslint-disable-next-line no-console
        console.log(params);
        this.areaService
          .registerArea(params)
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
    const data = await this.areaService.getAreaById(this.idArea as number);

    this.areaForm.get('id')?.setValue(data.id);
    this.areaForm.get('nombre')?.setValue(data.nombre);
    this.areaForm.get('idSede')?.setValue(data.sede.id);
    this.areaForm.get('idDependencia')?.setValue(data.dependencia.id);
  }
}
