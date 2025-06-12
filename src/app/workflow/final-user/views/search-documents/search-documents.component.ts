import { AfterViewInit, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DialogService } from '@speed/common/dialog';
import { TipoProcesosBD } from '@speed/common/enums/process-type.enum';
import { Utils } from '@speed/common/helpers';
import {
  IAbogadoResponsable,
  IArea,
  ICompany,
  IContract,
  IContractType,
  ICounterPartBD,
  ICountry,
  ILocation,
  ILocationType,
  IProcess,
  IRequestingUser,
  IState,
} from '@speed/common/interfaces';
import { IDocumentoOutput } from '@speed/common/interfaces/output';
import { MessageModalComponent } from '@speed/common/modals';
import { SearchDocumentModel } from '@speed/common/models/searchDocumment.model';
import { SpinnerOverlayService } from '@speed/common/services';
import { TabsComponent } from '@speed/common/tabs/components/tabs/tabs.component';
import { ComboDataService, SearchDocumentExcelService } from '@speed/final-user/common/services';
import { DocumentService } from '@speed/final-user/common/services/document.service';
import { TreeNode } from 'primeng/api';
import { TreeTable } from 'primeng/treetable';
import { Subject, firstValueFrom, take } from 'rxjs';
import { WorkflowTabCacheService } from 'src/app/workflow/workflow-tab-cache-service';
import { WorkflowTabService } from 'src/app/workflow/workflow-tab-service';

