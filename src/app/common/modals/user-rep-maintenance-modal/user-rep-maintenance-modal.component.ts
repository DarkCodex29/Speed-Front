import { NgIf, NgFor } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DialogRef } from '@speed/common/dialog/dialog.ref';
import { DialogConfig } from '@speed/common/dialog/dialog.service';
import { ActionModal } from '@speed/common/enums';
import { UserRepModel } from '@speed/common/models/user-rep.model';
import { CustomReactiveFormDirective } from '@speed/common/directives';
import { UserRepService } from '@speed/final-user/common/services/user-rep.service';
import { SpinnerOverlayService } from '@speed/common/services';
import { PickListModule } from 'primeng/picklist';
import { Subject, takeUntil } from 'rxjs';
import { Utils } from '@speed/common/helpers';
import { UserRepBD } from '@speed/common/interfaces/user-rep.interface';

@Component({
  standalone: true,
  selector: 'ui-user-rep-modal',
  templateUrl: 'user-rep-maintenance-modal.component.html',
  styleUrls: ['./user-rep-maintenance-modal.component.scss'],
  providers: [UserRepService],
  imports: [NgIf, NgFor, ReactiveFormsModule, PickListModule, CustomReactiveFormDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UserRepMaintenanceModalComponent implements OnInit, OnDestroy {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public idUserRep?: number;
  public userRepForm: FormGroup;
  public requestingUsuarioList: Array<UserRepBD> = [];
  public readonly action = ActionModal;
  public actionType = ActionModal.REGISTRAR;
  private unsubscribe: Subject<void>;

  public constructor(
    private cd: ChangeDetectorRef,
    private userRepService: UserRepService,
    private dialogConfig: DialogConfig<{ id?: number; actionType?: ActionModal }>,
    private dialogRef: DialogRef<unknown>,
    private spinnerService: SpinnerOverlayService,
  ) {
    this.unsubscribe = new Subject();
    const userRepModel = new UserRepModel();
    this.userRepForm = new FormGroup({ ...userRepModel });
    this.idUserRep = this.dialogConfig.data?.id;
    this.actionType = this.dialogConfig.data?.actionType || ActionModal.REGISTRAR;
  }

  public async ngOnInit() {
    this.userRepForm.get('contenido')?.disable();
    this.requestingUsuarioList = await this.userRepService.getUsuarios();
    if (this.idUserRep) {
      await this.getUserById();
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
    Utils.validateAllFields(this.userRepForm);
    if (this.userRepForm.valid) {
      try {
        const params = this.userRepForm.value;
        // eslint-disable-next-line no-console
        console.log(params);
        this.userRepService
          .registerUserCompany(params)
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

  public selectUsuario(event: Event) {
    const idUsuario = (event as CustomEvent).detail.id;
    // eslint-disable-next-line no-console
    console.log(idUsuario);
    this.userRepForm.get('usuario')?.setValue((event as CustomEvent).detail);
    this.userRepForm.get('idUsuario')?.setValue(idUsuario);
  }

  private async getUserById() {
    const data = await this.userRepService.getUserCompanyById(this.idUserRep as number);

    this.userRepForm.get('id')?.setValue(data.id);
    this.userRepForm.get('usuario')?.setValue(data.representante.nombreCompleto);
    this.userRepForm.get('idUsuario')?.setValue(data.representante.id);
    this.userRepForm.get('correo')?.setValue(data.correo);
    this.userRepForm.get('numeroDocumento')?.setValue(data.nroDocumento);
    this.userRepForm.get('estado')?.setValue(data.estado == 'S' ? true : false);
  }
}
