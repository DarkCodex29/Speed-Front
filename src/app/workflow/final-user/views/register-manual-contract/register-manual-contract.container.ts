import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProcessType } from '@speed/common/enums';
import {
  getTabApplicationDocumentsForManualRegister,
  getTabContract,
  getTabPowersForManualRegister,
} from '@speed/common/helpers/buid-tabs';
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
import { ContractManualModel, DocumentsTabModel } from '@speed/common/models';
import { SpinnerOverlayService } from '@speed/common/services';
import { ComboDataService } from '@speed/final-user/common/services';
import { WorkflowTabCacheService } from 'src/app/workflow/workflow-tab-cache-service';

@Component({
  selector: 'app-register-manual-contract-container',
  templateUrl: './register-manual-contract.container.html',
  providers: [ComboDataService],
})
export class RegisterManualContractContainer implements OnInit {
  public isLoading = false;
  public tabApplicationDocuments?: ITabDocuments;
  public tabPowers?: ITabDocuments;
  public tabContract?: ITabDocuments;
  public requestingUserList: IAbogadoResponsable[] = [];
  public responsibleLawyerList: IAbogadoResponsable[] = [];
  public tiposContratoList: IContractType[] = [];
  public processType: ProcessType = ProcessType.CONTRATO;
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

  public async ngOnInit(): Promise<void> {
    this.isLoading = true;
    this.spinnerService.show();
    this.initForms();
    this.initTabs();
    await this.recoverData();
  }

  private async recoverData() {
    this.cachedData = this.cacheService.get('Registrar Contrato Manual');
    if (this.cachedData && this.cachedData.countriesList &&
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
      this.cachedData = {};
      try {
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
        this.countriesList = responses[0];
        this.companiesList = responses[1];
        this.areasList = responses[2];
        this.counterpartList = responses[3];
        this.legalRepresentativesList = responses[4];
        this.customerTypeList = responses[5];

        this.cachedData.countriesList = this.countriesList;
        this.cachedData.companiesList = this.companiesList;
        this.cachedData.areasList = this.areasList;
        this.cachedData.counterpartList = this.counterpartList;
        this.cachedData.legalRepresentativesList = this.legalRepresentativesList;
        this.cachedData.customerTypeList = this.customerTypeList;

        this.cacheService.set('Registrar Contrato Manual', this.cachedData);

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
    this.formRegisterManualContract = this.fb.group({
      requested: new FormGroup({ ...new ContractManualModel() }),
    });
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
    this.tabContract = getTabContract();
    this.tabPowers = getTabPowersForManualRegister();
    this.tabApplicationDocuments = getTabApplicationDocumentsForManualRegister();
    const documentsTabModel = new DocumentsTabModel(this.tabApplicationDocuments);
    const documentsTabPowers = new DocumentsTabModel(this.tabPowers);
    const documentsTabContrato = new DocumentsTabModel(this.tabContract);
    this.formRegisterManualContract.addControl('tabApplicationDocuments', this.fb.group(documentsTabModel));
    this.formRegisterManualContract.addControl('tabPowers', this.fb.group(documentsTabPowers));
    this.formRegisterManualContract.addControl('tabContract', this.fb.group(documentsTabContrato));
  }
}
