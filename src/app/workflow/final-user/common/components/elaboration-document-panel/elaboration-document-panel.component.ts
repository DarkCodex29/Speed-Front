import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormArray, FormGroup, Validators } from '@angular/forms';
import { ProcessType } from '@speed/common/enums';
import {
  IArea,
  ICompany,
  IContractFilter,
  IContractInfo,
  ICounterPartBD,
  ICountry,
  IExploration,
  IMoneda,
  IOffice,
  IOperation,
  IProject,
  IResponseContractData,
  IUbicacion,
} from '@speed/common/interfaces';
import { ComboDataService, RegisterRequestService } from '../../services';
import { Subject, debounceTime, distinctUntilChanged, of, switchMap, takeUntil } from 'rxjs';
import { LocationModel } from '@speed/common/models';
import { setLegalRepresentativeModel } from '@speed/common/helpers';
import { SpinnerOverlayService } from '@speed/common/services';
import { DocumentService } from '../../services/document.service';

@Component({
  selector: 'ui-elaboration-document-panel',
  templateUrl: './elaboration-document-panel.component.html',
  styleUrls: ['./elaboration-document-panel.component.scss'],
  providers: [ComboDataService, DocumentService, RegisterRequestService],
})
export class ElaborationDocumentPanelComponent implements OnInit, OnDestroy {
  @Input() public edocumentForm!: FormGroup;
  @Input() public processType: ProcessType = ProcessType.CONTRATO;
  @Input() public countriesList: Array<ICountry> = [];
  @Input() public companiesList: Array<ICompany> = [];
  @Input() public areasList: Array<IArea> = [];
  @Input() public counterpartList: Array<ICounterPartBD> = [];
  @Input() public flagDataAdenda = false;
  @Input() public data: IResponseContractData | null = null;
  @Input() public disableInputs = false;
  @Input() public contractInfo?: IContractInfo;
  @Output() public changeDocumentTypeOutput = new EventEmitter();
  public overlay = false;
  public readonly enumProcessType = ProcessType;
  public filterCompanies: Array<ICompany> = [];
  public filterAreas: Array<IArea> = [];
  public filterOperations: Array<IOperation> = [];
  public filterOffices: Array<IOffice> = [];
  public filterProjects: Array<IProject> = [];
  public filterContracts: Array<IContractFilter> = [];
  public filterExplorations: Array<IExploration> = [];
  public isLoading = false;
  public minDate = '2023-07-28';
  public initDate: Date = new Date();
  public aplicaFechaFin = false;
  public labelMonto = 'Monto Fijo';
  public monedasList: Array<IMoneda> = [];
  public pais: ICountry | null = null;
  public compania: ICompany | null = null;
  private unsubscribe: Subject<void>;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  public codAdendaUnilateral = '56';

  public constructor(
    private dataService: ComboDataService,
    private spinnerService: SpinnerOverlayService,
    private registerService: RegisterRequestService,
  ) {
    this.unsubscribe = new Subject();
  }

  public async ngOnInit() {
    this.pais = this.data?.paises.find((item) => item.id == this.data?.idPais) || null;
    this.compania = this.data?.companias.find((item) => item.id == this.data?.idCompania) || null;
    if (this.flagDataAdenda) {
      if (this.edocumentForm.get('aplicaFechaFin')?.value) {
        this.aplicaFechaFin = true;
      }
    }
    await this.recoverData();
    this.initCombos();
    this.initForm();
    this.changeAplicaFechaFin();
    this.changeAplicaAdelanto();
    this.changeAplicaModalidadPago();
    this.changeIndefinido();
    this.changeAplicaPeriodicidad();
    this.changeAplicaRenovacionAutomatica();
    this.edocumentForm.get('aplicaFechaFin')?.valueChanges.subscribe((value) => {
      this.aplicaFechaFin = value;
    });
    this.edocumentForm
      .get('aplicaModalidadPago')
      ?.valueChanges.pipe(takeUntil(this.unsubscribe))
      .subscribe((value) => {
        if (value == false) {
          this.edocumentForm.get('montoFijoTotalEstimado')?.patchValue(0.0);
          this.edocumentForm.get('montoFijoTotalEstimado')?.disable();
        } else {
          this.edocumentForm.get('montoFijoTotalEstimado')?.enable();
        }
      });
  }

