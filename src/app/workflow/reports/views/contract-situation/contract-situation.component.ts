import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Utils } from '@speed/common/helpers';
import { IArea, ICompany, ICountry, ILocationType } from '@speed/common/interfaces';
import { ILocation } from '@speed/common/interfaces/data-combo.interface';
import { ContractSituationModel } from '@speed/common/models';
import { SpinnerOverlayService } from '@speed/common/services';
import { environment } from '@speed/env/environment';
import { ComboDataService } from '@speed/final-user/common/services';
import { WorkflowTabCacheService } from 'src/app/workflow/workflow-tab-cache-service';

@Component({
  selector: 'app-contract-situation',
  templateUrl: './contract-situation.component.html',
  styleUrls: ['./contract-situation.component.scss'],
  providers: [ComboDataService],
})
export class ContractSituationComponent implements OnInit {
  public requestForm!: FormGroup;
  public tiposUbicaciones: ILocationType[] = [];
  public filterCompanies: Array<ICompany> = [];
  public filterAreas: Array<IArea> = [];
  public countriesList: Array<ICountry> = [];
  public companiesList: Array<ICompany> = [];
  public areasList: Array<IArea> = [];
  public ubicacionesList: Array<ILocation> = [];
  public filterUbicacionesList: Array<ILocation> = [];
  public urlReporte!: SafeResourceUrl;
  public showReporte = false;
  public estadosList = [
    {
      id: 'T',
      nombre: 'Vigente',
    },
    {
      id: 'O',
      nombre: 'Vencido',
    },
  ];
  cachedData: any;

  public constructor(
    private fb: FormBuilder,
    private spinnerService: SpinnerOverlayService,
    private dataService: ComboDataService,
    private domSanitizer: DomSanitizer,
    private cacheService: WorkflowTabCacheService
  ) {
    this.requestForm = this.fb.group(new ContractSituationModel());
  }

  public ngOnInit(): void {
    try {
      this.recoverData();
    } catch (err) {
      console.error(err);
      this.spinnerService.hide();
    }
  }

  public cleanForm() {
    this.requestForm.reset();
  }

  public submit(): void {
    Utils.validateAllFields(this.requestForm);
    if (this.requestForm.valid) {
      const url =
        environment.reporteEstadosSolicitud +
        '&rs:embed=true&rc:parameters=false' +
        '&pais=' +
        (this.requestForm.get('pais')?.value == null ? 0 : this.requestForm.get('pais')?.value) +
        '&Estado=' +
        (this.requestForm.get('Estado')?.value == null ? '' : this.requestForm.get('Estado')?.value) +
        '&compania=' +
        (this.requestForm.get('compania')?.value == null ? 0 : this.requestForm.get('compania')?.value) +
        '&area=' +
        (this.requestForm.get('area')?.value == null ? 0 : this.requestForm.get('area')?.value) +
        '&tipoUbicacion=' +
        (this.requestForm.get('tipoUbicacion')?.value == null ? 0 : this.requestForm.get('tipoUbicacion')?.value) +
        '&ubicacion=' +
        (this.requestForm.get('ubicacion')?.value == null ? 0 : this.requestForm.get('ubicacion')?.value);

      this.urlReporte = this.domSanitizer.bypassSecurityTrustResourceUrl(url);
      this.cachedData.urlReporte = this.urlReporte;
      this.cacheService.set('Situación de Contrato', this.cachedData);
      // eslint-disable-next-line no-console
      this.showReporte = true;
    }
  }

  public changeCountry(event: Event): void {
    const countrySelected = (event as CustomEvent).detail;
    this.filterCompanies = this.companiesList.filter((company) => company.pais.id === countrySelected);
    this.cachedData.filterCompanies = this.filterCompanies;
    this.cacheService.set('Situación de Contrato', this.cachedData);
    this.requestForm.get('compania')?.setValue(0);
  }

  public changeCompany(event: Event): void {
    const companySelected = (event as CustomEvent).detail;

    this.filterAreas = this.areasList.filter((area) => area.compania.id === companySelected);
    this.filterUbicacionesList = this.ubicacionesList.filter(
      (ubicacion) =>
        ubicacion.tipo_ubicacion.id == this.requestForm.get('tipoUbicacion')?.value && ubicacion.compania.id == companySelected,
    );
    this.cachedData.filterAreas = this.filterAreas;
    this.cachedData.filterUbicacionesList = this.filterUbicacionesList;
    this.cacheService.set('Situación de Contrato', this.cachedData);
    this.requestForm.get('ubicacion')?.setValue(0);
  }

  public changeTipoUbicacion(event: Event): void {
    const tipoUbicacionSelected = (event as CustomEvent).detail;

    this.filterUbicacionesList = this.ubicacionesList.filter(
      (ubicacion) =>
        ubicacion.tipo_ubicacion.id == tipoUbicacionSelected && ubicacion.compania.id == this.requestForm.get('compania')?.value,
    );
    this.cachedData.filterUbicacionesList = this.filterUbicacionesList;
    this.cacheService.set('Situación de Contrato', this.cachedData);
    this.requestForm.get('ubicacion')?.setValue(0);
  }

  private async recoverData() {
    this.cachedData = this.cacheService.get('Situación de Contrato');
    if (this.cachedData && this.cachedData.countriesList &&
      this.cachedData.companiesList &&
      this.cachedData.areasList &&
      this.cachedData.tiposUbicaciones &&
      this.cachedData.ubicacionesList) {
      this.countriesList = this.cachedData.countriesList;
      this.companiesList = this.cachedData.companiesList;
      this.areasList = this.cachedData.areasList;
      this.tiposUbicaciones = this.cachedData.tiposUbicaciones;
      this.ubicacionesList = this.cachedData.ubicacionesList;
      if (this.cachedData.urlReporte) {
        this.urlReporte = this.cachedData.urlReporte;
        this.showReporte = true;
      } if (this.cachedData.filterCompanies) {
        this.filterCompanies = this.cachedData.filterCompanies;
        this.requestForm.get('compania')?.setValue(0);
      } if (this.cachedData.filterUbicacionesList) {
        this.filterUbicacionesList = this.cachedData.filterUbicacionesList;
        this.requestForm.get('ubicacion')?.setValue(0);
      } if (this.cachedData.filterAreas) {
        this.filterAreas = this.cachedData.filterAreas;
      }
    } else {
      this.spinnerService.show();
      this.cachedData = {};
      const responses = await Promise.all([
        this.dataService.getCountries(),
        this.dataService.getCompanies(),
        this.dataService.getAreas(),
        this.dataService.getLocationTypes(),
        this.dataService.getLocations(),
      ]);
      this.countriesList = responses[0];
      this.companiesList = responses[1];
      this.areasList = responses[2];
      this.tiposUbicaciones = responses[3];
      this.ubicacionesList = responses[4];

      this.cachedData.countriesList = this.countriesList;
      this.cachedData.companiesList = this.companiesList;
      this.cachedData.areasList = this.areasList;
      this.cachedData.tiposUbicaciones = this.tiposUbicaciones;
      this.cachedData.ubicacionesList = this.ubicacionesList;

      this.cacheService.set('Situación de Contrato', this.cachedData);

      this.spinnerService.hide();
    }

  }

}
