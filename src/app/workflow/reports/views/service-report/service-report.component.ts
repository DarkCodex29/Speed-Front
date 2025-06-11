import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Utils } from '@speed/common/helpers';
import { IArea, ICompany, IContract, ICounterPartBD, ICountry, ILocationType, ReporteServicio } from '@speed/common/interfaces';
import { IContractType, ILocation, IStatusReport } from '@speed/common/interfaces/data-combo.interface';
import { ReportServiceModel } from '@speed/common/models';
import { SpinnerOverlayService } from '@speed/common/services';
import { ComboDataService } from '@speed/final-user/common/services';
import moment from 'moment';
import { ReportService } from '../../common/services';
import { environment } from '@speed/env/environment';
import { HttpClient } from '@angular/common/http';
import { Table } from 'primeng/table';
import { DialogService } from '@speed/common/dialog';
import { ReportModalComponent } from '@speed/common/modals/report-modal/report-modal.component';
import { TabsComponent } from '@speed/common/tabs/components/tabs/tabs.component';
import { WorkflowTabService } from 'src/app/workflow/workflow-tab-service';
import { WorkflowTabCacheService } from 'src/app/workflow/workflow-tab-cache-service';

@Component({
  selector: 'app-service-report',
  templateUrl: './service-report.component.html',
  styleUrls: ['./service-report.component.scss'],
  providers: [ComboDataService, ReportService],
})
export class ServiceReportComponent implements OnInit, AfterViewInit {
  @ViewChild('contractEdit') public editContractTemplate!: TemplateRef<unknown>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public tabsComponent!: TabsComponent;
  public requestForm!: FormGroup;
  public contractSelected!: IContract;
  public tiposUbicaciones: ILocationType[] = [];
  public filterCompanies: Array<ICompany> = [];
  public filterAreas: Array<IArea> = [];
  public countriesList: Array<ICountry> = [];
  public companiesList: Array<ICompany> = [];
  public areasList: Array<IArea> = [];
  public ubicacionesList: Array<ILocation> = [];
  public filterUbicacionesList: Array<ILocation> = [];
  public listCounterpart: Array<ICounterPartBD> = [];
  public listTiposContrato: Array<IContractType> = [];
  public listStatus: Array<IStatusReport> = [];
  public showReporte = false;
  public data: ReporteServicio[] = [];
  @ViewChild('pt') public pTable?: Table;
  cachedData: any;

  public constructor(
    private dialogService: DialogService,
    private spinnerService: SpinnerOverlayService,
    private dataService: ComboDataService,
    private fb: FormBuilder,
    private reportService: ReportService,
    private http: HttpClient,
    private workflowTabService: WorkflowTabService,
    private cacheService: WorkflowTabCacheService

  ) {
    this.requestForm = this.fb.group(new ReportServiceModel());
  }

  public ngOnInit(): void {
    try {
      this.recoverData();
    } catch (err) {
      console.error(err);
      this.spinnerService.hide();
    }
  }

  ngAfterViewInit() {
    this.workflowTabService.tabsComponent$.subscribe((tabsC) => {
      if (tabsC) {
        this.tabsComponent = tabsC;
      }
    });
  }

  public cleanForm() {
    this.requestForm.reset();
    this.requestForm.get('num')?.setValue('');
    this.requestForm.get('idP')?.setValue(0);
    this.requestForm.get('idC')?.setValue(0);
    this.requestForm.get('idA')?.setValue(0);
    this.requestForm.get('tUb')?.setValue(0);
    this.requestForm.get('idU')?.setValue(0);
    this.requestForm.get('idCo')?.setValue(null);
    this.requestForm.get('fVI')?.setValue('');
    this.requestForm.get('fVF')?.setValue('');
    this.requestForm.get('mD')?.setValue(0);
    this.requestForm.get('mH')?.setValue(0);
    this.requestForm.get('idTC')?.setValue(0);
    this.requestForm.get('est')?.setValue(0);
  }
  public selectCounterpart(event: Event) {
    const id = (event as CustomEvent).detail != null ? (event as CustomEvent).detail : '';
    this.requestForm.get('idCo')?.setValue(id);
  }

  public changeCountry(event: Event): void {
    const countrySelected = (event as CustomEvent).detail;

    this.filterCompanies = this.companiesList.filter((company) => company.pais.id === countrySelected);
    this.cachedData.filterCompanies = this.filterCompanies;
    this.cacheService.set('Reporte de Servicio', this.cachedData);

    this.requestForm.get('compania')?.setValue(0);
  }

  public changeCompany(event: Event): void {
    const companySelected = (event as CustomEvent).detail;
    this.filterAreas = this.areasList.filter((area) => area.compania.id === companySelected);
    this.filterUbicacionesList = this.ubicacionesList.filter(
      (ubicacion) => ubicacion.tipo_ubicacion.id == this.requestForm.get('tUb')?.value && ubicacion.compania.id == companySelected,
    );
    this.cachedData.filterAreas = this.filterAreas;
    this.cachedData.filterUbicacionesList = this.filterUbicacionesList;
    this.cacheService.set('Reporte de Servicio', this.cachedData);

    this.requestForm.get('idU')?.setValue(0);
    this.requestForm.get('idA')?.setValue(0);
  }

