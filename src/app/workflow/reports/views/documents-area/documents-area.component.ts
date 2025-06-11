import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Utils } from '@speed/common/helpers';
import { DocumentoArea, IAreaUser, ITipoDocumento } from '@speed/common/interfaces';
import { DocumentoAreaModel } from '@speed/common/models';
import { SpinnerOverlayService } from '@speed/common/services';
import { ComboDataService } from '@speed/final-user/common/services';
import { ReportService } from '../../common/services';
import { HttpClient } from '@angular/common/http';
import { environment } from '@speed/env/environment';
import { Table } from 'primeng/table';
import { DialogService } from '@speed/common/dialog';
import { ReportModalComponent } from '@speed/common/modals/report-modal/report-modal.component';
import { WorkflowTabCacheService } from 'src/app/workflow/workflow-tab-cache-service';

@Component({
  selector: 'app-documents-area',
  templateUrl: './documents-area.component.html',
  styleUrls: ['./documents-area.component.scss'],
  providers: [ComboDataService, ReportService],
})
export class DocumentsAreaComponent implements OnInit {
  public isLoading = false;
  public requestForm!: FormGroup;
  public areasCreacion: IAreaUser[] = [];
  public areasActual: IAreaUser[] = [];
  public tiposDocumento: ITipoDocumento[] = [];
  public documentosAreaFilter: DocumentoArea[] = [];
  @ViewChild('pt') public pTable?: Table;
  cachedData: any;

  public estadosList = [
    {
      id: 'X',
      nombre: 'Archivado',
    },
    {
      id: 'G',
      nombre: 'Guardado',
    },
    {
      id: 'R',
      nombre: 'Registrado',
    },
    {
      id: 'Q',
      nombre: 'Por Enviar',
    },
  ];
  public constructor(
    private dialogService: DialogService,
    private dataService: ComboDataService,
    private fb: FormBuilder,
    private spinnerService: SpinnerOverlayService,
    private reportService: ReportService,
    private http: HttpClient,
    private cacheService: WorkflowTabCacheService
  ) {
    this.requestForm = this.fb.group(new DocumentoAreaModel());
  }
  public filterRows(event: Event) {
    const value = (event.target as EventTarget & { value: string }).value;
    this.pTable?.filterGlobal(value, 'contains');
  }
  public ngOnInit(): void {
    try {
      this.initCombos();
    } catch (err) {
      console.error(err);
    } finally {
      this.isLoading = false;
      this.spinnerService.hide();
    }
  }

  public cleanForm() {
    this.requestForm.reset();
    this.requestForm.get('numeroExpediente')?.setValue('');
  }

  public exportReport(format: string) {
    Utils.validateAllFields(this.requestForm);

    if (this.requestForm.valid) {
      const url = String(
        environment.reporteDocumentosArea +
        '&rs:Format=' +
        format +
        (this.requestForm.get('idAreaCreacion')?.value == null ? '' : '&idArea=' + this.requestForm.get('idAreaCreacion')?.value) +
        (this.requestForm.get('idTipoDocumento')?.value == null
          ? ''
          : '&id_tipo_documento=' + this.requestForm.get('idTipoDocumento')?.value) +
        // eslint-disable-next-line max-len
        (this.requestForm.get('fechaInicio')?.value == null
          ? ''
          : '&fechaInicio=' + Utils.formatDate(this.requestForm.get('fechaInicio')?.value, 'MM/DD/YYYY')) +
        (this.requestForm.get('numeroExpediente')?.value == '' ? '' : '&numero=' + this.requestForm.get('numeroExpediente')?.value) +
        (this.requestForm.get('idAreaActual')?.value == null ? '' : '&idAreaActual=' + this.requestForm.get('idAreaActual')?.value) +
        (this.requestForm.get('estado')?.value == null ? '' : '&estado=' + this.requestForm.get('estado')?.value) +
        // eslint-disable-next-line max-len
        (this.requestForm.get('fechaFin')?.value == null
          ? ''
          : '&fechaFin=' + Utils.formatDate(this.requestForm.get('fechaFin')?.value, 'MM/DD/YYYY')),
      );

      this.spinnerService.show();

      this.http.get(url, { responseType: 'blob', observe: 'response' }).subscribe({
        next: (response) => {
          this.spinnerService.hide();
          const blob: Blob = response.body as Blob;
          const a = document.createElement('a');
          a.download = 'reporteDocumentosArea.pdf';
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
        environment.reporteDocumentosArea +
        '&rs:embed=true&rc:parameters=false' +
        (this.requestForm.get('idAreaCreacion')?.value == null ? '' : '&idArea=' + this.requestForm.get('idAreaCreacion')?.value) +
        (this.requestForm.get('idTipoDocumento')?.value == null
          ? ''
          : '&id_tipo_documento=' + this.requestForm.get('idTipoDocumento')?.value) +
        // eslint-disable-next-line max-len
        (this.requestForm.get('fechaInicio')?.value == null
          ? ''
          : '&fechaInicio=' + Utils.formatDate(this.requestForm.get('fechaInicio')?.value, 'MM/DD/YYYY')) +
        (this.requestForm.get('numeroExpediente')?.value == '' ? '' : '&numero=' + this.requestForm.get('numeroExpediente')?.value) +
        (this.requestForm.get('idAreaActual')?.value == null ? '' : '&idAreaActual=' + this.requestForm.get('idAreaActual')?.value) +
        (this.requestForm.get('estado')?.value == null ? '' : '&estado=' + this.requestForm.get('estado')?.value) +
        // eslint-disable-next-line max-len
        (this.requestForm.get('fechaFin')?.value == null
          ? ''
          : '&fechaFin=' + Utils.formatDate(this.requestForm.get('fechaFin')?.value, 'MM/DD/YYYY')),
      );
      this.dialogService.show({
        component: ReportModalComponent,
        config: {
          data: { url: url },
        },
      });
    }
  }
  public async submit() {
    Utils.validateAllFields(this.requestForm);

    if (this.requestForm.valid) {
      this.spinnerService.show();
      const params = { ...this.requestForm.value };
      params.idAreaCreacion = params.idAreaCreacion ?? 0;
      params.idAreaActual = params.idAreaActual ?? 0;
      params.estado = params.estado ?? 0;
      params.idTipoDocumento = params.idTipoDocumento ?? 0;
      this.documentosAreaFilter = await this.reportService.getReportDocumentByArea(params);
      this.cachedData.documentosAreaFilter = this.documentosAreaFilter;
      this.cacheService.set('Documentos por Area', this.cachedData);
      this.spinnerService.hide();
    }
  }

  private async initCombos() {
    this.cachedData = this.cacheService.get('Documentos por Area');
    if (this.cachedData && this.cachedData.areasCreacion &&
      this.cachedData.tiposDocumento) {
      this.areasCreacion = this.cachedData.areasCreacion;
      this.areasActual = this.areasCreacion;
      this.tiposDocumento = this.cachedData.tiposDocumento;
      if (this.cachedData.documentosAreaFilter) {
        this.documentosAreaFilter = this.cachedData.documentosAreaFilter;
      }
    } else {
      try {
        this.isLoading = true;
        this.spinnerService.show();
        this.cachedData = {};
        this.areasCreacion = await this.dataService.getAreasReporte();
        this.cachedData.areasCreacion = this.areasCreacion;
        this.areasActual = this.areasCreacion;
        this.tiposDocumento = await this.dataService.getTiposDocumentos();
        this.cachedData.tiposDocumento = this.tiposDocumento;

        this.cacheService.set('Documentos por Area', this.cachedData);
      } catch (err) {
        console.error(err);
      }
    }
  }
}
