import { NgIf, NgFor } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DialogRef } from '@speed/common/dialog/dialog.ref';
import { DialogConfig } from '@speed/common/dialog/dialog.service';
import { ActionModal } from '@speed/common/enums';
import { SpinnerOverlayService } from '@speed/common/services';
import { Subject, takeUntil } from 'rxjs';
import { Utils } from '@speed/common/helpers';
import { ButtonService } from '@speed/final-user/common/services/button.service';
import { ButtonModel } from '@speed/common/models/button.model';
import { PerfilesBD } from '@speed/common/interfaces';
import { UserService } from '@speed/final-user/common/services/user.service';
import { PickListModule } from 'primeng/picklist';
import { CustomReactiveFormDirective } from '@speed/common/directives';

@Component({
  standalone: true,
  selector: 'ui-button-modal',
  templateUrl: 'button-maintenance-modal.component.html',
  styleUrls: ['./button-maintenance-modal.component.scss'],
  providers: [ButtonService, UserService],
  imports: [NgIf, NgFor, ReactiveFormsModule, PickListModule, CustomReactiveFormDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ButtonMaintenanceModalComponent implements OnInit, OnDestroy {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public idBoton?: number;
  public buttonForm: FormGroup;
  public perfilesFuente: Array<PerfilesBD> = [];
  public perfilesAsignados: Array<PerfilesBD> = [];
  public readonly action = ActionModal;
  public actionType = ActionModal.REGISTRAR;
  private unsubscribe: Subject<void>;

  public constructor(
    private cd: ChangeDetectorRef,
    private buttonService: ButtonService,
    private userService: UserService,
    private dialogConfig: DialogConfig<{ id?: number; actionType?: ActionModal }>,
    private dialogRef: DialogRef<unknown>,
    private spinnerService: SpinnerOverlayService,
  ) {
    this.unsubscribe = new Subject();
    const buttonModel = new ButtonModel();
    this.buttonForm = new FormGroup({ ...buttonModel });
    this.idBoton = this.dialogConfig.data?.id;
    this.actionType = this.dialogConfig.data?.actionType || ActionModal.REGISTRAR;
  }

  public async ngOnInit() {
    this.buttonForm.get('contenido')?.disable();
    if (this.idBoton) {
      this.spinnerService.show();
      await this.patchValue();
      this.spinnerService.hide();
    } else {
      this.perfilesFuente = await this.userService.getPerfiles();
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
    Utils.validateAllFields(this.buttonForm);
    if (this.buttonForm.valid) {
      try {
        const params = this.buttonForm.value;
        params.perfiles = this.perfilesAsignados;
        // eslint-disable-next-line no-console
        console.log(params);
        this.buttonService
          .registerBoton(params)
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
    const data = await this.buttonService.getBotonById(this.idBoton as number);

    // eslint-disable-next-line no-console
    console.log(data);

    this.buttonForm.get('id')?.setValue(data.id);
    this.buttonForm.get('nombre')?.setValue(data.nombre);
    this.buttonForm.get('descripcion')?.setValue(data.descripcion);
    this.buttonForm.get('url')?.setValue(data.url);
    this.buttonForm.get('codigo')?.setValue(data.codigo);
    this.buttonForm.get('tipo')?.setValue(data.tipo);
    this.buttonForm.get('icono')?.setValue(data.icono);
    this.buttonForm.get('parametro')?.setValue(data.parametro);
    this.buttonForm.get('eventoSubmit')?.setValue(data.eventoSubmit);
    this.buttonForm.get('eventoComplete')?.setValue(data.eventoComplete);
    this.buttonForm.get('orden')?.setValue(data.orden);
    this.buttonForm.get('estado')?.setValue(data.estado);
    this.buttonForm.get('bloqueable')?.setValue(data.bloqueable);
    this.buttonForm.get('bloqueableParalelo')?.setValue(data.bloqueableParalelo);

    this.perfilesAsignados = data.perfiles;
    this.perfilesFuente = await this.buttonService.getPerfilesDisponibles(this.idBoton as number);
  }
}
