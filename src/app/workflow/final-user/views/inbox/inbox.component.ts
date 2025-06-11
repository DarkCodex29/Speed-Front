import { AfterViewInit, Component, Input, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ICompany, ICounterPartBD, ICountry, IProcess, IState, ITabModel } from '@speed/common/interfaces';
import { SpinnerOverlayService } from '@speed/common/services';
import { InboxExcelService, InboxService } from '@speed/final-user/common/services';
import { Subject, takeUntil } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { TabsComponent } from '@speed/common/tabs/components/tabs/tabs.component';
import { ISearchResponseInbox } from './common/interfaces';
import { Utils } from '@speed/common/helpers';
import { Table } from 'primeng/table';
import { WorkflowTabService } from 'src/app/workflow/workflow-tab-service';
import { WorkflowTabCacheService } from 'src/app/workflow/workflow-tab-cache-service';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss'],
  providers: [InboxService, InboxExcelService],
})
export class InboxComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() public countriesList: ICountry[] = [];
  @Input() public companiesList: ICompany[] = [];
  @Input() public counterpartsList: ICounterPartBD[] = [];
  @Input() public statesList: IState[] = [];
  @Input() public processesList: IProcess[] = [];
  @Input() public tableInbox: ISearchResponseInbox[] = [];
  public contractSelected!: ITabModel;
  public filterCompanies: ICompany[] = [];
  public overlay = false;
  public counterpartsListTemporal: ICounterPartBD[] = [];
  public destroy$: Subject<boolean> = new Subject<boolean>();
  public inboxForm = this.fb.group({
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
    private spinnerService: SpinnerOverlayService,
    private fb: FormBuilder,
    private inboxService: InboxService,
    private excelService: InboxExcelService,
    private workflowTabService: WorkflowTabService,
    private cacheService: WorkflowTabCacheService,
  ) {}

  public ngOnInit() {

    this.showData();
  }

  public ngAfterViewInit() {
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
      numero: this.inboxForm.value.numero,
      compania: this.inboxForm.value.compania || '',
      contraparte: this.inboxForm.value.contraparte || '',
      sumilla: this.inboxForm.value.sumilla,
      estado: this.inboxForm.value.estado || '',
      proceso: this.inboxForm.value.proceso || '',
      usuario: '',
      fecha: Utils.formatDate(new Date(), 'yyyy-MM-DD'),
      pais: '',
    };
    this.tableInbox = [];

    this.inboxService
      .obtenerBandejaEntrada(params)
      .pipe(takeUntil(this.destroy$))
      .subscribe((items) => {
        this.tableInbox = items;
        const cachedData = this.cacheService.get('Bandeja de Entrada');
        cachedData.tableInbox = this.tableInbox;
        this.cacheService.set('Bandeja de Entrada', cachedData);
        this.spinnerService.hide();
      });
  }

  public seleccionarPais(event: Event) {
    const value = (event as CustomEvent).detail;
    this.inboxForm.get('pais')?.setValue(value);
    this.inboxForm.get('compania')?.setValue(null);
    this.filterCompanies = this.companiesList.filter((company) => company.pais.id === value);
  }

  public seleccionarCompania(event: Event) {
    const value = (event as CustomEvent).detail;
    this.inboxForm.get('compania')?.setValue(value);
  }

  public seleccionarContraparte(event: Event) {
    const value = (event as CustomEvent).detail;
    this.inboxForm.get('contraparte')?.setValue(value);
  }

  public seleccionarEstado(event: Event) {
    const value = (event as CustomEvent).detail;
    this.inboxForm.get('estado')?.setValue(value);
  }

  public seleccionarProceso(event: Event) {
    const value = (event as CustomEvent).detail;
    this.inboxForm.get('proceso')?.setValue(value);
  }

  public onEdit(contract: ITabModel) {
    this.contractSelected = contract;
    this.tabsComponent.openTab(`N° ${contract.code || ''}`, this.editContractTemplate, contract, true);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public openOtherTab(event: any) {
    const params = { id: event.idExpediente, code: event.code, isVerContratoButton: true };
    this.contractSelected = params;
    this.tabsComponent.openTab(`N° ${params.code || ''}`, this.editContractTemplate, params, true);
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

  public exportarExcel() {
    if (this.tableInbox.length > 0) {
      this.excelService.downloadExcel(this.tableInbox);
    }
  }

  private showData() {
    this.counterpartsListTemporal = this.counterpartsList.map((elem) => {
      elem.razonSocial = elem.razonSocial || '';
      return elem;
    });
  }
}
