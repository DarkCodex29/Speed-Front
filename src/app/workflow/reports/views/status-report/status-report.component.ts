import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Utils } from '@speed/common/helpers';
import { IAbogadoResponsable, IYear, ReporteEstado } from '@speed/common/interfaces';
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
  selector: 'app-status-report',
  templateUrl: './status-report.component.html',
  styleUrls: ['./status-report.component.scss'],
  providers: [ComboDataService, ReportService],
})
export class StatusReportComponent implements OnInit {
  public isLoading = false;
  public requestForm!: FormGroup;
  public responsibleLawyerList: IAbogadoResponsable[] = [];
  public anios: IYear[] = [];
  public data: Array<ReporteEstado> = [];
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
      idResponsable: [''],
      anio: [''],
    });
  }

  public ngOnInit(): void {
    try {
      this.recoverData();
    } catch (err) {
      console.error(err);
    } finally {
      this.isLoading = false;
      this.spinnerService.hide();
    }
  }

  public cleanForm() {
    this.requestForm.reset();
  }
  public filterRows(event: Event) {
    const value = (event.target as EventTarget & { value: string }).value;
    this.pTable?.filterGlobal(value, 'contains');
  }
  public exportReport(format: string) {
    Utils.validateAllFields(this.requestForm);

    if (this.requestForm.valid) {
      const url = String(
        environment.reporteEstadosSolicitud +
        '&rs:Format=' +
        format +
        (this.requestForm.get('anio')?.value == null ? '' : '&anio=' + this.requestForm.get('anio')?.value) +
        (this.requestForm.get('idResponsable')?.value == null ? '' : '&idResponsable=' + this.requestForm.get('idResponsable')?.value),
      );

      this.spinnerService.show();

      this.http.get(url, { responseType: 'blob', observe: 'response' }).subscribe({
        next: (response) => {
          this.spinnerService.hide();
          const blob: Blob = response.body as Blob;
          const a = document.createElement('a');
          a.download = 'reporteEstados.pdf';
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
        environment.reporteEstadosSolicitud +
        '&rs:embed=true&rc:parameters=false' +
        (this.requestForm.get('anio')?.value == null ? '' : '&anio=' + this.requestForm.get('anio')?.value) +
        (this.requestForm.get('idResponsable')?.value == null ? '' : '&idResponsable=' + this.requestForm.get('idResponsable')?.value),
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
    try {
      if (this.requestForm.valid) {
        this.spinnerService.show();
        const params = { ...this.requestForm.value };
        params.idResponsable = params.idResponsable.id ?? '';
        this.data = await this.reportService.getReporteEstadosR4(params);
        this.cachedData.data = this.data;
        this.cacheService.set('Reporte estados', this.cachedData);
        this.spinnerService.hide();
      }
    } catch (err) {
      this.spinnerService.hide();
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public selectResponsibleLawyer(event: Event) {
    const id = (event as CustomEvent).detail != null ? (event as CustomEvent).detail : '';
    this.requestForm.get('idResponsable')?.setValue(id);
  }

  public isInvalidControl(control: string): boolean {
    return (this.requestForm.get(control)?.invalid && this.requestForm.get(control)?.touched) || false;
  }
  public changeYear(event: Event): void {
    const countrySelected = (event as CustomEvent).detail;

    this.requestForm.get('compania')?.setValue(0);
  }
  private async recoverData() {
    this.cachedData = this.cacheService.get('Reporte estados');
    if (this.cachedData && this.cachedData.anios
      && this.cachedData.responsibleLawyerList) {
      this.anios = this.cachedData.anios;
      this.responsibleLawyerList = this.cachedData.responsibleLawyerList;
      this.requestForm.get('anio')?.setValue(this.anios[this.anios.length - 1].year);
      if (this.cachedData.data) {
        this.data = this.cachedData.data;
      }
    } else {
      try {
        this.isLoading = true;
        this.spinnerService.show();
        this.cachedData = {};
        this.anios = (await this.dataService.getAnios()).map((anio) => {
          return { year: String(anio) };
        });
        this.responsibleLawyerList = await this.dataService.getResponsibleLawyers();
        this.requestForm.get('anio')?.setValue(this.anios[this.anios.length - 1].year);

        this.cachedData.anios = this.anios;
        this.cachedData.responsibleLawyerList = this.responsibleLawyerList;

        this.cacheService.set('Reporte estados', this.cachedData);
        this.isLoading = false;
      } catch (err) {
        console.error(err);
        this.isLoading = false;
      }
    }
  }
}
