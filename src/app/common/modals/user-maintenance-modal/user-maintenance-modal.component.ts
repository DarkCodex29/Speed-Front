import { NgIf, NgFor } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DialogRef } from '@speed/common/dialog/dialog.ref';
import { DialogConfig, DialogService } from '@speed/common/dialog/dialog.service';
import { ActionModal } from '@speed/common/enums';
import { AreaBD, RolesBD, PerfilesBD, JefeBD } from '@speed/common/interfaces/user.interface';
import { SpinnerOverlayService } from '@speed/common/services';
import { UserService } from '@speed/final-user/common/services/user.service';
import { PickListModule } from 'primeng/picklist';
import { Subject, takeUntil } from 'rxjs';
import { Utils } from '@speed/common/helpers';
import { UserModel } from '@speed/common/models/user.model';
import { CustomReactiveFormDirective } from '@speed/common/directives';
import { MessageModalComponent } from '../message-modal';

@Component({
  standalone: true,
  selector: 'ui-user-modal',
  templateUrl: 'user-maintenance-modal.component.html',
  styleUrls: ['./user-maintenance-modal.component.scss'],
  providers: [UserService],
  imports: [NgIf, NgFor, ReactiveFormsModule, PickListModule, CustomReactiveFormDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UserMaintenanceModalComponent implements OnInit, OnDestroy {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public idUser?: number;
  public userForm: FormGroup;
  public areas: Array<AreaBD> = [];
  public rolesFuente: Array<RolesBD> = [];
  public perfilesFuente: Array<PerfilesBD> = [];
  public rolesAsignados: Array<RolesBD> = [];
  public perfilesAsignados: Array<PerfilesBD> = [];
  public requestingJefeList: Array<JefeBD> = [];
  public readonly action = ActionModal;
  public actionType = ActionModal.REGISTRAR;
  private unsubscribe: Subject<void>;

  public constructor(
    private cd: ChangeDetectorRef,
    private userService: UserService,
    private dialogConfig: DialogConfig<{ id?: number; actionType?: ActionModal }>,
    private dialogRef: DialogRef<unknown>,
    private dialogService: DialogService,
    private spinnerService: SpinnerOverlayService,
  ) {
    this.unsubscribe = new Subject();
    const userModel = new UserModel();
    this.userForm = new FormGroup({ ...userModel });
    this.idUser = this.dialogConfig.data?.id;
    this.actionType = this.dialogConfig.data?.actionType || ActionModal.REGISTRAR;
  }

  public async ngOnInit() {
    this.userForm.get('contenido')?.disable();
    this.areas = await this.userService.getAreas();
    this.requestingJefeList = await this.userService.getJefes();
    this.userForm.get('idArea')?.setValue(1);
    if (this.idUser) {
      this.spinnerService.show();
      await this.getUserById();
      this.spinnerService.hide();
    } else {
      this.rolesFuente = await this.userService.getRoles();
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
    Utils.validateAllFields(this.userForm);
    if (this.userForm.valid) {
      try {
        const params = this.userForm.value;
        params.rolesAsignados = this.rolesAsignados;
        params.perfilesAsignados = this.perfilesAsignados;
        // eslint-disable-next-line no-console
        console.log('DATOS ENVIADOS');
        // eslint-disable-next-line no-console
        console.log(params);

        this.userService
          .registerUser(params)
          .pipe(takeUntil(this.unsubscribe))
          .subscribe({
            next: (data) => {
              const params = { modified: true };
              this.dialogRef.close(params);
            },
            error: (err) => {
              console.error(err);
              this.dialogService.show({
                component: MessageModalComponent,
                config: {
                  data: {
                    message: err.error.message || 'Ocurrió un error, intente nuevamente',
                  },
                },
              });
            },
          });
      } catch (err) {
        console.error(err);
      }
    }
  }

  public selectJefe(event: Event) {
    const idJefe = (event as CustomEvent).detail?.id;
    this.userForm.get('jefe')?.setValue((event as CustomEvent).detail);
    this.userForm.get('idJefe')?.setValue(idJefe);
  }

  private async getUserById() {
    const data = await this.userService.getUserById(this.idUser as number);

    this.userForm.get('id')?.setValue(data.id);
    this.userForm.get('usuario')?.setValue(data.usuario);
    this.userForm.get('clave')?.setValue(data.clave);
    this.userForm.get('nombres')?.setValue(data.nombres);
    this.userForm.get('apellidos')?.setValue(data.apellidos);
    this.userForm.get('idArea')?.setValue(data.area.id);
    this.userForm.get('jefe')?.setValue(data.jefe);
    this.userForm.get('correo')?.setValue(data.correo);
    this.userForm.get('estado')?.setValue(data.estado == 'A' ? true : false);
    this.userForm.get('requiereAprobacion')?.setValue(data.requiereAprobacion);

    this.rolesAsignados = data.roles;
    this.perfilesAsignados = data.perfiles;

    this.rolesFuente = await this.userService.getRolesDisponibles(this.idUser as number);
    this.perfilesFuente = await this.userService.getPerfilesDisponibles(this.idUser as number);
  }
}