  public changeTipoUbicacion(event: any): void {
    const tipoUbicacionSelected = (event as CustomEvent).detail;

    this.filterUbicacionesList = this.ubicacionesList.filter(
      (ubicacion) => ubicacion.tipo_ubicacion.id == tipoUbicacionSelected && ubicacion.compania.id == this.requestForm.get('idC')?.value,
    );
    this.cachedData.filterUbicacionesList = this.filterUbicacionesList;
    this.cacheService.set('Reporte de Servicio', this.cachedData);

    if (Number(event.target?.value) > 0) {
      this.requestForm.get('idU')?.setValidators(Validators.min(1));
      this.requestForm.get('idU')?.updateValueAndValidity();
    } else {
      this.requestForm.get('idU')?.clearValidators();
      this.requestForm.get('idU')?.updateValueAndValidity();
    }
    this.requestForm.get('idU')?.setValue(0);
  }

  public isInvalidControl(control: string): boolean {
    return (this.requestForm.get(control)?.invalid && this.requestForm.get(control)?.touched) || false;
  }
  public filterRows(event: Event) {
    const value = (event.target as EventTarget & { value: string }).value;
    this.pTable?.filterGlobal(value, 'contains');
  }
  public async submit() {
    Utils.validateAllFields(this.requestForm);
    if (this.requestForm.valid) {
      const params = { ...this.requestForm.value };
      if (params.fVI != '') {
        params.fVI = moment(params.fVI, 'YYYY-MM-DD').format('DD/MM/YYYY');
      }
      if (params.fVF != '') {
        params.fVF = moment(params.fVF, 'YYYY-MM-DD').format('DD/MM/YYYY');
      }
      params.idCo = params.idCo?.id ?? '';
      params.idP = params.idP ?? 0;
      params.idC = params.idC ?? 0;
      params.idA = params.idA ?? 0;
      params.tUb = params.tUb ?? 0;
      params.idU = params.idU ?? 0;
      params.idTC = params.idTC ?? 0;
      params.est = params.est ?? 0;

      this.spinnerService.show();
      this.data = await this.reportService.getReporteServicios(params);
      this.cachedData.data = this.data;
      this.cacheService.set('Reporte de Servicio', this.cachedData);

      this.spinnerService.hide();
    }
  }
  public exportReport(format: string) {
    Utils.validateAllFields(this.requestForm);

    if (this.requestForm.valid) {
      const url = String(
        environment.reporteServicioSpeed +
        '&rs:Format=' +
        format +
        (this.requestForm.get('idCo')?.value == null ? '' : '&id_cliente=' + this.requestForm.get('idCo')?.value.id) +
        (this.requestForm.get('num')?.value == '' ? '' : '&numero=' + this.requestForm.get('num')?.value) +
        // eslint-disable-next-line max-len
        (this.requestForm.get('fVI')?.value == ''
          ? ''
          : '&vencimientoIni=' + Utils.formatDate(this.requestForm.get('fVI')?.value, 'MM/DD/YYYY')) +
        (this.requestForm.get('fVF')?.value == ''
          ? ''
          : '&vencimientoFin=' + Utils.formatDate(this.requestForm.get('fVF')?.value, 'MM/DD/YYYY')) +
        // eslint-disable-next-line max-len
        (this.requestForm.get('mD')?.value == 0 ? '' : '&montoIni=' + this.requestForm.get('mD')?.value) +
        (this.requestForm.get('mH')?.value == 0 ? '' : '&montoFin=' + this.requestForm.get('mH')?.value) +
        (this.requestForm.get('idTC')?.value == null ? '' : '&tipo_contrato=' + this.requestForm.get('idTC')?.value) +
        (this.requestForm.get('est')?.value == null ? '' : '&estado=' + this.requestForm.get('est')?.value) +
        (this.requestForm.get('idP')?.value == null ? '' : '&pais=' + this.requestForm.get('idP')?.value) +
        (this.requestForm.get('idC')?.value == null ? '' : '&compania=' + this.requestForm.get('idC')?.value) +
        (this.requestForm.get('idA')?.value == null ? '' : '&area=' + this.requestForm.get('idA')?.value) +
        (this.requestForm.get('tUb')?.value == null ? '' : '&tipoUbicacion=' + this.requestForm.get('tUb')?.value) +
        (this.requestForm.get('idU')?.value == null ? '' : '&ubicacion=' + this.requestForm.get('idU')?.value),
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
        environment.reporteServicioSpeed +
        '&rs:embed=true&rc:parameters=false' +
        (this.requestForm.get('idCo')?.value == null ? '' : '&id_cliente=' + this.requestForm.get('idCo')?.value.id) +
        (this.requestForm.get('num')?.value == '' ? '' : '&numero=' + this.requestForm.get('num')?.value) +
        // eslint-disable-next-line max-len
        (this.requestForm.get('fVI')?.value == ''
          ? ''
          : '&vencimientoIni=' + Utils.formatDate(this.requestForm.get('fVI')?.value, 'MM/DD/YYYY')) +
        (this.requestForm.get('fVF')?.value == ''
          ? ''
          : '&vencimientoFin=' + Utils.formatDate(this.requestForm.get('fVF')?.value, 'MM/DD/YYYY')) +
        // eslint-disable-next-line max-len
        (this.requestForm.get('mD')?.value == 0 ? '' : '&montoIni=' + this.requestForm.get('mD')?.value) +
        (this.requestForm.get('mH')?.value == 0 ? '' : '&montoFin=' + this.requestForm.get('mH')?.value) +
        (this.requestForm.get('idTC')?.value == null ? '' : '&tipo_contrato=' + this.requestForm.get('idTC')?.value) +
        (this.requestForm.get('est')?.value == null ? '' : '&estado=' + this.requestForm.get('est')?.value) +
        (this.requestForm.get('idP')?.value == null ? '' : '&pais=' + this.requestForm.get('idP')?.value) +
        (this.requestForm.get('idC')?.value == null ? '' : '&compania=' + this.requestForm.get('idC')?.value) +
        (this.requestForm.get('idA')?.value == null ? '' : '&area=' + this.requestForm.get('idA')?.value) +
        (this.requestForm.get('tUb')?.value == null ? '' : '&tipoUbicacion=' + this.requestForm.get('tUb')?.value) +
        (this.requestForm.get('idU')?.value == null ? '' : '&ubicacion=' + this.requestForm.get('idU')?.value),
      );
      this.dialogService.show({
        component: ReportModalComponent,
        config: {
          data: { url: url },
        },
      });
    }
  }

