import { NgIf, NgFor, DatePipe } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { DialogRef } from '@speed/common/dialog/dialog.ref';
import { DialogConfig } from '@speed/common/dialog/dialog.service';
import { GroupService } from '@speed/final-user/common/services/group.service';
import { ParametroBD, UsuariosBD } from '@speed/common/interfaces/group.interface';
import { SpinnerOverlayService } from '@speed/common/services';
import { GroupModel } from '@speed/common/models/group.model';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActionModal } from '@speed/common/enums';
import { DialogModule } from 'primeng/dialog';
import { Subject, takeUntil } from 'rxjs';
import { DialogService } from '@speed/common/dialog';
import { Utils } from '@speed/common/helpers';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { CustomReactiveFormDirective } from '@speed/common/directives';
import { MessageModalComponent } from '../message-modal';

@Component({
  standalone: true,
  selector: 'ui-group-modal',
  templateUrl: 'group-maintenance-modal.component.html',
  styleUrls: ['./group-maintenance-modal.component.scss'],
  providers: [GroupService],
  imports: [NgIf, NgFor, ReactiveFormsModule, DialogModule, DatePipe, TableModule, InputTextModule, CustomReactiveFormDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GroupMaintenanceModalComponent implements OnInit, OnDestroy {
  public dataUsuarios: Array<UsuariosBD> = [];
  public dataUsuariosSelecionados: Array<UsuariosBD> = [];
  public idGroup?: number;
  public tipoGrupos: Array<ParametroBD> = [];
  public groupForm: FormGroup;
  public readonly action = ActionModal;
  public actionType = ActionModal.REGISTRAR;
  public requestingUsuarioList: Array<UsuariosBD> = [];
  private unsubscribe: Subject<void>;

  public constructor(
    private cd: ChangeDetectorRef,
    private groupService: GroupService,
    private dialogConfig: DialogConfig<{ id?: number; actionType?: ActionModal }>,
    private dialogService: DialogService,
    private dialogRef: DialogRef<unknown>,
    private spinnerService: SpinnerOverlayService,
  ) {
    this.unsubscribe = new Subject();
    const groupModel = new GroupModel();
    this.groupForm = new FormGroup({ ...groupModel });
    this.idGroup = this.dialogConfig.data?.id;
    this.actionType = this.dialogConfig.data?.actionType || ActionModal.REGISTRAR;
  }

  public async ngOnInit() {
    this.groupForm.get('contenido')?.disable();
    this.tipoGrupos = await this.groupService.getTipoGrupos();
    this.requestingUsuarioList = await this.groupService.getUsuarios();
    if (this.idGroup) {
      this.spinnerService.show();
      await this.patchValue();
      this.spinnerService.hide();
    }
  }

  public selectUsuario(event: Event) {
    const idUsuario = (event as CustomEvent).detail.id;
    const existeUsuario = this.dataUsuarios.find((item) => {
      return item.id === idUsuario;
    });

    if (existeUsuario) {
      this.dialogService.show({
        component: MessageModalComponent,
        config: {
          data: {
            message: 'El usuario ya se encuentra agregado en la lista.',
          },
        },
      });
    } else {
      this.groupForm.get('usuario')?.setValue((event as CustomEvent).detail);
      this.groupForm.get('idUsuario')?.setValue(idUsuario);

      //ADD
      this.dataUsuarios.push((event as CustomEvent).detail);

      //CLEAR
      this.groupForm.get('usuario')?.setValue(null);
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
    Utils.validateAllFields(this.groupForm);
    if (this.groupForm.valid) {
      try {
        const params = this.groupForm.value;
        params.usuarios = this.dataUsuarios;
        // eslint-disable-next-line no-console
        console.log(params);
        this.groupService
          .registerGroup(params)
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

  public removeUser(position: number) {
    // eslint-disable-next-line no-console
    console.log('remove user');
    // eslint-disable-next-line no-console
    console.log(position);

    if (position > -1) {
      this.dataUsuarios.splice(position, 1);
      // eslint-disable-next-line no-console
      console.log(this.dataUsuarios);
    }
  }

  private async patchValue() {
    const data = await this.groupService.getGroupById(this.idGroup as number);

    this.groupForm.get('id')?.setValue(data.id);
    this.groupForm.get('nombre')?.setValue(data.nombre);
    this.groupForm.get('idTipoGrupo')?.setValue(data.tipoGrupo.id);
    this.groupForm.get('estado')?.setValue(data.estado);
    this.dataUsuarios = data.usuarios;
  }
}
