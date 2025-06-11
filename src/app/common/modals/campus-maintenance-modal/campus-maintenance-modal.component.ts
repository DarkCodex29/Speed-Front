import { CampusService } from '@speed/final-user/common/services/campus.service';
import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { UbigeoBD } from '@speed/common/interfaces/campus.interface';
import { DialogConfig } from '@speed/common/dialog/dialog.service';
import { CampusModel } from '@speed/common/models/campus.model';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SpinnerOverlayService } from '@speed/common/services';
import { DialogRef } from '@speed/common/dialog/dialog.ref';
import { ActionModal } from '@speed/common/enums';
import { NgIf, NgFor } from '@angular/common';
import { Utils } from '@speed/common/helpers';
import { Subject, takeUntil } from 'rxjs';
import { CustomReactiveFormDirective } from '@speed/common/directives';

@Component({
  standalone: true,
  selector: 'ui-campus-modal',
  templateUrl: 'campus-maintenance-modal.component.html',
  styleUrls: ['./campus-maintenance-modal.component.scss'],
  providers: [CampusService],
  imports: [NgIf, NgFor, ReactiveFormsModule, CustomReactiveFormDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CampusMaintenanceModalComponent implements OnInit, OnDestroy {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public idCampus?: number;
  public campusForm: FormGroup;
  public departamentos: Array<UbigeoBD> = [];
  public provincias: Array<UbigeoBD> = [];
  public distritos: Array<UbigeoBD> = [];
  public readonly action = ActionModal;
  public actionType = ActionModal.REGISTRAR;
  private unsubscribe: Subject<void>;

  public constructor(
    private cd: ChangeDetectorRef,
    private campusService: CampusService,
    private dialogConfig: DialogConfig<{ id?: number; actionType?: ActionModal }>,
    private dialogRef: DialogRef<unknown>,
    private spinnerService: SpinnerOverlayService,
  ) {
    this.unsubscribe = new Subject();
    const campusModel = new CampusModel();
    this.campusForm = new FormGroup({ ...campusModel });
    this.idCampus = this.dialogConfig.data?.id;
    this.actionType = this.dialogConfig.data?.actionType || ActionModal.REGISTRAR;
  }

  public async ngOnInit() {
    this.campusForm.get('contenido')?.disable();
    this.departamentos = await this.campusService.getDepartamentos();
    this.subscribeSelectDepartment();
    this.subscribeSelectProvince();
    if (this.idCampus) {
      await this.patchValue();
    }
  }

  public async subscribeSelectDepartment() {
    this.campusForm
      .get('idDepartamento')
      ?.valueChanges.pipe(takeUntil(this.unsubscribe))
      .subscribe(async (value) => {
        // eslint-disable-next-line no-console
        console.log('DEPARTAMENTO SELECCIONADO');
        // eslint-disable-next-line no-console
        console.log(value);

        if (value != null) {
          this.provincias = await this.campusService.getProvincias(value);
        } else {
          this.campusForm.get('idProvincia')?.disable();
        }
      });
  }

  public async subscribeSelectProvince() {
    this.campusForm
      .get('idProvincia')
      ?.valueChanges.pipe(takeUntil(this.unsubscribe))
      .subscribe(async (value) => {
        // eslint-disable-next-line no-console
        console.log('PROVINCIA SELECCIONADA');
        // eslint-disable-next-line no-console
        console.log(value);

        if (value != null) {
          this.distritos = await this.campusService.getDistritos(value);
        } else {
          this.campusForm.get('idUbigeo')?.disable();
        }
      });
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
    Utils.validateAllFields(this.campusForm);
    if (this.campusForm.valid) {
      try {
        const params = this.campusForm.value;
        // eslint-disable-next-line no-console
        console.log(params);
        this.campusService
          .registerSede(params)
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
    const data = await this.campusService.getSedeById(this.idCampus as number);

    this.campusForm.get('id')?.setValue(data.id);
    this.campusForm.get('nombre')?.setValue(data.nombre);
    this.campusForm.get('idDepartamento')?.setValue(data.ubigeo.padre.padre.id);
    this.campusForm.get('idProvincia')?.setValue(data.ubigeo.padre.id);
    this.campusForm.get('idUbigeo')?.setValue(data.ubigeo.id);
    this.campusForm.get('estado')?.setValue(data.estado == 'A' ? true : false);
  }
}
