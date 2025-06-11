import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Utils } from '@speed/common/helpers';
import {
  ICompany,
  ICountry,
  ILocationType,
  IRequestingUser,
  IStatusReport,
  SeguimientoProcesosReporteBean,
} from '@speed/common/interfaces';
import { ILocation } from '@speed/common/interfaces/data-combo.interface';
import { SpinnerOverlayService } from '@speed/common/services';
import { ComboDataService } from '@speed/final-user/common/services';
import { ReportService } from '../../common/services';
import { environment } from '@speed/env/environment';
import { HttpClient } from '@angular/common/http';
import { Table } from 'primeng/table';
import { DialogService } from '@speed/common/dialog';
import { ReportModalComponent } from '@speed/common/modals/report-modal/report-modal.component';
import { WorkflowTabCacheService } from 'src/app/workflow/workflow-tab-cache-service';

@Component({
  selector: 'app-monitoring-open-processes',
  templateUrl: './monitoring-open-processes.component.html',
  styleUrls: ['./monitoring-open-processes.component.scss'],
  providers: [ComboDataService, ReportService],
})
export class MonitoringOpenProcessesComponent implements OnInit {
  public requestForm!: FormGroup;
  public countriesList: Array<ICountry> = [];
  public ubicationTypes: Array<ILocationType> = [];
  public companiesList: Array<ICompany> = [];
  public estadosList: Array<IStatusReport> = [];
  public ubicationsList: Array<ILocation> = [];
  public requestingUserList: Array<IRequestingUser> = [];
  public overlay = false;
  public filterCompanies: Array<ICompany> = [];
  public filterUbicacionesList: Array<ILocation> = [];
  public valueSolicitante = '';
  public valueEstado = '';
  public data: Array<SeguimientoProcesosReporteBean> = [];
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
    this.requestForm = this.fb.group({
      idSolicitanteSP: [null, [Validators.required, Validators.minLength(1)]],
      idCompaniaSP: [0],
      idPais: [0],
      idEstadoSP: [null, [Validators.required, Validators.minLength(1)]],
      tipoUbicacion: [0],
      idUbicacionSP: ['vacio'],
    });
  }

  public ngOnInit(): void {
    try {
      this.recoverData();
    } catch (err) {
      console.error(err);
      this.spinnerService.hide();
    }
  }
  public filterRows(event: Event) {
    const value = (event.target as EventTarget & { value: string }).value;
    this.pTable?.filterGlobal(value, 'contains');
  }
  public changeCountry(event: Event): void {
    const selectedCountry = (event as CustomEvent).detail;
    this.filterCompanies = this.companiesList.filter((company) => company.pais.id === selectedCountry);
    this.cachedData.filterCompanies = this.filterCompanies;
    this.cacheService.set('Seguimiento de Procesos Abiertos', this.cachedData);
    this.requestForm.get('compania')?.setValue(0);
  }

  public changeCompany(event: Event): void {
    const selectedCompany = (event as CustomEvent).detail;
    this.filterUbicacionesList = this.ubicationsList.filter(
      (ubicacion) =>
        ubicacion.tipo_ubicacion.id == this.requestForm.get('tipoUbicacion')?.value && ubicacion.compania.id == selectedCompany,
    );
    this.cachedData.filterUbicacionesList = this.filterUbicacionesList;
    this.cacheService.set('Seguimiento de Procesos Abiertos', this.cachedData);
    this.requestForm.get('idUbicacionSP')?.setValue('vacio');
  }

  public changeTipoUbicacion(event: Event): void {
    const selectedTipoUbicacion = (event as CustomEvent).detail;
    this.filterUbicacionesList = this.ubicationsList.filter(
      (ubicacion) =>
        ubicacion.tipo_ubicacion.id == selectedTipoUbicacion && ubicacion.compania.id == this.requestForm.get('idCompaniaSP')?.value,
    );
    this.cachedData.filterUbicacionesList = this.filterUbicacionesList;
    this.cacheService.set('Seguimiento de Procesos Abiertos', this.cachedData);
    this.requestForm.get('idUbicacionSP')?.setValue('vacio');
  }

  public printReport() {
    Utils.validateAllFields(this.requestForm);
    if (this.requestForm.valid) {
      const params = { ...this.requestForm.value };
      params.idUbicacionSP = params.idUbicacionSP ?? 'vacio';
      params.idCompaniaSP = params.idCompaniaSP ?? 0;
      params.tipoUbicacion = params.tipoUbicacion ?? 0;

      const url = String(
        environment.reporteSeguimientoProcesosAbiertos +
        '&rs:embed=true&rc:parameters=false' +
        (params?.idSolicitanteSP == null ? '' : '&solicitantes=' + params?.idSolicitanteSP) +
        (params?.idCompaniaSP == null ? '' : '&idCompania=' + params?.idCompaniaSP) +
        (params?.idEstadoSP == null ? '' : '&estados=' + params?.idEstadoSP) +
        (params?.idUbicacionSP == null ? '' : '&idUbicacion=' + params?.idUbicacionSP),
      );

      this.dialogService.show({
        component: ReportModalComponent,
        config: {
          data: { url: url },
        },
      });
    }
  }

  public exportReport(format: string) {
    Utils.validateAllFields(this.requestForm);

    if (this.requestForm.valid) {
      const url = String(
        environment.reporteSeguimientoProcesosAbiertos +
        '&rs:Format=' +
        format +
        (this.requestForm.get('idSolicitanteSP')?.value == null
          ? ''
          : '&solicitantes=' + this.requestForm.get('idSolicitanteSP')?.value) +
        (this.requestForm.get('idCompaniaSP')?.value == null ? '' : '&idCompania=' + this.requestForm.get('idCompaniaSP')?.value) +
        (this.requestForm.get('idEstadoSP')?.value == null ? '' : '&estados=' + this.requestForm.get('idEstadoSP')?.value) +
        (this.requestForm.get('idUbicacionSP')?.value == null ? '' : '&idUbicacion=' + this.requestForm.get('idUbicacionSP')?.value),
      );

      this.spinnerService.show();

      this.http.get(url, { responseType: 'blob', observe: 'response' }).subscribe({
        next: (response) => {
          this.spinnerService.hide();
          const blob: Blob = response.body as Blob;
          const a = document.createElement('a');
          a.download = 'reporteSeguimientoProcesosAbiertos.pdf';
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

  public async submit() {
    Utils.validateAllFields(this.requestForm);
    if (this.requestForm.valid) {
      const params = { ...this.requestForm.value };
      params.idUbicacionSP = params.idUbicacionSP ?? 'vacio';
      params.idCompaniaSP = params.idCompaniaSP ?? 0;
      params.tipoUbicacion = params.tipoUbicacion ?? 0;
      this.spinnerService.show();
      this.data = await this.reportService.getReporteSeguimientoProcesos(params);
      this.cachedData.data = this.data;
      this.cacheService.set('Seguimiento de Procesos Abiertos', this.cachedData);
      this.spinnerService.hide();
    }
  }

  public selectedSolicitante(event: Event) {
    const data = (event as CustomEvent).detail;
    if (data == null) {
      this.requestForm.get('idSolicitanteSP')?.setValue([]);
    } else {
      this.requestForm.get('idSolicitanteSP')?.setValue(data);
    }
  }

  public selectedEstado(event: Event) {
    const data = (event as CustomEvent).detail;
    if (data == null) {
      this.requestForm.get('idEstadoSP')?.setValue([]);
    } else {
      this.requestForm.get('idEstadoSP')?.setValue(data);
    }
  }

  public cleanForm() {
    //this.requestForm.get('idEstadoSP')?.setValue([]);
    //this.requestForm.get('idSolicitanteSP')?.setValue([]);
    this.requestForm.reset();
  }

  private async recoverData() {
    this.cachedData = this.cacheService.get('Seguimiento de Procesos Abiertos');
    if (this.cachedData && this.cachedData.countriesList
      && this.cachedData.companiesList
      && this.cachedData.ubicationTypes
      && this.cachedData.ubicationsList
      && this.cachedData.requestingUserList
      && this.cachedData.estadosList
    ) {
      this.countriesList = this.cachedData.countriesList;
      this.companiesList = this.cachedData.companiesList;
      this.ubicationTypes = this.cachedData.ubicationTypes;
      this.ubicationsList = this.cachedData.ubicationsList;
      this.requestingUserList = this.cachedData.requestingUserList;
      this.estadosList = this.cachedData.estadosList;
      if (this.cachedData.data) {
        this.data = this.cachedData.data;
      } if (this.cachedData.filterCompanies) {
        this.filterCompanies = this.cachedData.filterCompanies;
        this.requestForm.get('compania')?.setValue(0);
      } if (this.cachedData.filterUbicacionesList) {
        this.filterUbicacionesList = this.cachedData.filterUbicacionesList;
        this.requestForm.get('idUbicacionSP')?.setValue('vacio');
      }
    } else {
      this.spinnerService.show();
      this.cachedData = {};
      const responses = await Promise.all([
        this.dataService.getCountries(),
        this.dataService.getCompanies(),
        this.dataService.getLocationTypes(),
        this.dataService.getLocations(),
        this.dataService.getRequestingUsers(),
        this.dataService.getStatusProcessReport(),
      ]);
      this.countriesList = responses[0];
      this.companiesList = responses[1];
      this.ubicationTypes = responses[2];
      this.ubicationsList = responses[3];
      this.requestingUserList = responses[4];
      this.estadosList = responses[5];

      this.cachedData.countriesList = this.countriesList;
      this.cachedData.companiesList = this.companiesList;
      this.cachedData.ubicationTypes = this.ubicationTypes;
      this.cachedData.ubicationsList = this.ubicationsList;
      this.cachedData.requestingUserList = this.requestingUserList;
      this.cachedData.estadosList = this.estadosList;

      this.cacheService.set('Seguimiento de Procesos Abiertos', this.cachedData);
      this.spinnerService.hide();
    }
  }
}
