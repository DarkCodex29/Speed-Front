import { NgIf, NgFor, DatePipe } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CalendarModule } from 'primeng/calendar';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DialogRef } from '@speed/common/dialog/dialog.ref';
import { DialogConfig } from '@speed/common/dialog/dialog.service';
import { ActionModal } from '@speed/common/enums';
import { SpinnerOverlayService } from '@speed/common/services';
import { Subject, takeUntil } from 'rxjs';
import { Utils } from '@speed/common/helpers';
import { PickListModule } from 'primeng/picklist';
import { CustomReactiveFormDirective } from '@speed/common/directives';
import { TipoProcesoBD, UsuarioParticipanteBD } from '@speed/common/interfaces/process.interface';
import { ProcessService } from '@speed/final-user/common/services/process.service';
import { ProcessModel } from '@speed/common/models/process.model';
import { ParametroBD, RolesBD } from '@speed/common/interfaces';
import { DocumentTypeBD } from '@speed/common/interfaces/document-type.interface';

@Component({
  standalone: true,
  selector: 'ui-process-modal',
  templateUrl: 'process-maintenance-modal.component.html',
  styleUrls: ['./process-maintenance-modal.component.scss'],
  providers: [ProcessService],
  imports: [NgIf, NgFor, ReactiveFormsModule, PickListModule, CustomReactiveFormDirective, CalendarModule, DatePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProcessMaintenanceModalComponent implements OnInit, OnDestroy {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public idProcess?: number;
  public processForm: FormGroup;
  //Datos del proceso
  public tipoProcesos: Array<TipoProcesoBD> = [];
  public confidencialidad: Array<ParametroBD> = [];
  public rolesResponsable: Array<RolesBD> = [];
  public usuariosResponsables: Array<UsuarioParticipanteBD> = [];
  //Contenedores
  public usuariosParticipanteFuente: Array<UsuarioParticipanteBD> = [];
  public usuariosParticipanteAsignados: Array<UsuarioParticipanteBD> = [];
  public rolesParticipanteFuente: Array<RolesBD> = [];
  public rolesParticipanteAsignados: Array<RolesBD> = [];
  public rolesProcesoFuente: Array<RolesBD> = [];
  public rolesProcesoAsignados: Array<RolesBD> = [];
  public tipoDocumentosFuente: Array<DocumentTypeBD> = [];
  public tipoDocumentosAsignados: Array<DocumentTypeBD> = [];
  public readonly action = ActionModal;
  public actionType = ActionModal.REGISTRAR;
  private unsubscribe: Subject<void>;

  public constructor(
    private cd: ChangeDetectorRef,
    private processService: ProcessService,
    private dialogConfig: DialogConfig<{ id?: number; actionType?: ActionModal }>,
    private dialogRef: DialogRef<unknown>,
    private spinnerService: SpinnerOverlayService,
  ) {
    this.unsubscribe = new Subject();
    const processModel = new ProcessModel();
    this.processForm = new FormGroup({ ...processModel });
    this.idProcess = this.dialogConfig.data?.id;
    this.actionType = this.dialogConfig.data?.actionType || ActionModal.REGISTRAR;
  }

  public async ngOnInit() {
    this.processForm.get('contenido')?.disable();
    this.tipoProcesos = await this.processService.getTipoProcesos();
    this.confidencialidad = await this.processService.getConfidencialidad();
    this.usuariosResponsables = await this.processService.getUsuariosParticipante();
    this.rolesResponsable = await this.processService.getRolesParticipante();
    if (this.idProcess) {
      this.spinnerService.show();
      await this.patchValue();
      this.spinnerService.hide();
    } else {
      this.usuariosParticipanteFuente = await this.processService.getUsuariosParticipante();
      this.rolesParticipanteFuente = await this.processService.getRolesParticipante();
      this.rolesProcesoFuente = await this.processService.getRolesProceso();
      this.tipoDocumentosFuente = await this.processService.getTipoDocumentos();
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
    Utils.validateAllFields(this.processForm);
    if (this.processForm.valid) {
      try {
        const params = this.processForm.value;
        // eslint-disable-next-line no-console
        console.log(params);
        params.usuariosParticipantes = this.usuariosParticipanteAsignados;
        params.rolesParticipantes = this.rolesParticipanteAsignados;
        params.rolesProcesos = this.rolesProcesoAsignados;
        params.tipoDocumentos = this.tipoDocumentosAsignados;
        this.processService
          .registerProceso(params)
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
    const data = await this.processService.getProcesoById(this.idProcess as number);

    // eslint-disable-next-line no-console
    console.log(data);

    this.processForm.get('id')?.setValue(data.id);
    this.processForm.get('nombre')?.setValue(data.nombre);
    this.processForm.get('idTipoProceso')?.setValue(data.tipoProceso.id);
    this.processForm.get('idConfidencialidad')?.setValue(data.confidencialidad.id);
    this.processForm.get('descripcion')?.setValue(data.descripcion);
    this.processForm.get('plazo')?.setValue(data.plazoDias);
    this.processForm.get('estado')?.setValue(data.estado);
    this.processForm.get('conCliente')?.setValue(data.conCliente);

    this.processForm.get('creadorResponsable')?.setValue(data.creadorResponsable);
    this.processForm.get('idUsuarioResponsable')?.setValue(data.usuarioResponsable?.id);
    this.processForm.get('idRolResponsable')?.setValue(data.rolResponsable?.id);

    this.usuariosParticipanteFuente = await this.processService.getUsuariosParticipanteDisponibles(this.idProcess as number);
    this.usuariosParticipanteAsignados = data.usuariosParticipantes;

    this.rolesParticipanteFuente = await this.processService.getRolesParticipanteDisponibles(this.idProcess as number);
    this.rolesParticipanteAsignados = data.rolesParticipantes;

    this.rolesProcesoFuente = await this.processService.getRolesProcesoDisponibles(this.idProcess as number);
    this.rolesProcesoAsignados = data.rolesProcesos;

    this.tipoDocumentosFuente = await this.processService.getTipoDocumentosDisponibles(this.idProcess as number);
    this.tipoDocumentosAsignados = data.tipoDocumentos;
  }
}
