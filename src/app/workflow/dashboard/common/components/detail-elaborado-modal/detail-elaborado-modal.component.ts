import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TipoProcesosBD } from '@speed/common/enums/process-type.enum';
import { Utils } from '@speed/common/helpers';
import { ICompany, ICounterPartBD, ICountry, ISimplifiedArea, IState } from '@speed/common/interfaces';
import { IDocumentoSearchDashOutput } from '@speed/common/interfaces/output';
import { SearchDocumentModel } from '@speed/common/models';
import { SpinnerOverlayService } from '@speed/common/services';
import { ComboDataService, DocumentService, SearchDocumentExcelService } from '@speed/final-user/common/services';
import { TreeNode } from 'primeng/api';
import { Subject } from 'rxjs';
import { ISolicitudesGeneralesElaborado } from '../../interfaces';

@Component({
  selector: 'app-detail-elaborado-modal',
  templateUrl: './detail-elaborado-modal.component.html',
  styleUrls: ['./detail-elaborado-modal.component.scss'],
  providers: [ComboDataService, DocumentService, SearchDocumentExcelService],
})
export class DetailElaboradoModalComponent implements OnInit, OnDestroy {
  @Input() public valSelectDetailModal = 0;
  @Input() public dataSolicitudesGeneralesElaborado: ISolicitudesGeneralesElaborado[] = [];
  @Input() public flagPracticante = false;
  @Output() public closeModal = new EventEmitter<void>();

  public countriesList: Array<ICountry> = [];
  public statesList: Array<IState> = [];
  public tipoSolicitudList: Array<any> = [];
  public filterAreas: Array<ISimplifiedArea> = [];
  public filterCompanies: Array<ICompany> = [];
  public searchDocumentsForm!: FormGroup;
  public contrapartes: Array<ICounterPartBD> = [];
  public rowsTable: TreeNode<IDocumentoSearchDashOutput>[] = [];
  public dataTable: IDocumentoSearchDashOutput[] = [];
  public colsTable: any[] = [
    { field: 'numeroDocumento', header: 'Número de documento' },
    { field: 'proceso', header: 'Proceso' },
    { field: 'area', header: 'Área' },
    { field: 'contraparte', header: 'Contraparte' },
    { field: 'fechaSolicitud', header: 'Fecha de Solicitud' },
  ];
  public isModalOpenElaboradoDetail = 'Texto de prueba';
  public titleDetails = '';
  private companiesList: Array<ICompany> = [];
  private destroy$: Subject<boolean> = new Subject<boolean>();

  public constructor(
    private dataService: ComboDataService,
    private spinnerService: SpinnerOverlayService,
    private fb: FormBuilder,
    private docService: DocumentService,
    private excelService: SearchDocumentExcelService,
  ) {
    const form = new SearchDocumentModel();
    this.searchDocumentsForm = this.fb.group({ ...form });
  }

  public setTitle(): string {
    const titleSearch = this.dataSolicitudesGeneralesElaborado.find((solicitud) => solicitud.idUbicacion === this.valSelectDetailModal);
    return titleSearch ? titleSearch.ubicacion : '';
  }

  public async ngOnInit() {
    this.titleDetails = this.setTitle();
    await this.recoverData();
    this.submit();
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  public async recoverData() {
    try {
      this.spinnerService.show();
      const responses = await Promise.all([
        this.dataService.getCountries(),
        this.dataService.getCompanies(),
        this.dataService.getStates(),
        this.dataService.getCounterParts(),
        this.dataService.getProcesosF(TipoProcesosBD.PROCESO_HC),
      ]);
      this.countriesList = responses[0];
      this.companiesList = responses[1];
      this.statesList = responses[2];
      this.contrapartes = responses[3];
      this.tipoSolicitudList = responses[4];

      this.tipoSolicitudList.push({ id: -1, nombre: 'Todos' });
      this.searchDocumentsForm.get('tipoSolicitud')?.setValue(-1);

      // Asignar valor predeterminado después de cargar estados
      this.searchDocumentsForm.get('estado')?.setValue('D');
      this.spinnerService.hide();
    } catch (err) {
      console.error(err);
    }
  }

  public updateCountry() {
    this.filterCompanies = this.companiesList.filter((company) => company.pais.id === this.searchDocumentsForm.value.idPais);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public updateCompany() {}

  public async submit() {
    Utils.validateAllFields(this.searchDocumentsForm);
    const params = { ...this.searchDocumentsForm.value };
    if (this.searchDocumentsForm.valid) {
      this.rowsTable = [];
      params.idSolicitante = params.idSolicitante?.id || null;
      params.idRepresentante = params.idRepresentante?.id || null;
      params.idResponsable = params.idResponsable?.id || null;
      params.idContraparte = params.idContraparte?.id || null;
      params.idUbicacion = this.valSelectDetailModal;
      if (this.flagPracticante) {
        params.flagPracticante = this.flagPracticante;
      }
      try {
        this.spinnerService.show();
        const response = await this.docService.findDocumentsDashboard(params);
        this.dataTable = response;
        this.rowsTable = response.map((row: IDocumentoSearchDashOutput) => ({ data: row }));
      } catch (e) {
        console.error(e);
      } finally {
        this.spinnerService.hide();
      }
    }
  }

  public selectContraparte(event: Event) {
    const select = (event as CustomEvent).detail;
    this.searchDocumentsForm.get('idContraparte')?.setValue(select);
  }

  public reloadList(event: boolean) {
    if (event) {
      this.submit();
    }
  }

  public async exportarExcel() {
    if (this.dataTable.length > 0) {
      this.excelService.downloadExcelDashboard(this.dataTable);
    }
  }

  public closeModalD() {
    this.closeModal.emit();
  }
}
