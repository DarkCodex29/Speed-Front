import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProcessType } from '@speed/common/enums';
import { getAdendumDocumentsForManualRegister, getTabApplicationDocumentsForManualAdendumRegister } from '@speed/common/helpers/buid-tabs';
import {
  IAbogadoResponsable,
  IArea,
  ICompany,
  IContractType,
  ICounterPartBD,
  ICountry,
  ICustomerType,
  ITabDocuments,
} from '@speed/common/interfaces';
import { AddendumManualModel, DocumentsTabModel } from '@speed/common/models';
import { SpinnerOverlayService } from '@speed/common/services';
import { ComboDataService } from '@speed/final-user/common/services';
import { WorkflowTabCacheService } from 'src/app/workflow/workflow-tab-cache-service';

@Component({
  selector: 'app-register-manual-addendum-container',
  templateUrl: './register-manual-addendum.container.html',
  providers: [ComboDataService],
})
export class RegisterManualAddendumContainer implements OnInit {
  public isLoading = false;
  public tabApplicationDocuments?: ITabDocuments;
  public tabAdendum?: ITabDocuments;
  public requestingUserList: IAbogadoResponsable[] = [];
  public responsibleLawyerList: IAbogadoResponsable[] = [];
  public tiposContratoList: IContractType[] = [];
  public processType: ProcessType = ProcessType.ADENDA;
  public counterpartList: Array<ICounterPartBD> = [];
  public countriesList: Array<ICountry> = [];
  public companiesList: Array<ICompany> = [];
  public areasList: Array<IArea> = [];
  public legalRepresentativesList: Array<ICounterPartBD> = [];
  public customerTypeList: Array<ICustomerType> = [];
  public formRegisterManualContract!: FormGroup;
  cachedData: any;

  public constructor(
    private fb: FormBuilder,
    private dataService: ComboDataService,
    private spinnerService: SpinnerOverlayService,
    private cacheService: WorkflowTabCacheService
  ) { }

  public ngOnInit(): void {
    this.isLoading = true;
    this.spinnerService.show();
    this.initForms();
    this.recoverData();
  }

  private async recoverData() {
    this.cachedData = this.cacheService.get('Registrar Adenda Manual');
    if (this.cachedData != null && this.cachedData.countriesList &&
      this.cachedData.companiesList &&
      this.cachedData.areasList &&
      this.cachedData.counterpartList &&
      this.cachedData.legalRepresentativesList &&
      this.cachedData.customerTypeList &&
      this.cachedData.tiposContratoList &&
      this.cachedData.requestingUserList &&
      this.cachedData.responsibleLawyerList) {
      this.countriesList = this.cachedData.countriesList;
      this.companiesList = this.cachedData.companiesList;
      this.areasList = this.cachedData.areasList;
      this.counterpartList = this.cachedData.counterpartList;
      this.legalRepresentativesList = this.cachedData.legalRepresentativesList;
      this.customerTypeList = this.cachedData.customerTypeList;
      this.tiposContratoList = this.cachedData.tiposContratoList;
      this.requestingUserList = this.cachedData.requestingUserList;
      this.responsibleLawyerList = this.cachedData.responsibleLawyerList;
      this.spinnerService.hide();
      this.isLoading = false;
    } else {
      try {
        this.cachedData={};
        const responses = await Promise.all([
          this.dataService.getCountries(),
          this.dataService.getCompanies(),
          this.dataService.getAreas(),
          this.dataService.getCounterParts(),
          this.dataService.getLegalRepresentatives(),
          this.dataService.getCustomerTypes(),
        ]);
        this.recoverTiposContrato();
        this.recoverRequestingUser();
        this.recoverResponsibleLawyerList();
        this.initTabs();
        this.countriesList = responses[0];
        this.companiesList = responses[1];
        this.areasList = responses[2];
        this.counterpartList = responses[3];
        this.legalRepresentativesList = responses[4];
        this.customerTypeList = responses[5];

        this.cachedData.counterpartList = this.countriesList;
        this.cachedData.companiesList = this.companiesList;
        this.cachedData.areasList = this.areasList;
        this.cachedData.counterpartList = this.counterpartList;
        this.cachedData.legalRepresentativesList = this.legalRepresentativesList;
        this.cachedData.customerTypeList = this.customerTypeList;

        this.cacheService.set('Registrar Adenda Manual', this.cachedData);

        this.spinnerService.hide();
        this.isLoading = false;
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
        this.spinnerService.hide();
        this.isLoading = false;
      }
    }
  }

  private async recoverRequestingUser() {
    try {
      this.requestingUserList = await this.dataService.getRequestingUsers();
      this.cachedData.requestingUserList = this.requestingUserList;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  }

  private initForms(): void {
    this.formRegisterManualContract = this.fb.group(new AddendumManualModel());
  }

  private async recoverResponsibleLawyerList() {
    try {
      this.responsibleLawyerList = await this.dataService.getResponsibleLawyers();
      this.cachedData.responsibleLawyerList = this.responsibleLawyerList;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  }

  private async recoverTiposContrato() {
    try {
      this.tiposContratoList = await this.dataService.getContractTypes();
      this.cachedData.tiposContratoList = this.tiposContratoList;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  }

  private initTabs(): void {
    this.tabAdendum = getAdendumDocumentsForManualRegister();
    this.tabApplicationDocuments = getTabApplicationDocumentsForManualAdendumRegister();
    const documentsTabModel = new DocumentsTabModel(this.tabApplicationDocuments);
    const documentsAddendum = new DocumentsTabModel(this.tabAdendum);
    this.formRegisterManualContract.addControl('tabApplicationDocuments', this.fb.group(documentsTabModel));
    this.formRegisterManualContract.addControl('documentsAddendum', this.fb.group(documentsAddendum));
  }
}
