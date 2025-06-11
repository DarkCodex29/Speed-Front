import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Utils } from '@speed/common/helpers';
import { AlarmaContrato, IAbogadoResponsable, IArea, ICompany, ICounterPartBD, ICountry } from '@speed/common/interfaces';
import { AlarmaContratoModel } from '@speed/common/models';
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
  selector: 'app-contracts-alarms',
  templateUrl: './contracts-alarms.component.html',
  styleUrls: ['./contracts-alarms.component.scss'],
  providers: [ComboDataService, ReportService],
})
export class ContractsAlarmsComponent implements OnInit {
  public isLoading = false;
  public requestForm!: FormGroup;
  public countriesList: Array<ICountry> = [];
  private areasList: Array<IArea> = [];
  public companiesList: Array<ICompany> = [];
  public responsibleLawyerList: IAbogadoResponsable[] = [];
  public contrapartes: Array<ICounterPartBD> = [];
  public filterCompanies: Array<ICompany> = [];
  public data: Array<AlarmaContrato> = [];
  public filterAreas: Array<IArea> = [];
  @ViewChild('pt') public pTable?: Table;
  cachedData: any;

  public constructor(
    private dialogService: DialogService,
    private dataService: ComboDataService,
    private spinnerService: SpinnerOverlayService,
    private fb: FormBuilder,
    private reportService: ReportService,
    private http: HttpClient,
    private cacheService: WorkflowTabCacheService
  ) {
    const form = new AlarmaContratoModel();
    this.requestForm = this.fb.group({ ...form });
  }

  public async ngOnInit(): Promise<void> {
    await this.recoverData();
  }
  public filterRows(event: Event) {
    const value = (event.target as EventTarget & { value: string }).value;
    this.pTable?.filterGlobal(value, 'contains');
  }
  public cleanForm() {
    this.requestForm.reset();
    this.requestForm.get('numeroContrato')?.setValue('');
  }

