import { NgIf, NgFor } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DialogRef } from '@speed/common/dialog/dialog.ref';
import { DialogConfig } from '@speed/common/dialog/dialog.service';
import { ActionModal } from '@speed/common/enums';
import { SpinnerOverlayService } from '@speed/common/services';
import { RoleService } from '@speed/final-user/common/services/role.service';
import { RoleModel } from '@speed/common/models/role.model';
import { Subject, takeUntil } from 'rxjs';
import { Utils } from '@speed/common/helpers';

@Component({
  standalone: true,
  selector: 'ui-role-modal',
  templateUrl: 'role-maintenance-modal.component.html',
  styleUrls: ['./role-maintenance-modal.component.scss'],
  providers: [RoleService],
  imports: [NgIf, NgFor, ReactiveFormsModule],
})
export class RoleMaintenanceModalComponent implements OnInit, OnDestroy {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public idRol?: number;
  public roleForm: FormGroup;
  public readonly action = ActionModal;
  public actionType = ActionModal.REGISTRAR;
  private unsubscribe: Subject<void>;

  public constructor(
    private cd: ChangeDetectorRef,
    private roleService: RoleService,
    private dialogConfig: DialogConfig<{ id?: number; actionType?: ActionModal }>,
    private dialogRef: DialogRef<unknown>,
    private spinnerService: SpinnerOverlayService,
  ) {
    this.unsubscribe = new Subject();
    const roleModel = new RoleModel();
    this.roleForm = new FormGroup({ ...roleModel });
    this.idRol = this.dialogConfig.data?.id;
    this.actionType = this.dialogConfig.data?.actionType || ActionModal.REGISTRAR;
  }

  public async ngOnInit() {
    this.roleForm.get('contenido')?.disable();
    if (this.idRol) {
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
    Utils.validateAllFields(this.roleForm);
    if (this.roleForm.valid) {
      try {
        const params = this.roleForm.value;
        // eslint-disable-next-line no-console
        console.log(params);
        this.roleService
          .registerRol(params)
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
    const data = await this.roleService.getRolById(this.idRol as number);

    this.roleForm.get('id')?.setValue(data.id);
    this.roleForm.get('nombre')?.setValue(data.nombre);
    this.roleForm.get('descripcion')?.setValue(data.descripcion);
    this.roleForm.get('codigo')?.setValue(data.codigo);
    this.roleForm.get('codigoSCA')?.setValue(data.codigoSCA);
    this.roleForm.get('estado')?.setValue(data.estado == 'A' ? true : false);
  }
}
