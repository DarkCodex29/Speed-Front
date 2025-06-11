import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Utils } from '@speed/common/helpers';
import { IAreaUser, IProcess, ISede, ITipoDocumento, IUsuarioCombo, ReporteExpedienteArea } from '@speed/common/interfaces';
import { ExpedienteAreaModel } from '@speed/common/models';
import { SpinnerOverlayService } from '@speed/common/services';
import { ComboDataService } from '@speed/final-user/common/services';
import { ReportService } from '../../common/services';
import { Table } from 'primeng/table';
import { environment } from '@speed/env/environment';
import { HttpClient } from '@angular/common/http';
import { DialogService } from '@speed/common/dialog';
import { ReportModalComponent } from '@speed/common/modals/report-modal/report-modal.component';
import { WorkflowTabCacheService } from 'src/app/workflow/workflow-tab-cache-service';

@Component({
  selector: 'app-files-area',
  templateUrl: './files-area.component.html',
  styleUrls: ['./files-area.component.scss'],
  providers: [ComboDataService, ReportService],
})
export class FilesAreaComponent implements OnInit {
  public isLoading = false;
  public requestForm!: FormGroup;
  public areasCreacion: IAreaUser[] = [];
  public areasDestino: IAreaUser[] = [];
  public tiposDocumento: ITipoDocumento[] = [];
  public procesos: IProcess[] = [];
  public sedesOrigen: ISede[] = [];
  public sedesDestino: ISede[] = [];
  public usuarios: IUsuarioCombo[] = [];
  public usuariosActual: IUsuarioCombo[] = [];
  public data: ReporteExpedienteArea[] = [];
  public estados = [
    { id: 'X', nombre: 'Archivado' },
    { id: 'G', nombre: 'Guardado' },
    { id: 'R', nombre: 'Registrado' },
    { id: 'Q', nombre: 'Por Enviar' },
  ];

  @ViewChild('pt') public pTable?: Table;
  cachedData: any;

  public constructor(
    private dialogService: DialogService,
    private dataService: ComboDataService,
    private fb: FormBuilder,
    private spinnerService: SpinnerOverlayService,
    private reportService: ReportService,
    private http: HttpClient,
    private cacheService: WorkflowTabCacheService
  ) {
    this.initForm();
  }

  public initForm() {
    this.requestForm = this.fb.group(new ExpedienteAreaModel());
  }

  public cleanForm() {
    this.requestForm.reset();
    this.requestForm.get('fechaUltDerivacion')?.setValue('');
    this.requestForm.get('numeroExpediente')?.setValue('');
  }

  public exportReport(format: string) {
    Utils.validateAllFields(this.requestForm);

    if (this.requestForm.valid) {
      const url = String(
        environment.reporteExpedientesArea +
        '&rs:Format=' +
        format +
        (this.requestForm.get('areaCreadora')?.value == null ? '' : '&areaCreadora=' + this.requestForm.get('areaCreadora')?.value) +
        (this.requestForm.get('idUsuario')?.value == null ? '' : '&usuario=' + this.requestForm.get('idUsuario')?.value) +
        (this.requestForm.get('numeroExpediente')?.value == '' ? '' : '&expediente=' + this.requestForm.get('numeroExpediente')?.value) +
        (this.requestForm.get('sedeOrigen')?.value == null ? '' : '&sedeOrigen=' + this.requestForm.get('sedeOrigen')?.value) +
        // eslint-disable-next-line max-len
        (this.requestForm.get('fechaInicio')?.value == null
          ? ''
          : '&fechaInicio=' + Utils.formatDate(this.requestForm.get('fechaInicio')?.value, 'MM/DD/YYYY')) +
        (this.requestForm.get('idUsuarioFinal')?.value == null ? '' : '&usuarioFinal=' + this.requestForm.get('idUsuarioFinal')?.value) +
        (this.requestForm.get('areaDestino')?.value == null ? '' : '&areaDestino=' + this.requestForm.get('areaDestino')?.value) +
        (this.requestForm.get('idProceso')?.value == null ? '' : '&idProceso=' + this.requestForm.get('idProceso')?.value) +
        (this.requestForm.get('estado')?.value == null ? '' : '&estado=' + this.requestForm.get('estado')?.value) +
        (this.requestForm.get('sedeDestino')?.value == null ? '' : '&sedeDestino=' + this.requestForm.get('sedeDestino')?.value) +
        // eslint-disable-next-line max-len
        (this.requestForm.get('fechaFin')?.value == null
          ? ''
          : '&fechaFin=' + Utils.formatDate(this.requestForm.get('fechaFin')?.value, 'MM/DD/YYYY')) +
        // eslint-disable-next-line max-len
        (this.requestForm.get('fechaUltDerivacion')?.value == ''
          ? ''
          : '&fechaUltDerivacion=' + Utils.formatDate(this.requestForm.get('fechaUltDerivacion')?.value, 'MM/DD/YYYY')),
      );

      this.spinnerService.show();

      this.http.get(url, { responseType: 'blob', observe: 'response' }).subscribe({
        next: (response) => {
          this.spinnerService.hide();
          const blob: Blob = response.body as Blob;
          const a = document.createElement('a');
          a.download = 'reporteExpedientesArea.pdf';
          a.href = window.URL.createObjectURL(blob);
          a.click();
        },
        error: (e) => {
          this.spinnerService.hide();
          console.error(e);
        },
      });
    }
  }
  public openPrintModal() {
    Utils.validateAllFields(this.requestForm);

    if (this.requestForm.valid) {
      const url = String(
        environment.reporteExpedientesArea +
        '&rs:embed=true&rc:parameters=false' +
        (this.requestForm.get('areaCreadora')?.value == null ? '' : '&areaCreadora=' + this.requestForm.get('areaCreadora')?.value) +
        (this.requestForm.get('idUsuario')?.value == null ? '' : '&usuario=' + this.requestForm.get('idUsuario')?.value) +
        (this.requestForm.get('numeroExpediente')?.value == '' ? '' : '&expediente=' + this.requestForm.get('numeroExpediente')?.value) +
        (this.requestForm.get('sedeOrigen')?.value == null ? '' : '&sedeOrigen=' + this.requestForm.get('sedeOrigen')?.value) +
        // eslint-disable-next-line max-len
        (this.requestForm.get('fechaInicio')?.value == null
          ? ''
          : '&fechaInicio=' + Utils.formatDate(this.requestForm.get('fechaInicio')?.value, 'MM/DD/YYYY')) +
        (this.requestForm.get('idUsuarioFinal')?.value == null ? '' : '&usuarioFinal=' + this.requestForm.get('idUsuarioFinal')?.value) +
        (this.requestForm.get('areaDestino')?.value == null ? '' : '&areaDestino=' + this.requestForm.get('areaDestino')?.value) +
        (this.requestForm.get('idProceso')?.value == null ? '' : '&idProceso=' + this.requestForm.get('idProceso')?.value) +
        (this.requestForm.get('estado')?.value == null ? '' : '&estado=' + this.requestForm.get('estado')?.value) +
        (this.requestForm.get('sedeDestino')?.value == null ? '' : '&sedeDestino=' + this.requestForm.get('sedeDestino')?.value) +
        // eslint-disable-next-line max-len
        (this.requestForm.get('fechaFin')?.value == null
          ? ''
          : '&fechaFin=' + Utils.formatDate(this.requestForm.get('fechaFin')?.value, 'MM/DD/YYYY')) +
        // eslint-disable-next-line max-len
        (this.requestForm.get('fechaUltDerivacion')?.value == ''
          ? ''
          : '&fechaUltDerivacion=' + Utils.formatDate(this.requestForm.get('fechaUltDerivacion')?.value, 'MM/DD/YYYY')),
      );
      this.dialogService.show({
        component: ReportModalComponent,
        config: {
          data: { url: url },
        },
      });
    }
  }
  public filterRows(event: Event) {
    const value = (event.target as EventTarget & { value: string }).value;
    this.pTable?.filterGlobal(value, 'contains');
  }