  public initForm() {
    if (this.processType == ProcessType.CONTRATO) {
      if (this.edocumentForm.get('aplicaModalidadPago')?.value != true) {
        this.edocumentForm.get('montoFijoTotalEstimado')?.disable();
      } else {
        this.edocumentForm.get('montoFijoTotalEstimado')?.enable();
      }
      this.edocumentForm.get('montoAdelanto')?.disable();
      this.edocumentForm.get('periodicidadPago')?.disable();
      this.edocumentForm.get('periodoRenovar')?.disable();
    }
  }
  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public changeCountry(event: any): void {
    this.filterCompanies = this.companiesList.filter((company) => company.pais.id === Number(event.target?.value));
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public changeCompany(event: any): void {
    this.filterAreas = this.areasList.filter((area) => area.compania.id === Number(event.target?.value));
    this.getLocations(event.target?.value);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public changePaymentMethod(event: any) {
    if (event.target.value === 'esPrecioUnitario') {
      this.edocumentForm.get('esPrecioFijo')?.setValue(false);
      this.edocumentForm.get('esPrecioUnitario')?.setValue(true);
      this.labelMonto = 'Monto Total Unitario';
    } else {
      this.edocumentForm.get('esPrecioFijo')?.setValue(true);
      this.edocumentForm.get('esPrecioUnitario')?.setValue(false);
      this.labelMonto = 'Monto Fijo';
    }
  }

  public async addLocation(label: string) {
    const location = this.edocumentForm.get(label)?.value;

    if (location) {
      let object: IOperation | IOffice | IProject | IExploration | undefined;
      switch (label) {
        case 'idOperacion':
          object = this.filterOperations.find((operation) => operation.id === Number(location));
          break;
        case 'idOficina':
          object = this.filterOffices.find((office) => office.id === Number(location));
          break;
        case 'idProyecto':
          object = this.filterProjects.find((project) => project.id === Number(location));
          break;
        case 'exploracion': {
          if (typeof location === 'string' && this.edocumentForm.get('idCompania')?.value !== null) {
            object = await this.registerExploration(location);
          } else {
            object = location;
          }
          break;
        }
        default:
          break;
      }

      const locationModel = this.setLocationModel(object);
      const index = (this.edocumentForm.get('ubicaciones') as FormArray).value.findIndex(
        (x: IUbicacion) => x.idUbicacion == locationModel.idUbicacion.value,
      );
      if (index === -1) {
        (this.edocumentForm.get('ubicaciones') as FormArray).push(new FormGroup({ ...locationModel }));
      }
      this.edocumentForm.get(label)?.setValue(null);
    }
  }

  public changeAplicaFechaFin() {
    if (this.edocumentForm.get('tipoDocumento')?.value == this.codAdendaUnilateral) {
      this.edocumentForm.get('aplicaFechaFin')?.setValue(true);
    }

    if (this.edocumentForm.get('aplicaFechaFin')?.value == false) {
      this.edocumentForm.get('fechaFin')?.clearValidators();

      this.edocumentForm.get('fechaFin')?.patchValue(null);
      this.edocumentForm.get('fechaFin')?.disable();
      this.aplicaFechaFin = false;
    } else {
      this.edocumentForm.get('fechaFin')?.enable();
      this.aplicaFechaFin = true;
      this.edocumentForm.get('fechaFin')?.addValidators(Validators.required);
    }
  }

  public changeAplicaAdelanto() {
    if (this.edocumentForm.get('aplicaAdelanto')?.value == false) {
      this.edocumentForm.get('montoAdelanto')?.patchValue(0.0);
      this.edocumentForm.get('montoAdelanto')?.disable();
    } else {
      this.edocumentForm.get('montoAdelanto')?.enable();
    }
  }

  public changeAplicaRenovacionAutomatica() {
    if (this.edocumentForm.get('aplicaRenovacionAutomatica')?.value == false) {
      this.edocumentForm.get('periodoRenovar')?.patchValue(0.0);
      this.edocumentForm.get('periodoRenovar')?.disable();
    } else {
      this.edocumentForm.get('periodoRenovar')?.enable();
    }
  }

  public changeAplicaPeriodicidad() {
    if (this.edocumentForm.get('aplicaPeriodicidad')?.value == false) {
      this.edocumentForm.get('periodicidadPago')?.patchValue('');
      this.edocumentForm.get('periodicidadPago')?.disable();
    } else {
      this.edocumentForm.get('periodicidadPago')?.enable();
    }
  }

  public changeAplicaModalidadPago() {
    if (this.edocumentForm.get('aplicaModalidadPago')?.value == false) {
      this.edocumentForm.get('montoFijoTotalEstimado')?.patchValue(0.0);
      this.edocumentForm.get('montoFijoTotalEstimado')?.disable();
    } else {
      this.edocumentForm.get('montoFijoTotalEstimado')?.enable();
    }
  }

  public removeLocation(position: number) {
    (this.edocumentForm.get(`ubicaciones`) as FormArray).removeAt(position);
  }

  public async filterContract(event: Event) {
    const sumilla = (event as CustomEvent).detail;
    if (sumilla.length > 2) {
      of(sumilla)
        .pipe(
          debounceTime(800),
          distinctUntilChanged(),
          takeUntil(this.unsubscribe),
          switchMap((value) => this.dataService.filterContract(value)),
        )
        .subscribe((data) => {
          this.filterContracts = data.map((item) => {
            item.sumilla = item.sumilla || '';
            return item;
          });
        });
    }
  }

  public removeLocationByPosition(position: number) {
    (this.edocumentForm.get(`ubicaciones`) as FormArray).removeAt(position);
  }

  public removeAllLocations() {
    while ((this.edocumentForm.get(`ubicaciones`) as FormArray).length > 0) {
      this.removeLocationByPosition(0);
    }
  }

  public removeLegalRepresentativeByPosition(position: number) {
    (this.edocumentForm.get('representantesLegales') as FormArray).removeAt(position);
  }

  public removeAllLegalRepresentatives() {
    while ((this.edocumentForm.get('representantesLegales') as FormArray).length > 0) {
      this.removeLegalRepresentativeByPosition(0);
    }
  }

  public async selectContract(event: Event) {
    const contractSelect = (event as CustomEvent).detail;
    this.spinnerService.show();
    this.removeAllLocations();
    this.removeAllLegalRepresentatives();
    try {
      this.contractInfo = await this.dataService.getInfoContract(String(contractSelect.idDocumentoLegal));
      // eslint-disable-next-line no-console
      this.getLocations(String(this.contractInfo?.idCompania));
      if (this.contractInfo?.ubicaciones) {
        this.contractInfo.ubicaciones.forEach((item) => {
          const locationModel = this.setLocationModel(item, false);
          (this.edocumentForm.get(`ubicaciones`) as FormArray).push(new FormGroup({ ...locationModel }));
        });
      }
      if (this.contractInfo?.representantes) {
        this.contractInfo.representantes.forEach((item) => {
          const legalRepresentativeModel = setLegalRepresentativeModel(item);
          (this.edocumentForm.get(`representantesLegales`) as FormArray).push(new FormGroup({ ...legalRepresentativeModel }));
        });
      }
      this.edocumentForm.get(`idContrato`)?.setValue(contractSelect);
      this.edocumentForm.get(`idArea`)?.setValue(this.contractInfo.idArea);
      this.edocumentForm.get(`idCompania`)?.setValue(this.contractInfo.idCompania);
      const contraparte = this.counterpartList.find((x) => x.id == this.contractInfo?.idContraparte);
      if (contraparte) {
        this.edocumentForm.get(`idContraparte`)?.setValue(contraparte);
        this.edocumentForm.get(`domicilioContraparte`)?.setValue(this.contractInfo.cntDomicilio);
        this.edocumentForm.get(`nombreContraparte`)?.setValue(this.contractInfo.cntNombreContacto);
        this.edocumentForm.get(`telefonoContraparte`)?.setValue(this.contractInfo.cntTelefono);
        this.edocumentForm.get(`emailContraparte`)?.setValue(this.contractInfo.cntEmail);
        this.edocumentForm.get(`nameCounterPart`)?.setValue(this.contractInfo.cntNombre);
        this.edocumentForm.get(`numeroIdentificacion`)?.setValue(this.contractInfo.cntNumeroIdentificacion);
        this.edocumentForm.get(`situacionSunatContraparte`)?.setValue(this.contractInfo.cntSituacion);
      } else {
        const params: ICounterPartBD = {
          nombres: this.contractInfo.cntNombre,
          id: this.contractInfo?.idContraparte,
          correo: this.contractInfo.cntEmail,
          label: this.contractInfo.cntNombre,
          numeroIdentificacion: this.contractInfo.cntNumeroIdentificacion,
          situacionSunat: this.contractInfo.cntSituacion,
          direccion: this.contractInfo.cntDomicilio,
        };
        this.counterpartList.push(params);
        this.edocumentForm.get(`idContraparte`)?.setValue(params);
        this.edocumentForm.get(`domicilioContraparte`)?.setValue(this.contractInfo.cntDomicilio);
        this.edocumentForm.get(`nombreContraparte`)?.setValue(this.contractInfo.cntNombreContacto);
        this.edocumentForm.get(`telefonoContraparte`)?.setValue(this.contractInfo.cntTelefono);
        this.edocumentForm.get(`emailContraparte`)?.setValue(this.contractInfo.cntEmail);
        this.edocumentForm.get(`nameCounterPart`)?.setValue(this.contractInfo.cntNombre);
        this.edocumentForm.get(`numeroIdentificacion`)?.setValue(this.contractInfo.cntNumeroIdentificacion);
        this.edocumentForm.get(`situacionSunatContraparte`)?.setValue(this.contractInfo.cntSituacion);
      }

      this.spinnerService.hide();
    } catch (err) {
      console.error(err);
      this.spinnerService.hide();
    }
  }

  public isInvalidControl(control: string): boolean {
    return (this.edocumentForm.get(control)?.invalid && this.edocumentForm.get(control)?.touched) || false;
  }

  public selectInitDate() {
    this.initDate = this.edocumentForm.get('fechaInicio')?.value;
  }

  public changeIndefinido(): void {
    if (this.edocumentForm.get('esIndefinido')?.value == true) {
      this.edocumentForm.get('fechaFin')?.patchValue(null);
      this.edocumentForm.get('fechaFin')?.disable();
    } else {
      this.edocumentForm.get('fechaFin')?.enable();
    }
  }

  public initCombos() {
    this.filterCompanies = this.companiesList.filter((company) => company.pais.id === this.edocumentForm.get('idPais')?.value);
    this.filterAreas = this.areasList.filter((area) => area.compania.id === this.edocumentForm.get('idCompania')?.value);
    if (this.edocumentForm.get('idPais')?.value && this.edocumentForm.get('idCompania')?.value) {
      this.getLocations(this.edocumentForm.get('idCompania')?.value);
    }
    if (this.flagDataAdenda) {
      this.getLocations(String(this.compania?.id));
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public seleccionarPais(event: any) {
    this.filterCompanies = this.companiesList.filter((company) => company.pais.id === Number(event.detail));
    this.edocumentForm.get(`idCompania`)?.setValue(null);
    this.edocumentForm.get(`idArea`)?.setValue(null);
    this.areasList = [];
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async seleccionarCompania(event: any) {
    this.edocumentForm.get(`idArea`)?.setValue(null);
    try {
      const response = await Promise.all([this.dataService.getAreasFilter(Number(event.detail))]);
      this.areasList = response[0];
      this.filterAreas = this.areasList;
    } catch (e) {
      console.error(e);
    }
    this.getLocations(event.detail);
  }

  public seleccionarMoneda(event: Event) {
    const moneda = (event as CustomEvent).detail;
    if (moneda == 58 || moneda == 59) {
      this.edocumentForm.get('aplicaModalidadPago')?.setValue(true);
      this.edocumentForm.get('montoFijoTotalEstimado')?.enable();
    }
    if (moneda == 107) {
      this.edocumentForm.get('aplicaModalidadPago')?.setValue(false);
      this.edocumentForm.get('montoFijoTotalEstimado')?.patchValue(0);
      this.edocumentForm.get('montoFijoTotalEstimado')?.disable();
    }
  }

  public selectExploration(event: Event) {
    const data = (event as CustomEvent).detail;
    this.edocumentForm.get('exploracion')?.setValue(data);
  }

  private async recoverData() {
    if (!this.edocumentForm.get('idPais')?.value && this.processType === ProcessType.CONTRATO) {
      this.edocumentForm.get('idPais')?.setValue(5);
      this.edocumentForm.get('idCompania')?.setValue(7);
    }
    if (this.edocumentForm.get('idCompania')?.value && this.edocumentForm.get('idPais')?.value) {
      try {
        const response = await Promise.all([
          this.dataService.getMonedas(),
          this.dataService.getAreasFilter(this.edocumentForm.get('idCompania')?.value || ''),
        ]);
        this.monedasList = response[0];
        this.areasList = response[1];
      } catch (e) {
        console.error(e);
      }
    } else {
      try {
        const response = await this.dataService.getMonedas();
        this.monedasList = response;
      } catch (e) {
        console.error(e);
      }
    }
  }

  private setLocationModel(item: IOperation | IOffice | IProject | IExploration | undefined, esNuevo = true, esEliminado = false) {
    const locationModel = new LocationModel();
    locationModel.idUbicacion.setValue(item?.id);
    locationModel.nombre.setValue(item?.nombre);
    locationModel.esNuevo.setValue(esNuevo);
    locationModel.eliminado.setValue(esEliminado);

    return locationModel;
  }

  private async getLocations(value: string) {
    this.dataService
      .getOperationsByCompany(value)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((data) => {
        this.filterOperations = data;
      });

    this.dataService
      .getOfficesByCompany(value)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((data) => {
        this.filterOffices = data;
      });

    this.dataService
      .getProjectsByCompany(value)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((data) => {
        this.filterProjects = data;
      });
    this.filterExplorations = await this.dataService.getExplorationsByCompany(value);
  }

  private async registerExploration(exploracion: string) {
    const response = await this.registerService.registerExploration({
      idCompania: this.edocumentForm.get('idCompania')?.value,
      nombre: exploracion,
    });
    this.filterExplorations = await this.dataService.getExplorationsByCompany(this.edocumentForm.get('idCompania')?.value);
    return this.filterExplorations.find((project) => project.id === Number(response.id));
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  public onSelectChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;
    console.log(this.edocumentForm.get('tipoDocumento')?.value);
    this.changeDocumentTypeOutput.emit(true);
    if (selectedValue === this.codAdendaUnilateral) {      
      this.edocumentForm.get('aplicaFechaFin')?.setValue(true);
      this.changeAplicaFechaFin();
    }
  }
}
