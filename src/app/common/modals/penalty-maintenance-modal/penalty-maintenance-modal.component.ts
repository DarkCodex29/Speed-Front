import { NgIf, NgFor } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DialogRef } from '@speed/common/dialog/dialog.ref';
import { DialogConfig } from '@speed/common/dialog/dialog.service';
import { ActionModal } from '@speed/common/enums';
import { CustomReactiveFormDirective } from '@speed/common/directives';
import { SpinnerOverlayService } from '@speed/common/services';
import { Subject, takeUntil } from 'rxjs';
import { Utils } from '@speed/common/helpers';
import { PenaltyService } from '@speed/final-user/common/services/penalty.service';
import { ReiteranciaBD, TipoValorBD } from '@speed/common/interfaces/penalty.interface';
import { PenaltyManualModel } from '@speed/common/models/penaltyManual.model';

@Component({
  standalone: true,
  selector: 'ui-penalty-modal',
  templateUrl: 'penalty-maintenance-modal.component.html',
  styleUrls: ['./penalty-maintenance-modal.component.scss'],
  providers: [PenaltyService],
  imports: [NgIf, NgFor, ReactiveFormsModule, CustomReactiveFormDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PenaltyMaintenanceModalComponent implements OnInit, OnDestroy {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public idPenalty?: number;
  public penaltyForm: FormGroup;
  public reiterancias: Array<ReiteranciaBD> = [];
  public tipoValores: Array<TipoValorBD> = [];
  public readonly action = ActionModal;
  public actionType = ActionModal.REGISTRAR;
  private unsubscribe: Subject<void>;

  public constructor(
    private cd: ChangeDetectorRef,
    private penaltyService: PenaltyService,
    private dialogConfig: DialogConfig<{ id?: number; actionType?: ActionModal }>,
    private dialogRef: DialogRef<unknown>,
    private spinnerService: SpinnerOverlayService,
  ) {
    this.unsubscribe = new Subject();
    const penaltyManualModel = new PenaltyManualModel();
    this.penaltyForm = new FormGroup({ ...penaltyManualModel });
    this.idPenalty = this.dialogConfig.data?.id;
    this.actionType = this.dialogConfig.data?.actionType || ActionModal.REGISTRAR;
  }

  public async ngOnInit() {
    this.penaltyForm.get('contenido')?.disable();
    this.reiterancias = await this.penaltyService.getReiterancias();
    this.tipoValores = await this.penaltyService.getTipoValores();
    if (this.idPenalty) {
      await this.patchValue();
    } else {
      await this.subscribeChangeAplicaValorDefecto();
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
    Utils.validateAllFields(this.penaltyForm);
    if (this.penaltyForm.valid) {
      try {
        const params = this.penaltyForm.value;
        // eslint-disable-next-line no-console
        console.log(params);
        this.penaltyService
          .registerPenalidad(params)
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

  public async subscribeChangeAplicaValorDefecto() {
    // eslint-disable-next-line no-console
    console.log('Ingreso aqui');

    const aplicaDefecto = this.penaltyForm.get('aplicaValorDefecto')?.value;

    // eslint-disable-next-line no-console
    console.log(aplicaDefecto);

    if (aplicaDefecto) {
      this.penaltyForm.get('numeroReiterancia')?.enable();
      this.penaltyForm.get('idTipoValor')?.enable();
      this.penaltyForm.get('idTipoValor')?.setValue(0);
      this.penaltyForm.get('valor')?.enable();
    } else {
      this.penaltyForm.get('numeroReiterancia')?.disable();
      this.penaltyForm.get('idTipoValor')?.disable();
      this.penaltyForm.get('valor')?.disable();
      this.penaltyForm.get('numeroReiterancia')?.setValue(null);
      this.penaltyForm.get('idTipoValor')?.setValue(null);
      this.penaltyForm.get('valor')?.setValue(null);
    }
  }

  private async patchValue() {
    const data = await this.penaltyService.getPenalidadById(this.idPenalty as number);

    this.penaltyForm.get('id')?.setValue(data.id);
    this.penaltyForm.get('penalidad')?.setValue(data.descripcion);
    this.penaltyForm.get('idReiterancia')?.setValue(data.reiterancia);
    this.penaltyForm.get('aplicaPenalidad')?.setValue(data.aplicaPenalidad);
    this.penaltyForm.get('estado')?.setValue(data.estado);
    this.penaltyForm.get('etiqueta')?.setValue(data.etiqueta);
    this.penaltyForm.get('aplicaValorDefecto')?.setValue(data.aplicaPorDefecto);
    this.penaltyForm.get('numeroReiterancia')?.setValue(data.numeroReiterancia);
    this.penaltyForm.get('idTipoValor')?.setValue(data.tipoValor);
    this.penaltyForm.get('valor')?.setValue(data.valor);
    await this.subscribeChangeAplicaValorDefecto();
  }
}
