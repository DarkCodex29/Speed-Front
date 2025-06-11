import { NgIf, NgFor } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogRef } from '@speed/common/dialog/dialog.ref';
import { DialogConfig } from '@speed/common/dialog/dialog.service';
import { ActionModal } from '@speed/common/enums';
import { SpinnerOverlayService } from '@speed/common/services';
import { Subject, takeUntil } from 'rxjs';
import { Utils } from '@speed/common/helpers';
import { AlertTypeService } from '@speed/final-user/common/services/alert-type.service';
import { AlertTypeModel } from '@speed/common/models/alert-type.model';
import { SliderModule } from 'primeng/slider';
import { DropdownModule } from 'primeng/dropdown';
@Component({
  standalone: true,
  selector: 'ui-alert-type-modal',
  templateUrl: 'alert-type-maintenance-modal.component.html',
  styleUrls: ['./alert-type-maintenance-modal.component.scss'],
  providers: [AlertTypeService],
  imports: [NgIf, NgFor, ReactiveFormsModule, SliderModule, FormsModule, DropdownModule],
})
export class AlertTypeMaintenanceModalComponent implements OnInit, OnDestroy {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public idAlertType?: number;
  public value!: number;
  public alertTypeForm: FormGroup;
  public readonly action = ActionModal;
  public actionType = ActionModal.REGISTRAR;
  public valor = 0;
  public colores: any;
  public selectedColor: any;
  private unsubscribe: Subject<void>;

  public constructor(
    private cd: ChangeDetectorRef,
    private alertTypeService: AlertTypeService,
    private dialogConfig: DialogConfig<{ id?: number; actionType?: ActionModal }>,
    private dialogRef: DialogRef<unknown>,
    private spinnerService: SpinnerOverlayService,
  ) {
    this.unsubscribe = new Subject();
    const alertTypeModel = new AlertTypeModel();
    this.alertTypeForm = new FormGroup({ ...alertTypeModel });
    this.idAlertType = this.dialogConfig.data?.id;
    this.actionType = this.dialogConfig.data?.actionType || ActionModal.REGISTRAR;
  }

  public async ngOnInit() {
    this.colores = [
      {
        name: 'Blanco',
        value: null,
        image: 'assets/img/alerts/circleGrey.png',
      },
      {
        name: 'Verde',
        value: 'circleGreen',
        image: 'assets/img/alerts/circleGreen.png',
      },
      {
        name: 'Rojo',
        value: 'circleRed',
        image: 'assets/img/alerts/circleRed.png',
      },
      {
        name: 'Amarillo',
        value: 'circleYellow',
        image: 'assets/img/alerts/circleYellow.png',
      },
    ];

    this.alertTypeForm.get('contenido')?.disable();
    this.alertTypeForm.get('porcentajeIntervalo')?.setValue(50);
    if (this.idAlertType) {
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
    Utils.validateAllFields(this.alertTypeForm);
    if (this.alertTypeForm.valid) {
      try {
        const params = this.alertTypeForm.value;
        params.imagen = this.alertTypeForm.value.imagen.value;
        // eslint-disable-next-line no-console
        console.log(params);
        this.alertTypeService
          .registerTipoAlerta(params)
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
    const data = await this.alertTypeService.getTipoAlertaById(this.idAlertType as number);

    this.alertTypeForm.get('id')?.setValue(data.id);
    this.alertTypeForm.get('nombre')?.setValue(data.nombre);
    this.alertTypeForm.get('imagen')?.setValue(data.imagen);
    this.alertTypeForm.get('porcentajeIntervalo')?.setValue(data.porcentaje);
    this.alertTypeForm.get('defecto')?.setValue(data.defecto);
    this.selectedColor = this.colores.find((obj: { value: string }) => {
      return obj.value === data.imagen;
    });
  }
}