@Component({
  selector: 'app-search-documents',
  templateUrl: './search-documents.component.html',
  styleUrls: ['./search-documents.component.scss'],
  providers: [ComboDataService, DocumentService, SearchDocumentExcelService],
})
export class SearchDocumentsComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('contractEdit') public editContractTemplate!: TemplateRef<unknown>;
  @ViewChild('tt') public treeTable?: TreeTable;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public tabsComponent!: TabsComponent;

  public contractSelected!: IContract;
  public countriesList: Array<ICountry> = [];
  public tipoTab = 0;
  public statesList: Array<IState> = [];
  public tipoProceso = 0;
  public tipoSolicitudList: Array<any> = [];
  public filterAreas: Array<IArea> = [];
  public contractTypesList: Array<IContractType> = [];
  public locationTypeList: Array<ILocationType> = [];
  public locationList: Array<ILocation> = [];
  public filterLocationList: Array<ILocation> = [];
  public filterCompanies: Array<ICompany> = [];
  public searchDocumentsForm!: FormGroup;
  public contrapartes: Array<ICounterPartBD> = [];
  public abogadosResponsables: Array<ICounterPartBD> = [];
  public usuariosResponsables: Array<IAbogadoResponsable> = [];
  public usuariosSolicitantes: Array<IRequestingUser> = [];
  public rowsTable: TreeNode<IDocumentoOutput>[] = [];
  public colsTable: unknown[] = [
    { field: 'numeroDocumento', header: 'Número de documento' },
    { field: 'tipoSolicitud', header: 'Tipo de solicitud' },
    { field: 'tipoContrato', header: 'Tipo de contrato' },
    { field: 'sumilla', header: 'Sumilla' },
    { field: 'contraparte', header: 'Contraparte' },
    { field: 'ubicacion', header: 'Ubicación' },
    { field: 'estado', header: 'Estado' },
  ];
  private companiesList: Array<ICompany> = [];
  private areasList: Array<IArea> = [];
  private destroy$: Subject<boolean> = new Subject<boolean>();
  cachedData: any;

  public constructor(
    private dataService: ComboDataService,
    private spinnerService: SpinnerOverlayService,
    private fb: FormBuilder,
    private docService: DocumentService,
    private excelService: SearchDocumentExcelService,
    private dialogService: DialogService,
    private workflowTabService: WorkflowTabService,
    private cacheService: WorkflowTabCacheService,
  ) {
    const form = new SearchDocumentModel();
    this.searchDocumentsForm = this.fb.group({ ...form });
  }

  public async ngOnInit() {
    await this.recoverData();
    // this.chargeData();
  }

  async ngAfterViewInit() {
    this.workflowTabService.tabsComponent$.subscribe((tabsC) => {
      if (tabsC) {
        this.tabsComponent = tabsC;
      }
    });

    // 🔄 Aquí es el momento perfecto para restaurar - todo ya está inicializado
    await this.restoreFromCache();
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  public updateCountry() {
    this.filterCompanies = this.companiesList.filter((company) => company.pais.id === this.searchDocumentsForm.value.idPais);
  }

  public async updateCompany() {
    this.searchDocumentsForm.get(`idArea`)?.setValue(null);
    try {
      const response = await Promise.all([this.dataService.getAreasFilter(this.searchDocumentsForm.get(`idCompania`)?.value)]);
      this.areasList = response[0];
      this.filterAreas = this.areasList;
    } catch (e) {
      console.error(e);
    }
    // this.filterAreas = this.areasList.filter((area) => area.compania.id === Number(event.detail));
    this.filterLocation();
  }

  public updateLocationType() {
    this.filterLocation();
  }

  public async submit() {
    Utils.validateAllFields(this.searchDocumentsForm);
    const params = { ...this.searchDocumentsForm.value };
    if (this.searchDocumentsForm.valid) {
      this.rowsTable = [];
      params.idSolicitante = params.idSolicitante?.id || null;
      params.idRepresentante = params.idRepresentante?.id || null;
      params.idResponsable = params.idResponsable?.id || null;
      params.idContraparte = params.idContraparte?.id || null;
      try {
        this.spinnerService.show();
        const response = await this.docService.findDocuments(params);
        this.rowsTable = response.map((row: IDocumentoOutput) => {
          const { adendas, ...restRow } = row;
          return {
            data: restRow,
            children: adendas?.map((subRow) => ({ data: subRow })),
          };
        });

        this.cachedData.rowsTable = this.rowsTable;
        this.cachedData.searchFormValues = this.searchDocumentsForm.value;
        this.cachedData.filterCompanies = this.filterCompanies;
        this.cachedData.filterAreas = this.filterAreas;
        this.cachedData.filterLocationList = this.filterLocationList;
        this.cacheService.set('Buscar Documentos', this.cachedData);
        console.log('💾 Estado completo guardado en cache');
      } catch (e) {
        console.error(e);
      } finally {
        this.spinnerService.hide();
      }
    }
  }

  // 🔄 Método para esperar que termine el reload y restaurar data
  private async restoreFromCache(): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 100));

    const cached = this.cacheService.get('Buscar Documentos');
    if (cached?.searchFormValues) {
      console.log('🔍 Restaurando filtros y resultados desde cache...', cached.searchFormValues);

      try {
        this.searchDocumentsForm.patchValue(cached.searchFormValues);
        console.log('📝 Formulario actualizado');

        await new Promise((resolve) => setTimeout(resolve, 50));

        if (cached.searchFormValues.idPais) {
          this.updateCountry();
          console.log('🌍 País actualizado');
          await new Promise((resolve) => setTimeout(resolve, 50));
        }

        if (cached.searchFormValues.idCompania) {
          await this.updateCompany();
          console.log('🏢 Empresa actualizada');
          await new Promise((resolve) => setTimeout(resolve, 50));
        }

        if (cached.searchFormValues.tipoUbicacion || cached.searchFormValues.idCompania) {
          this.filterLocation();
          console.log('📍 Ubicación filtrada');
          await new Promise((resolve) => setTimeout(resolve, 50));
        }

        this.searchDocumentsForm.patchValue(cached.searchFormValues);

        if (cached.rowsTable) {
          this.rowsTable = cached.rowsTable;
          console.log('📋 Resultados restaurados:', this.rowsTable.length, 'elementos');
        }

        if (this.cachedData.filterCompanies) {
          this.filterCompanies = this.cachedData.filterCompanies;
        }

        if (this.cachedData.filterAreas) {
          this.filterAreas = this.cachedData.filterAreas;
        }

        if (this.cachedData.filterLocationList) {
          this.filterLocationList = this.cachedData.filterLocationList;
        }

        console.log('✅ Restauración completada exitosamente');
      } catch (error) {
        console.error('❌ Error al restaurar cache:', error);
      }
    } else {
      console.log('ℹ️ No hay filtros guardados para restaurar');
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public openOtherTab(event: any) {
    const params = { id: event.idExpediente, code: event.code, isVerContratoButton: true };
    this.contractSelected = params;
    this.tipoTab = 3;
    this.tabsComponent.openTab(`N° ${params.code === null ? '""' : params.code}`, this.editContractTemplate, params, true);
  }

  public selectContraparte(event: Event) {
    const select = (event as CustomEvent).detail;
    this.searchDocumentsForm.get('idContraparte')?.setValue(select);
  }

  public selectRepresentante(event: Event) {
    const select = (event as CustomEvent).detail;
    this.searchDocumentsForm.get('idRepresentante')?.setValue(select);
  }

  public selectSolicitante(event: Event) {
    const select = (event as CustomEvent).detail;
    this.searchDocumentsForm.get('idSolicitante')?.setValue(select);
  }

  public selectAbogadoResponsable(event: Event) {
    const select = (event as CustomEvent).detail;
    this.searchDocumentsForm.get('idResponsable')?.setValue(select);
  }

  public async onEditDocument(contract: IContract, tipo: string, tipoProceso: number) {
    try {
      const response = await this.docService.validateTipoComponent(contract.id);
      if (response.codigo != 0) {
        this.contractSelected = contract;
        this.tipoTab = response.codigo;
        this.tipoProceso = tipoProceso;
        this.tabsComponent.openTab(`N° ${contract.code === null ? '""' : contract.code}`, this.editContractTemplate, contract, true);
      } else {
        this.dialogService.show({
          component: MessageModalComponent,
          config: {
            data: {
              message: response.nombre || 'Ocurrió un error, intente nuevamente',
            },
          },
        });
      }
      this.spinnerService.show();
    } catch (e) {
      this.dialogService.show({
        component: MessageModalComponent,
        config: {
          data: {
            message: e || 'Ocurrió un error, intente nuevamente',
          },
        },
      });
    } finally {
      this.spinnerService.hide();
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

  public filterRows(event: Event) {
    const value = (event.target as EventTarget & { value: string }).value;
    this.treeTable?.filterGlobal(value, 'contains');
  }

  public resetForm() {
    this.searchDocumentsForm.reset();
    this.searchDocumentsForm.get('tipoSolicitud')?.setValue(-1);
    this.rowsTable = [];
    this.filterCompanies = [];
    this.filterAreas = [];
    this.filterLocationList = [];

    const cached = this.cacheService.get('Buscar Documentos');
    if (cached) {
      delete cached.searchFormValues;
      delete cached.rowsTable;
      delete cached.filterCompanies;
      delete cached.filterAreas;
      delete cached.filterLocationList;
      this.cacheService.set('Buscar Documentos', cached);
      console.log('🧹 Cache de filtros y resultados limpiado');
    }
  }

  public async exportarExcel() {
    Utils.validateAllFields(this.searchDocumentsForm);
    const params = { ...this.searchDocumentsForm.value };
    if (this.searchDocumentsForm.valid) {
      this.rowsTable = [];
      params.idSolicitante = params.idSolicitante?.id || null;
      params.idRepresentante = params.idRepresentante?.id || null;
      params.idResponsable = params.idResponsable?.id || null;
      params.idContraparte = params.idContraparte?.id || null;
      try {
        this.spinnerService.show();
        const response = await this.docService.findDocumentsForExcel(params);
        this.rowsTable = response.map((row: IDocumentoOutput) => {
          const { adendas, ...restRow } = row;
          return {
            data: restRow,
            children: adendas?.map((subRow) => ({ data: subRow })),
          };
        });
        if (this.rowsTable.length > 0) {
          const arreglo: IDocumentoOutput[] = [];
          this.rowsTable.forEach((item) => {
            arreglo.push(item.data as IDocumentoOutput);
            if ((item.children as TreeNode<IDocumentoOutput>[]).length > 0) {
              item.children?.forEach((child) => {
                arreglo.push(child.data as IDocumentoOutput);
              });
            }
          });
          this.excelService.downloadExcel(arreglo);
        }
      } catch (e) {
        console.error(e);
      } finally {
        this.spinnerService.hide();
      }
    }
  }

  private filterLocation() {
    const companiaSelected = this.searchDocumentsForm.value.idCompania;
    const tipoUbicacionSelected = this.searchDocumentsForm.value.tipoUbicacion;

    if (companiaSelected !== undefined && tipoUbicacionSelected !== undefined) {
      this.filterLocationList = this.locationList.filter(
        (item) => item.compania.id === companiaSelected && item.tipo_ubicacion.id === tipoUbicacionSelected,
      );
    }
  }

  private async recoverData() {
    this.cachedData = this.cacheService.get('Buscar Documentos');
    console.log('🔍 Verificando cache existente...', this.cachedData ? 'Encontrado' : 'No encontrado');

    if (
      this.cachedData &&
      this.cachedData.countriesList &&
      this.cachedData.companiesList &&
      this.cachedData.statesList &&
      this.cachedData.areasList &&
      this.cachedData.contractTypesList &&
      this.cachedData.locationTypeList &&
      this.cachedData.locationList &&
      this.cachedData.contrapartes &&
      this.cachedData.abogadosResponsables &&
      this.cachedData.usuariosResponsables &&
      this.cachedData.usuariosSolicitantes &&
      this.cachedData.tipoSolicitudList
    ) {
      console.log('✅ Cache completo encontrado - restaurando datos...');

      this.countriesList = this.cachedData.countriesList;
      this.companiesList = this.cachedData.companiesList;
      this.statesList = this.cachedData.statesList;
      this.areasList = this.cachedData.areasList;
      this.contractTypesList = this.cachedData.contractTypesList;
      this.locationTypeList = this.cachedData.locationTypeList;
      this.locationList = this.cachedData.locationList;
      this.contrapartes = this.cachedData.contrapartes;
      this.abogadosResponsables = this.cachedData.abogadosResponsables;
      this.usuariosResponsables = this.cachedData.usuariosResponsables;
      this.usuariosSolicitantes = this.cachedData.usuariosSolicitantes;
      this.tipoSolicitudList = this.cachedData.tipoSolicitudList;

      this.tipoSolicitudList.push({ id: -1, nombre: 'Todos' });
      this.searchDocumentsForm.get('tipoSolicitud')?.setValue(-1);

      if (this.cachedData.rowsTable) {
        this.rowsTable = this.cachedData.rowsTable;
      }

      if (this.cachedData.filterCompanies) {
        this.filterCompanies = this.cachedData.filterCompanies;
      }

      if (this.cachedData.filterAreas) {
        this.filterAreas = this.cachedData.filterAreas;
      }

      if (this.cachedData.filterLocationList) {
        this.filterLocationList = this.cachedData.filterLocationList;
      }

      console.log('✅ Datos restaurados desde cache - SIN consultas API');
      return;
    }

    console.log('❌ Cache incompleto o inexistente - cargando desde API...');

    try {
      this.spinnerService.show();
      this.cachedData = {};
      console.log('🔄 Ejecutando consultas API...');
      const responses = await Promise.all([
        this.dataService.getCountries(),
        this.dataService.getCompanies(),
        this.dataService.getStates(),
        this.dataService.getAreas(),
        this.dataService.getContractTypes(),
        this.dataService.getLocationTypes(),
        this.dataService.getLocations(),
        this.dataService.getCounterParts(),
        this.dataService.getLegalRepresentatives(),
        this.dataService.getResponsibleLawyers(),
        this.dataService.getRequestingUsers(),
        this.dataService.getProcesosF(TipoProcesosBD.PROCESO_HC),
      ]);
      this.countriesList = responses[0];
      this.companiesList = responses[1];
      this.statesList = responses[2];
      this.areasList = responses[3];
      this.contractTypesList = responses[4];
      this.locationTypeList = responses[5];
      this.locationList = responses[6];
      this.contrapartes = responses[7];
      this.abogadosResponsables = responses[8];
      this.usuariosResponsables = responses[9];
      this.usuariosSolicitantes = responses[10];
      this.tipoSolicitudList = responses[11];

      this.cachedData.countriesList = this.countriesList;
      this.cachedData.companiesList = this.companiesList;
      this.cachedData.statesList = this.statesList;
      this.cachedData.areasList = this.areasList;
      this.cachedData.contractTypesList = this.contractTypesList;
      this.cachedData.locationTypeList = this.locationTypeList;
      this.cachedData.locationList = this.locationList;
      this.cachedData.contrapartes = this.contrapartes;
      this.cachedData.abogadosResponsables = this.abogadosResponsables;
      this.cachedData.usuariosResponsables = this.usuariosResponsables;
      this.cachedData.usuariosSolicitantes = this.usuariosSolicitantes;
      this.cachedData.tipoSolicitudList = this.tipoSolicitudList;

      this.tipoSolicitudList.push({ id: -1, nombre: 'Todos' });
      this.searchDocumentsForm.get('tipoSolicitud')?.setValue(-1);

      this.cacheService.set('Buscar Documentos', this.cachedData);
      console.log('💾 Cache guardado exitosamente - próximas visitas serán instantáneas');

      this.spinnerService.hide();
    } catch (err) {
      console.error('❌ Error al cargar datos:', err);
      this.spinnerService.hide();
    }
  }
}
