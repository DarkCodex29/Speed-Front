import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Utils } from '@speed/common/helpers';
import { DocumentoPorResponsable, IAbogadoResponsable } from '@speed/common/interfaces';
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
  selector: 'app-pending-tray-status',
  templateUrl: './pending-tray-status.component.html',
  styleUrls: ['./pending-tray-status.component.scss'],
  providers: [ComboDataService, ReportService],
})
export class PendingTrayStatusComponent implements OnInit {
  public isLoading = false;
  public requestForm!: FormGroup;
  public responsibleLawyerList: IAbogadoResponsable[] = [];
  public data: Array<DocumentoPorResponsable> = [];
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
      idAbogadoResponsable: [''],
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
  public filterRows(event: Event) {
    const value = (event.target as EventTarget & { value: string }).value;
    this.pTable?.filterGlobal(value, 'contains');
  }
  public cleanForm() {
    this.requestForm.reset();
    this.requestForm.get('idAbogadoResponsable')?.setValue('');
  }

  public exportReport(format: string) {
    Utils.validateAllFields(this.requestForm);

    if (this.requestForm.valid) {
      const url = String(
        environment.reporteEstadoBandejaPendientes +
        '&rs:Format=' +
        format +
        // eslint-disable-next-line max-len
        (this.requestForm.get('idAbogadoResponsable')?.value == null
          ? ''
          : '&idAbogadoResponsable=' + this.requestForm.get('idAbogadoResponsable')?.value),
      );

      this.spinnerService.show();

      this.http.get(url, { responseType: 'blob', observe: 'response' }).subscribe({
        next: (response) => {
          this.spinnerService.hide();
          const blob: Blob = response.body as Blob;
          const a = document.createElement('a');
          a.download = 'reporteEstadoBandejaPendientes.pdf';
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
        environment.reporteEstadoBandejaPendientes +
        '&rs:embed=true&rc:parameters=false' +
        // eslint-disable-next-line max-len
        (this.requestForm.get('idAbogadoResponsable')?.value == null
          ? ''
          : '&idAbogadoResponsable=' + this.requestForm.get('idAbogadoResponsable')?.value),
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
    // eslint-disable-next-line no-console
    Utils.validateAllFields(this.requestForm);
    if (this.requestForm.valid) {
      this.spinnerService.show();
      if (this.requestForm.get('idAbogadoResponsable')?.value == '') {
        this.data = await this.reportService.getReporteDocumentoLegalPorAbogadoResponsable(null);
      } else {
        this.data = await this.reportService.getReporteDocumentoLegalPorAbogadoResponsable({
          idAbogadoResponsable: this.requestForm.value.idAbogadoResponsable.id,
        });
      }
      this.cachedData.data = this.data;
      this.cacheService.set('Estado de bandeja de pendientes', this.cachedData);
      this.spinnerService.hide();
    }
  }

  public selectResponsibleLawyer(event: Event) {
    const id = (event as CustomEvent).detail != null ? (event as CustomEvent).detail : '';
    this.requestForm.get('idAbogadoResponsable')?.setValue(id);
  }

  public isInvalidControl(control: string): boolean {
    return (this.requestForm.get(control)?.invalid && this.requestForm.get(control)?.touched) || false;
  }

  private async recoverData() {
    this.cachedData = this.cacheService.get('Estado de bandeja de pendientes');
    if (this.cachedData && this.cachedData.responsibleLawyerList) {
      this.responsibleLawyerList = this.cachedData.responsibleLawyerList;
      if (this.cachedData.data) {
        this.data = this.cachedData.data;
      }
    } else {
      try {
        this.isLoading = true;
        this.spinnerService.show();
        this.cachedData = {};
        this.responsibleLawyerList = await this.dataService.getResponsibleLawyers();

        this.cachedData.responsibleLawyerList = this.responsibleLawyerList;

        this.cacheService.set('Estado de bandeja de pendientes', this.cachedData);
        this.isLoading = false;
      } catch (err) {
        console.error(err);
        this.isLoading = false;
      }
    }
  }
}

