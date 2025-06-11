import { NgIf, NgFor } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DialogRef } from '@speed/common/dialog/dialog.ref';
import { DialogConfig } from '@speed/common/dialog/dialog.service';
import { ActionModal } from '@speed/common/enums';
import { SpinnerOverlayService } from '@speed/common/services';
import { Subject, takeUntil } from 'rxjs';
import { Utils } from '@speed/common/helpers';
import { ProfileModel } from '@speed/common/models/profile.model';
import { ProfileService } from '@speed/final-user/common/services/profile.service';

@Component({
  standalone: true,
  selector: 'ui-profile-modal',
  templateUrl: 'profile-maintenance-modal.component.html',
  styleUrls: ['./profile-maintenance-modal.component.scss'],
  providers: [ProfileService],
  imports: [NgIf, NgFor, ReactiveFormsModule],
})
export class ProfileMaintenanceModalComponent implements OnInit, OnDestroy {
  public idProfile?: number;
  public profileForm: FormGroup;
  public readonly action = ActionModal;
  public actionType = ActionModal.REGISTRAR;
  private unsubscribe: Subject<void>;

  public constructor(
    private cd: ChangeDetectorRef,
    private profileService: ProfileService,
    private dialogConfig: DialogConfig<{ id?: number; actionType?: ActionModal }>,
    private dialogRef: DialogRef<unknown>,
    private spinnerService: SpinnerOverlayService,
  ) {
    this.unsubscribe = new Subject();
    const profileModel = new ProfileModel();
    this.profileForm = new FormGroup({ ...profileModel });
    this.actionType = this.dialogConfig.data?.actionType || ActionModal.REGISTRAR;
  }

  public async ngOnInit() {
    this.profileForm.get('contenido')?.disable();
    if (this.idProfile) {
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
    Utils.validateAllFields(this.profileForm);
    if (this.profileForm.valid) {
      try {
        const params = this.profileForm.value;
        // eslint-disable-next-line no-console
        console.log(params);
        this.profileService
          .registerPerfil(params)
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
    const data = await this.profileService.getPerfilById(this.idProfile as number);

    this.profileForm.get('id')?.setValue(data.id);
    this.profileForm.get('nombre')?.setValue(data.nombre);
    this.profileForm.get('descripcion')?.setValue(data.descripcion);
    this.profileForm.get('codigo')?.setValue(data.codigo);
    this.profileForm.get('estado')?.setValue(data.estado == 'A' ? true : false);
  }
}
