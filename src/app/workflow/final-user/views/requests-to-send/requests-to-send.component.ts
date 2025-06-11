import { AfterViewInit, Component, Input, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ICompany, IContract, ICounterPartBD, ICountry, IProcess, IState } from '@speed/common/interfaces';
import { SpinnerOverlayService } from '@speed/common/services';
import { TabsComponent } from '@speed/common/tabs/components/tabs/tabs.component';
import { ComboDataService, InboxService, RequestsToSendExcelService } from '@speed/final-user/common/services';
import { Subject, takeUntil } from 'rxjs';
import { ISearchResponseRequestsToSend } from './common/interfaces';
import { Table } from 'primeng/table';
import { WorkflowTabService } from 'src/app/workflow/workflow-tab-service';

@Component({
  selector: 'app-requests-to-send',
  templateUrl: './requests-to-send.component.html',
  styleUrls: ['./requests-to-send.component.scss'],
  providers: [ComboDataService, InboxService, RequestsToSendExcelService],
})
export class RequestsToSendComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() public countriesList: ICountry[] = [];
  @Input() public companiesList: ICompany[] = [];
  @Input() public counterpartsList: ICounterPartBD[] = [];
  @Input() public statesList: IState[] = [];
  @Input() public processesList: IProcess[] = [];
  @Input() public tableRequests: ISearchResponseRequestsToSend[] = [];
  public idProceso?: number;
  public idExpediente?: number;
  public contractSelected!: IContract;
  public filterCompanies: Array<ICompany> = [];
  public overlay = false;
  public counterpartsListTemporal: ICounterPartBD[] = [];
  public destroy$: Subject<boolean> = new Subject<boolean>();
  public requestsForm = this.fb.group({
    numero: [''],
    pais: [''],
    compania: [''],
    contraparte: [''],
    sumilla: [''],
    estado: [''],
    proceso: [''],
  });

  @ViewChild('contractEdit') public editContractTemplate!: TemplateRef<unknown>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public tabsComponent!: TabsComponent;
  @ViewChild('pt') public pTable?: Table;

  public constructor(
    private dataService: ComboDataService,
    private spinnerService: SpinnerOverlayService,
    private fb: FormBuilder,
    private inboxService: InboxService,
    private excelService: RequestsToSendExcelService,
    private workflowTabService: WorkflowTabService
  ) { }

  public ngOnInit() {
    this.showData();
    // this.chargeData();
  }
  ngAfterViewInit() {
    this.workflowTabService.tabsComponent$.subscribe((tabsC) => {
      if (tabsC) {
        this.tabsComponent = tabsC;
      }
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  public onSubmit() {
    this.spinnerService.show();

    const params = {
      numero: this.requestsForm.value.numero,
      compania: this.requestsForm.value.compania || '',
      contraparte: this.requestsForm.value.contraparte || '',
      sumilla: this.requestsForm.value.sumilla,
      estado: this.requestsForm.value.estado || '',
      proceso: this.requestsForm.value.proceso || '',
      usuario: null,
    };

    this.tableRequests = [];
    this.inboxService
      .obtenerSolicitudesPorEnviar(params)
      .pipe(takeUntil(this.destroy$))
      .subscribe((items) => {
        this.tableRequests = items;
        this.spinnerService.hide();
      });
  }

  public seleccionarPais(event: Event) {
    const value = (event as CustomEvent).detail;
    this.requestsForm.get('pais')?.setValue(value);
    this.requestsForm.get('compania')?.setValue(null);
    this.filterCompanies = this.companiesList.filter((company) => company.pais.id === value);
  }

  public seleccionarCompania(event: Event) {
    const value = (event as CustomEvent).detail;
    this.requestsForm.get('compania')?.setValue(value);
  }

  public seleccionarContraparte(event: Event) {
    const value = (event as CustomEvent).detail;
    this.requestsForm.get('contraparte')?.setValue(value);
  }

  public seleccionarEstado(event: Event) {
    const value = (event as CustomEvent).detail;
    this.requestsForm.get('estado')?.setValue(value);
  }

  public seleccionarProceso(event: Event) {
    const value = (event as CustomEvent).detail;
    this.requestsForm.get('proceso')?.setValue(value);
  }

  public onEdit(contract: IContract, idProceso: number) {
    this.contractSelected = contract;
    this.idProceso = idProceso;
    this.tabsComponent.openTab(`N° ${contract.code || ''}`, this.editContractTemplate, contract, true);
  }

  public onCloseTab(event: boolean) {
    // close the tab
    this.tabsComponent.closeActiveTab();
    if (event) {
      this.onSubmit();
    }
  }

  public filterRows(event: Event) {
    const value = (event.target as EventTarget & { value: string }).value;
    this.pTable?.filterGlobal(value, 'contains');
  }

  public exportarExcel() {
    if (this.tableRequests.length > 0) {
      this.excelService.downloadExcel(this.tableRequests);
    }
  }

  private showData() {
    this.counterpartsListTemporal = this.counterpartsList.map((elem) => {
      elem.razonSocial = elem.razonSocial || '';
      return elem;
    });
  }
}
