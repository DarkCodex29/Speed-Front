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
import { ReplacementService } from '@speed/final-user/common/services/replacement.service';
import { ReplacementModel } from '@speed/common/models/replacement.model';
import { PickListModule } from 'primeng/picklist';
import { CustomReactiveFormDirective } from '@speed/common/directives';
import { UserReemplazoBD } from '@speed/common/interfaces/replacement.interface';
import { ProcessBD } from '@speed/common/interfaces/process.interface';

@Component({
  standalone: true,
  selector: 'ui-replacement-modal',
  templateUrl: 'replacement-maintenance-modal.component.html',
  styleUrls: ['./replacement-maintenance-modal.component.scss'],
  providers: [ReplacementService],
  imports: [NgIf, NgFor, ReactiveFormsModule, PickListModule, CustomReactiveFormDirective, CalendarModule, DatePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ReplacementMaintenanceModalComponent implements OnInit, OnDestroy {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public idReplacement?: number;
  public replacementForm: FormGroup;
  public requestingUsuarioReemplazoList: Array<UserReemplazoBD> = [];
  public requestingUsuarioReemplazanteList: Array<UserReemplazoBD> = [];
  public procesosFuente: Array<ProcessBD> = [];
  public procesosAsignados: Array<ProcessBD> = [];
  public readonly action = ActionModal;
  public actionType = ActionModal.REGISTRAR;
  private unsubscribe: Subject<void>;

  public constructor(
    private cd: ChangeDetectorRef,
    private replacementService: ReplacementService,
    private dialogConfig: DialogConfig<{ id?: number; actionType?: ActionModal }>,
    private dialogRef: DialogRef<unknown>,
    private spinnerService: SpinnerOverlayService,
  ) {
    this.unsubscribe = new Subject();
    const replacementModel = new ReplacementModel();
    this.replacementForm = new FormGroup({ ...replacementModel });
    this.actionType = this.dialogConfig.data?.actionType || ActionModal.REGISTRAR;
  }

  public async ngOnInit() {
    this.replacementForm.get('contenido')?.disable();
    this.requestingUsuarioReemplazoList = await this.replacementService.getReemplazados();
    this.requestingUsuarioReemplazanteList = await this.replacementService.getReemplazados();
    if (this.idReplacement) {
      this.spinnerService.show();
      await this.patchValue();
      this.spinnerService.hide();
    } else {
      this.procesosFuente = await this.replacementService.getProcesos();
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
    Utils.validateAllFields(this.replacementForm);
    if (this.replacementForm.valid) {
      try {
        const params = this.replacementForm.value;
        // eslint-disable-next-line no-console
        console.log(params);
        params.fechaDesde = new Date(this.replacementForm.value.fechaDesde);
        params.fechaHasta = new Date(this.replacementForm.value.fechaHasta);
        params.procesos = this.procesosAsignados;
        this.replacementService
          .registerReemplazo(params)
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

  public selectUsuarioReemplazado(event: Event) {
    // eslint-disable-next-line no-console
    console.log((event as CustomEvent).detail);
    const idUsuario = (event as CustomEvent).detail != null ? (event as CustomEvent).detail.id : null;
    this.replacementForm.get('usuarioReemplazado')?.setValue((event as CustomEvent).detail);
    this.replacementForm.get('idReemplazado')?.setValue(idUsuario);
  }

  public selectUsuarioReemplazante(event: Event) {
    // eslint-disable-next-line no-console
    console.log((event as CustomEvent).detail);
    const idUsuario = (event as CustomEvent).detail != null ? (event as CustomEvent).detail.id : null;
    this.replacementForm.get('usuarioReemplazante')?.setValue((event as CustomEvent).detail);
    this.replacementForm.get('idReemplazante')?.setValue(idUsuario);
  }

  private async patchValue() {
    const data = await this.replacementService.getReemplazoById(this.idReplacement as number);

    // eslint-disable-next-line no-console
    console.log(data);

    this.replacementForm.get('id')?.setValue(data.id);
    this.replacementForm.get('usuarioReemplazado')?.setValue(data.reemplazado);
    this.replacementForm.get('idReemplazado')?.setValue(data.reemplazado.id);
    this.replacementForm.get('usuarioReemplazante')?.setValue(data.reemplazante);
    this.replacementForm.get('idReemplazante')?.setValue(data.reemplazante.id);
    this.replacementForm.get('fechaDesde')?.setValue(data.fechaDesde);
    this.replacementForm.get('fechaHasta')?.setValue(data.fechaHasta);

    this.procesosAsignados = data.procesos;
    this.procesosFuente = await this.replacementService.getProcesosDisponibles(this.idReplacement as number);
  }
}