  public ngOnInit(): void {
    try {
      this.initData();
    } catch (err) {
      console.error(err);
    } finally {
      this.isLoading = false;
      this.spinnerService.hide();
    }
  }

  public async submit() {
    Utils.validateAllFields(this.requestForm);
    if (this.requestForm.valid) {
      this.spinnerService.show();
      const params = { ...this.requestForm.value };
      params.idUsuario = params.idUsuario ?? 0;
      params.idProceso = params.idProceso ?? 0;
      params.areaDestino = params.areaDestino ?? 0;
      params.estado = params.estado ?? 0;
      params.areaCreadora = params.areaCreadora ?? 0;
      params.sedeOrigen = params.sedeOrigen ?? 0;
      params.sedeDestino = params.sedeDestino ?? 0;
      params.idUsuarioFinal = params.idUsuarioFinal ?? 0;

      this.data = await this.reportService.getReporteExpedienteArea(params);
      this.cachedData.data = this.data;
      this.cacheService.set('Expedientes por Area', this.cachedData);
      this.spinnerService.hide();
    }
  }

  private async initData() {
    this.cachedData = this.cacheService.get('Expedientes por Area');
    if (this.cachedData && this.cachedData.areasCreacion &&
      this.cachedData.tiposDocumento &&
      this.cachedData.procesos &&
      this.cachedData.usuarios &&
      this.cachedData.sedesDestino) {
      this.areasCreacion = this.cachedData.areasCreacion;
      this.areasDestino = this.areasCreacion;
      this.tiposDocumento = this.cachedData.tiposDocumento;
      this.procesos = this.cachedData.procesos;
      this.usuarios = this.cachedData.usuarios;
      this.usuariosActual = this.usuarios;
      this.sedesDestino = this.cachedData.sedesDestino;
      this.sedesOrigen = this.sedesDestino;
      if (this.cachedData.data) {
        this.data = this.cachedData.data;
      }
    } else {
      try {
        this.isLoading = true;
        this.spinnerService.show();
        this.cachedData = {};
        this.areasCreacion = await this.dataService.getAreasReporte();
        this.areasDestino = this.areasCreacion;
        this.tiposDocumento = await this.dataService.getTiposDocumentos();
        this.procesos = await this.dataService.getProcesosActivos();
        this.usuarios = await this.dataService.getUsuariosActivos();
        this.usuariosActual = this.usuarios;
        this.sedesDestino = await this.dataService.getSedes();
        this.sedesOrigen = this.sedesDestino;

        this.cachedData.areasCreacion = this.areasCreacion;
        this.cachedData.tiposDocumento = this.tiposDocumento;
        this.cachedData.procesos = this.procesos;
        this.cachedData.usuarios = this.usuarios;
        this.cachedData.sedesDestino = this.sedesDestino;

        this.cacheService.set('Expedientes por Area', this.cachedData);
      } catch (err) {
        console.error(err);
      }
    }
  }
}

