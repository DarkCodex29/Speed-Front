import { AfterViewInit, Component, Input, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ICompany, IContract, ICounterPartBD, ICountry, IProcess, IState } from '@speed/common/interfaces';
import { SpinnerOverlayService } from '@speed/common/services';
import { TabsComponent } from '@speed/common/tabs/components/tabs/tabs.component';
import { ComboDataService, InboxService, PendingExcelService } from '@speed/final-user/common/services';
import { Subject, takeUntil } from 'rxjs';
import { ISearchResponsePending } from './common/interfaces';
import { Table } from 'primeng/table';
import { WorkflowTabService } from 'src/app/workflow/workflow-tab-service';
import { WorkflowTabCacheService } from 'src/app/workflow/workflow-tab-cache-service';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.scss'],
  providers: [ComboDataService, InboxService, PendingExcelService],
})
export class PendingComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() public countriesList: ICountry[] = [];
  @Input() public companiesList: ICompany[] = [];
  @Input() public counterpartsList: ICounterPartBD[] = [];
  @Input() public statesList: IState[] = [];
  @Input() public processesList: IProcess[] = [];
  @Input() public tablePending: ISearchResponsePending[] = [];
  public contractSelected!: IContract;
  public filterCompanies: Array<ICompany> = [];
  public overlay = false;
  public counterpartsListTemporal: ICounterPartBD[] = [];
  public destroy$: Subject<boolean> = new Subject<boolean>();
  public pendingForm = this.fb.group({
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
  public contracts = [
    {
      id: 100,
      code: '1013-0102',
    },
  ];
  @ViewChild('pt') public pTable?: Table;

  public constructor(
    private dataService: ComboDataService,
    private spinnerService: SpinnerOverlayService,
    private fb: FormBuilder,
    private inboxService: InboxService,
    private excelService: PendingExcelService,
    private workflowTabService: WorkflowTabService,
    private cacheService: WorkflowTabCacheService,
  ) {}

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
      numero: this.pendingForm.value.numero,
      compania: this.pendingForm.value.compania || '',
      contraparte: this.pendingForm.value.contraparte || '',
      sumilla: this.pendingForm.value.sumilla,
      estado: this.pendingForm.value.estado || '',
      proceso: this.pendingForm.value.proceso || '',
      usuario: '447',
    };

    this.tablePending = [];
    this.inboxService
      .obtenerMisPendientes(params)
      .pipe(takeUntil(this.destroy$))
      .subscribe((items) => {
        this.tablePending = items;
        const cachedData = this.cacheService.get('Mis Pendientes');
        cachedData.tablePending = this.tablePending;
        this.cacheService.set('Mis Pendientes', cachedData);
        this.spinnerService.hide();
      });
  }

  public seleccionarPais(event: Event) {
    const value = (event as CustomEvent).detail;
    this.pendingForm.get('pais')?.setValue(value);
    this.pendingForm.get('compania')?.setValue(null);
    this.filterCompanies = this.companiesList.filter((company) => company.pais.id === value);
  }

  public seleccionarCompania(event: Event) {
    const value = (event as CustomEvent).detail;
    this.pendingForm.get('compania')?.setValue(value);
  }

  public seleccionarContraparte(event: Event) {
    const value = (event as CustomEvent).detail;
    this.pendingForm.get('contraparte')?.setValue(value);
  }

  public seleccionarEstado(event: Event) {
    const value = (event as CustomEvent).detail;
    this.pendingForm.get('estado')?.setValue(value);
  }

  public seleccionarProceso(event: Event) {
    const value = (event as CustomEvent).detail;
    this.pendingForm.get('proceso')?.setValue(value);
  }

  public onEdit(contract: IContract) {
    this.contractSelected = contract;
    this.tabsComponent.openTab(`N° ${contract.code || ''}`, this.editContractTemplate, contract, true);
  }

  public onCloseTab(event: boolean) {
    // close the tab
    this.tabsComponent.closeActiveTab();
    if (event) {
      this.onSubmit();
    }
  }

  public reloadList(event: boolean) {
    // close the tab
    if (event) {
      this.onSubmit();
    }
  }

  public filterRows(event: Event) {
    const value = (event.target as EventTarget & { value: string }).value;
    this.pTable?.filterGlobal(value, 'contains');
  }
  public openOtherTab(event: any) {
    const params = { id: event.idExpediente, code: event.code, isVerContratoButton: true };
    this.contractSelected = params;
    this.tabsComponent.openTab(`N° ${params.code === null ? '""' : params.code}`, this.editContractTemplate, params, true);
  }
  public exportarExcel() {
    if (this.tablePending.length > 0) {
      this.excelService.downloadExcel(this.tablePending);
    }
  }

  private showData() {
    this.counterpartsListTemporal = this.counterpartsList.map((elem) => {
      elem.razonSocial = elem.razonSocial || '';
      return elem;
    });
  }
}