  public exportReport(format: string) {
    Utils.validateAllFields(this.requestForm);

    if (this.requestForm.valid) {
      const url = String(
        environment.reporteAlarmaSolicitud +
        '&rs:Format=' +
        format +
        // eslint-disable-next-line max-len
        (this.requestForm.get('abogadoResponsableIdAC')?.value == null
          ? ''
          : '&idResponsable=' + this.requestForm.get('abogadoResponsableIdAC')?.value.id) +
        (this.requestForm.get('numeroContrato')?.value == '' ? '' : '&numeroContrato=' + this.requestForm.get('numeroContrato')?.value) +
        (this.requestForm.get('idCompania')?.value == null ? '' : '&idCompania=' + this.requestForm.get('idCompania')?.value) +
        // eslint-disable-next-line max-len
        (this.requestForm.get('fecInicio')?.value == null
          ? ''
          : '&fecInicio=' + Utils.formatDate(this.requestForm.get('fecInicio')?.value, 'MM/DD/YYYY')) +
        // eslint-disable-next-line max-len
        (this.requestForm.get('fecFin')?.value == null
          ? ''
          : '&fecFin=' + Utils.formatDate(this.requestForm.get('fecFin')?.value, 'MM/DD/YYYY')),
      );

      this.spinnerService.show();

      this.http.get(url, { responseType: 'blob', observe: 'response' }).subscribe({
        next: (response) => {
          this.spinnerService.hide();
          const blob: Blob = response.body as Blob;
          const a = document.createElement('a');
          a.download = 'reporteAlarmaSolicitud.pdf';
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

  public openModalPrint() {
    Utils.validateAllFields(this.requestForm);

    if (this.requestForm.valid) {
      const url = String(
        environment.reporteAlarmaSolicitud +
        '&rs:embed=true&rc:parameters=false' +
        // eslint-disable-next-line max-len
        (this.requestForm.get('abogadoResponsableIdAC')?.value == null
          ? ''
          : '&idResponsable=' + this.requestForm.get('abogadoResponsableIdAC')?.value.id) +
        (this.requestForm.get('numeroContrato')?.value == '' ? '' : '&numeroContrato=' + this.requestForm.get('numeroContrato')?.value) +
        (this.requestForm.get('idCompania')?.value == null ? '' : '&idCompania=' + this.requestForm.get('idCompania')?.value) +
        // eslint-disable-next-line max-len
        (this.requestForm.get('fecInicio')?.value == null
          ? ''
          : '&fecInicio=' + Utils.formatDate(this.requestForm.get('fecInicio')?.value, 'MM/DD/YYYY')) +
        // eslint-disable-next-line max-len
        (this.requestForm.get('fecFin')?.value == null
          ? ''
          : '&fecFin=' + Utils.formatDate(this.requestForm.get('fecFin')?.value, 'MM/DD/YYYY')),
      );

      this.dialogService.show({
        component: ReportModalComponent,
        config: {
          data: { url: url },
        },
      });
    }
  }

  public selectContraparte(event: Event) {
    const select = (event as CustomEvent).detail;
    this.requestForm.get('idContraparte')?.setValue(select);
  }

  public async updateCompany() {
    this.requestForm.get(`idArea`)?.setValue(null);
    try {
      const response = await Promise.all([this.dataService.getAreasFilter(this.requestForm.get(`idCompania`)?.value)]);
      this.areasList = response[0];
      this.filterAreas = this.areasList;
      this.cachedData.areasList = this.areasList;
      this.cacheService.set('Alarmas de Contrato', this.cachedData);

    } catch (e) {
      console.error(e);
    }
    // this.filterAreas = this.areasList.filter((area) => area.compania.id === Number(event.detail));
  }

  public async submit() {
    Utils.validateAllFields(this.requestForm);
    const params = { ...this.requestForm.value };
    if (this.requestForm.valid) {
      this.data = [];
      params.abogadoResponsableIdAC = params.abogadoResponsableIdAC?.id ?? '';
      params.idContraparte = params.idContraparte?.id == null ? 0 : params.idContraparte.id;
      params.idCompania = params.idCompania == null ? 0 : params.idCompania;
      params.idArea = params.idArea == null ? 0 : params.idArea;
      try {
        this.spinnerService.show();
        this.data = await this.reportService.getReporteAlarmaContratos(params);
        this.cachedData.data = this.data;
        this.cacheService.set('Alarmas de Contrato', this.cachedData);

        this.spinnerService.hide();
      } catch (e) {
        console.error(e);
      } finally {
        this.spinnerService.hide();
      }
    }
  }

  public selectResponsibleLawyer(event: Event) {
    const id = (event as CustomEvent).detail;
    this.requestForm.get('abogadoResponsableIdAC')?.setValue(id);
  }

  public isInvalidControl(control: string): boolean {
    return (this.requestForm.get(control)?.invalid && this.requestForm.get(control)?.touched) || false;
  }

  private async recoverData() {
    this.cachedData = this.cacheService.get('Alarmas de Contratos');
    if (this.cachedData && this.cachedData.responsibleLawyerList &&
      this.cachedData.contrapartes &&
      this.cachedData.companiesList) {
      this.responsibleLawyerList = this.cachedData.responsibleLawyerList;
      this.contrapartes = this.cachedData.contrapartes;
      this.companiesList = this.cachedData.companiesList;
      this.filterCompanies = this.companiesList.filter((company) => company.pais.id === 5);
      if (this.cachedData.data) {
        this.data = this.cachedData.data;
      } if (this.cachedData.areasList) {
        this.areasList = this.cachedData.areasList;
        this.filterAreas = this.areasList;
      }
    } else {
      try {
        this.spinnerService.show();
        this.cachedData = {};
        const responses = await Promise.all([
          this.dataService.getResponsibleLawyers(),
          this.dataService.getCounterParts(),
          this.dataService.getCompanies(),
        ]);
        this.responsibleLawyerList = responses[0];
        this.contrapartes = responses[1];
        this.companiesList = responses[2];

        this.filterCompanies = this.companiesList.filter((company) => company.pais.id === 5);

        this.cachedData.responsibleLawyerList = this.responsibleLawyerList;
        this.cachedData.contrapartes = this.contrapartes;
        this.cachedData.companiesList = this.companiesList;

        this.cacheService.set('Alarmas de Contrato', this.cachedData);
        this.spinnerService.hide();
      } catch (err) {
        console.error(err);
        this.spinnerService.hide();
      }
    }
  }
}
