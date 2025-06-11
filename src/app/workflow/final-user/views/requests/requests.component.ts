import { AfterViewInit, Component, Input, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ICompany, IContract, ICounterPartBD, ICountry, IProcess, IState } from '@speed/common/interfaces';
import { SpinnerOverlayService } from '@speed/common/services';
import { TabsComponent } from '@speed/common/tabs/components/tabs/tabs.component';
import { ComboDataService, InboxService, RequestsExcelService } from '@speed/final-user/common/services';
import { Table } from 'primeng/table';
import { Subject, takeUntil } from 'rxjs';
import { WorkflowTabCacheService } from 'src/app/workflow/workflow-tab-cache-service';
import { WorkflowTabService } from 'src/app/workflow/workflow-tab-service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss'],
  providers: [ComboDataService, InboxService, RequestsExcelService],
})
export class RequestsComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() public countriesList: ICountry[] = [];
  @Input() public companiesList: ICompany[] = [];
  @Input() public counterpartsList: ICounterPartBD[] = [];
  @Input() public statesList: IState[] = [];
  @Input() public processesList: IProcess[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() public tableRequests: any;
  public contractSelected!: IContract;
  public filterCompanies: Array<ICompany> = [];
  public overlay = false;
  public counterpartsListTemporal: ICounterPartBD[] = [];
  public unsubscribe$: Subject<boolean> = new Subject<boolean>();
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
  public contracts = [
    {
      id: 100,
      code: '1013-0102',
    },
  ];

  public constructor(
    private spinnerService: SpinnerOverlayService,
    private fb: FormBuilder,
    private inboxService: InboxService,
    private excelService: RequestsExcelService,
    private workflowTabService: WorkflowTabService,
    private cacheService: WorkflowTabCacheService,
  ) {}

  public ngOnInit() {
    this.showData();
    // this.chargeData();
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

  public ngAfterViewInit() {
    this.workflowTabService.tabsComponent$.subscribe((tabsC) => {
      if (tabsC) {
        this.tabsComponent = tabsC;
      }
    });
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
      usuario: '',
    };

    this.tableRequests = [];

    this.inboxService
      .obtenerMisSolicitudes(params)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((items) => {
        this.tableRequests = items;
        const cachedData = this.cacheService.get('Mis Solicitudes');
        cachedData.tableRequests = this.tableRequests;
        this.cacheService.set('Mis Solicitudes', cachedData);
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

  public onEdit(contract: IContract) {
    this.contractSelected = contract;
    this.tabsComponent.openTab(`N° ${contract.code || ''}`, this.editContractTemplate, contract, true);
  }
  public openOtherTab(event: any) {
    const params = { id: event.idExpediente, code: event.code, isVerContratoButton: true };
    this.contractSelected = params;
    this.tabsComponent.openTab(`N° ${params.code === null ? '""' : params.code}`, this.editContractTemplate, params, true);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  public reloadList(event: boolean) {
    // close the tab
    if (event) {
      this.onSubmit();
    }
  }
  private showData() {
    this.counterpartsListTemporal = this.counterpartsList.map((elem) => {
      elem.razonSocial = elem.razonSocial || '';
      return elem;
    });
  }
}
