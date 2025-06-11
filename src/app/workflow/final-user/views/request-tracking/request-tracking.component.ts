import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DialogService } from '@speed/common/dialog';
import { Utils } from '@speed/common/helpers';
import { FilaSeguimientoSolicitudDTS, IAbogadoResponsable, ICounterPartBD, IRequestingUser, IState } from '@speed/common/interfaces';
import { MessageModalComponent } from '@speed/common/modals';
import { TrackingDocumentModel } from '@speed/common/models';
import { SpinnerOverlayService } from '@speed/common/services';
import { ComboDataService, DocumentService } from '@speed/final-user/common/services';
import { Table } from 'primeng/table';
import { Subject, takeUntil } from 'rxjs';
import { WorkflowTabCacheService } from 'src/app/workflow/workflow-tab-cache-service';

@Component({
  selector: 'app-request-tracking',
  templateUrl: './request-tracking.component.html',
  styleUrls: ['./request-tracking.component.scss'],
  providers: [ComboDataService, DocumentService],
})
export class RequestTrackingComponent implements OnInit, OnDestroy {
  @ViewChild('pt') public pTable?: Table;
  public statesList: Array<IState> = [];
  public overlay = false;
  public valueState = '';
  public requestTrackingForm: FormGroup;
  public contrapartes: Array<ICounterPartBD> = [];
  public usuariosResponsables: Array<IAbogadoResponsable> = [];
  public usuariosSolicitantes: Array<IRequestingUser> = [];
  public data: Array<FilaSeguimientoSolicitudDTS> = [];
  private unsubscribe$: Subject<void>;
  cachedData: any;

  public constructor(
    private dataService: ComboDataService,
    private spinnerService: SpinnerOverlayService,
    private fb: FormBuilder,
    private documentService: DocumentService,
    private dialogService: DialogService,
    private cacheService: WorkflowTabCacheService
  ) {
    const form = new TrackingDocumentModel();
    this.requestTrackingForm = this.fb.group({ ...form });
    this.unsubscribe$ = new Subject();
  }

  public async ngOnInit() {
    await this.recoverData();
    // this.chargeData();
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public selectContraparte(event: Event) {
    const select = (event as CustomEvent).detail;
    this.requestTrackingForm.get('idContraparte')?.setValue(select);
  }

  public selectSolicitante(event: Event) {
    const select = (event as CustomEvent).detail;
    this.requestTrackingForm.get('idSolicitante')?.setValue(select);
  }

  public selectAbogadoResponsable(event: Event) {
    const select = (event as CustomEvent).detail;
    this.requestTrackingForm.get('idResponsable')?.setValue(select);
  }

  public async submit() {
    Utils.validateAllFields(this.requestTrackingForm);
    if (this.requestTrackingForm.valid) {
      this.data = [];
      const params = { ...this.requestTrackingForm.value };
      params.idSolicitante = params.idSolicitante?.id || null;
      params.idResponsable = params.idResponsable?.id || null;
      params.idContraparte = params.idContraparte?.id || null;
      try {
        this.spinnerService.show();
        this.data = await this.documentService.getTrackindDocuments(params);
        this.cachedData.data = this.data;
        this.cacheService.set('Seguimiento de Solicitudes', this.cachedData);
      } catch (e) {
        console.error(e);
      } finally {
        this.spinnerService.hide();
      }

      //
    }
  }

  public filterRows(event: Event) {
    const value = (event.target as EventTarget & { value: string }).value;
    this.pTable?.filterGlobal(value, 'contains');
  }

  public onUpdateData() {
    this.spinnerService.show();
    const list = this.data.map((item) => ({
      idDocumentoLegal: item.idDocumentoLegal,
      ultimoMovimiento: item.ultimoMovimiento,
      ubicacionDocumento: item.ubicacionDocumento,
    }));
    const params = {
      listadoSolicitudes: list,
    };
    this.documentService
      .guardarSolicitudes(params)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: () => {
          this.spinnerService.hide();
          this.dialogService.show({
            component: MessageModalComponent,
            config: {
              data: {
                message: 'Datos actualizados exitósamente.',
              },
            },
          });
        },
        error: (err) => {
          this.spinnerService.hide();
          console.error(err);
        },
      });
  }

  public cleanInputs() {
    this.requestTrackingForm.get('numero')?.setValue('');
    this.requestTrackingForm.get('sumilla')?.setValue('');
    this.requestTrackingForm.get('idContraparte')?.setValue(null);
    this.requestTrackingForm.get('idSolicitante')?.setValue(null);
    this.requestTrackingForm.get('idResponsable')?.setValue(null);
    this.requestTrackingForm.get('estado')?.setValue(null);
  }

  private async recoverData() {
    this.cachedData = this.cacheService.get('Seguimiento de Solicitudes');

    if (this.cachedData && this.cachedData.statesList &&
      this.cachedData.contrapartes &&
      this.cachedData.usuariosResponsables &&
      this.cachedData.usuariosSolicitantes){
        this.statesList = this.cachedData.statesList;
        this.contrapartes = this.cachedData.contrapartes;
        this.usuariosResponsables = this.cachedData.usuariosResponsables;
        this.usuariosSolicitantes = this.cachedData.usuariosSolicitantes;
        if(this.cachedData.data){
          this.data = this.cachedData.data;
        }
      }
    try {
      this.spinnerService.show();
      this.cachedData = {};
      const responses = await Promise.all([
        this.documentService.getEstadosDocument(),
        this.dataService.getCounterParts(),
        this.dataService.getResponsibleLawyers(),
        this.dataService.getRequestingUsers(),
      ]);
      this.statesList = responses[0];
      this.contrapartes = responses[1];
      this.usuariosResponsables = responses[2];
      this.usuariosSolicitantes = responses[3];

      this.cachedData.statesList = this.statesList;
      this.cachedData.contrapartes = this.contrapartes;
      this.cachedData.usuariosResponsables = this.usuariosResponsables;
      this.cachedData.usuariosSolicitantes = this.usuariosSolicitantes;

      this.cacheService.set('Seguimiento de Solicitudes', this.cachedData);

      this.spinnerService.hide();
    } catch (err) {
      console.error(err);
      this.spinnerService.hide();
    }
  }
}