  public onContractFormSubmit(event: boolean) {
    // close the tab
    this.tabsComponent.closeActiveTab();
    if (event) {
      this.submit();
    }
  }

  public reloadList(event: boolean) {
    // close the tab
    if (event) {
      this.submit();
    }
  }
  public openOtherTab(event: any) {
    const params = { id: event.expediente, code: event.code };
    this.contractSelected = params;
    this.tabsComponent.openTab(`N° ${params.code === null ? '""' : params.code}`, this.editContractTemplate, params, true);
  }
  public openTab(contract: IContract) {
    this.contractSelected = contract;
    this.tabsComponent.openTab(`N° ${contract.code === null ? '""' : contract.code}`, this.editContractTemplate, contract, true);
  }
  private async recoverData() {
    this.cachedData = this.cacheService.get('Reporte de Servicio');
    if (this.cachedData && this.cachedData.countriesList
      && this.cachedData.companiesList
      && this.cachedData.areasList
      && this.cachedData.tiposUbicaciones
      && this.cachedData.ubicacionesList
      && this.cachedData.listCounterpart
      && this.cachedData.listTiposContrato
      && this.cachedData.listStatus
    ) {
      this.countriesList = this.cachedData.countriesList;
      this.companiesList = this.cachedData.companiesList;
      this.areasList = this.cachedData.areasList;
      this.tiposUbicaciones = this.cachedData.tiposUbicaciones;
      this.ubicacionesList = this.cachedData.ubicacionesList;
      this.listCounterpart = this.cachedData.listCounterpart;
      this.listTiposContrato = this.cachedData.listTiposContrato;
      this.listStatus = this.cachedData.listStatus;
      if (this.cachedData.filterCompanies) {
        this.filterCompanies = this.cachedData.filterCompanies;
        this.requestForm.get('compania')?.setValue(0);
      }
      if (this.cachedData.data) {
        this.data = this.cachedData.data;
      } if (this.cachedData.filterUbicacionesList) {
        this.filterUbicacionesList = this.cachedData.filterUbicacionesList;
        this.requestForm.get('idU')?.setValue(0);
      }if (this.cachedData.filterAreas) {
        this.filterAreas = this.cachedData.filterAreas;
        this.requestForm.get('idA')?.setValue(0);
      }
    } else {
      this.spinnerService.show();
      this.cachedData = {};
      const responses = await Promise.all([
        this.dataService.getCountries(),
        this.dataService.getCompanies(),
        this.dataService.getAreas(),
        this.dataService.getLocationTypes(),
        this.dataService.getLocations(),
        this.dataService.getCounterParts(),
        this.dataService.getContractTypes(),
        this.dataService.getStatusReport(),
      ]);
      this.countriesList = responses[0];
      this.companiesList = responses[1];
      this.areasList = responses[2];
      this.tiposUbicaciones = responses[3];
      this.ubicacionesList = responses[4];
      this.listCounterpart = responses[5];
      this.listTiposContrato = responses[6];
      this.listStatus = responses[7];

      this.cachedData.countriesList = this.countriesList;
      this.cachedData.companiesList = this.companiesList;
      this.cachedData.areasList = this.areasList;
      this.cachedData.tiposUbicaciones = this.tiposUbicaciones;
      this.cachedData.ubicacionesList = this.ubicacionesList;
      this.cachedData.listCounterpart = this.listCounterpart;
      this.cachedData.listTiposContrato = this.listTiposContrato;
      this.cachedData.listStatus = this.listStatus;

      this.cacheService.set('Reporte de Servicio', this.cachedData);
      this.spinnerService.hide();
    }
  }
}
