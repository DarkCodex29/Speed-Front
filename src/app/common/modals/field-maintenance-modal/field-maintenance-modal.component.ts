import { NgIf, NgFor } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DialogRef } from '@speed/common/dialog/dialog.ref';
import { DialogConfig } from '@speed/common/dialog/dialog.service';
import { ActionModal } from '@speed/common/enums';
import { FieldTypeBD } from '@speed/common/interfaces';
import { FieldModel } from '@speed/common/models/field.model';
import { SpinnerOverlayService } from '@speed/common/services';
import { FieldService } from '@speed/final-user/common/services/field.service';
import { Subject, takeUntil } from 'rxjs';
import { Utils } from '@speed/common/helpers';
import { CustomReactiveFormDirective } from '@speed/common/directives';

@Component({
  standalone: true,
  selector: 'ui-field-modal',
  templateUrl: 'field-maintenance-modal.component.html',
  styleUrls: ['./field-maintenance-modal.component.scss'],
  providers: [FieldService],
  imports: [NgIf, NgFor, ReactiveFormsModule, CustomReactiveFormDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FieldMaintenanceModalComponent implements OnInit, OnDestroy {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public idField?: number;
  public fieldForm: FormGroup;
  public tipoCampos: Array<FieldTypeBD> = [];
  public tipoParametros: Array<string> = [];
  public readonly action = ActionModal;
  public actionType = ActionModal.REGISTRAR;
  private unsubscribe: Subject<void>;

  public constructor(
    private cd: ChangeDetectorRef,
    private fieldService: FieldService,
    private dialogConfig: DialogConfig<{ id?: number; actionType?: ActionModal }>,
    private dialogRef: DialogRef<unknown>,
    private spinnerService: SpinnerOverlayService,
  ) {
    this.unsubscribe = new Subject();
    const fieldModel = new FieldModel();
    this.fieldForm = new FormGroup({ ...fieldModel });
    this.idField = this.dialogConfig.data?.id;
    this.actionType = this.dialogConfig.data?.actionType || ActionModal.REGISTRAR;
  }

  public async ngOnInit() {
    this.fieldForm.get('contenido')?.disable();
    this.tipoCampos = await this.fieldService.getTipoCampos();
    this.tipoParametros = await this.fieldService.getTipoParametros();
    this.subscribeChangeTipoCampo();
    if (this.idField) {
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
    Utils.validateAllFields(this.fieldForm);
    if (this.fieldForm.valid) {
      try {
        const params = this.fieldForm.value;
        // eslint-disable-next-line no-console
        console.log(params);
        this.fieldService
          .registerCampo(params)
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

  private subscribeChangeTipoCampo() {
    this.fieldForm
      .get('idTipoCampo')
      ?.valueChanges.pipe(takeUntil(this.unsubscribe))
      .subscribe((value) => {
        if (value == '3' || value == '4') {
          this.fieldForm.get('contenido')?.enable();
        } else {
          this.fieldForm.get('contenido')?.disable();
          this.fieldForm.get('contenido')?.setValue(null);
        }
      });
  }

  private async patchValue() {
    const data = await this.fieldService.getCampoById(this.idField as number);

    this.fieldForm.get('id')?.setValue(data.id);
    this.fieldForm.get('nombre')?.setValue(data.nombre);
    this.fieldForm.get('descripcion')?.setValue(data.descripcion);
    this.fieldForm.get('idTipoCampo')?.setValue(data.tipoCampo.id);
    this.fieldForm.get('contenido')?.setValue(data.contenido);
    this.fieldForm.get('etiqueta')?.setValue(data.etiqueta);
    this.fieldForm.get('buscable')?.setValue(data.buscable);
    this.fieldForm.get('obligatorio')?.setValue(data.obligatorio);
  }
}
