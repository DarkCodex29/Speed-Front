import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProcessType } from '@speed/common/enums';
import { getTabApplicationDocuments } from '@speed/common/helpers';
import { IArea, ICompany, ICounterPartBD, ICountry, ICustomerType, ITabDocuments } from '@speed/common/interfaces';
import { DocumentsTabModel } from '@speed/common/models';
import { SpinnerOverlayService } from '@speed/common/services';
import { ComboDataService } from '@speed/final-user/common/services';

@Component({
  selector: 'ui-addendum-form',
  templateUrl: './addendum-form.component.html',
  styleUrls: ['./addendum-form.component.scss'],
  providers: [ComboDataService],
})
export class AddendumFormComponent implements OnInit {
  @Input() public requestForm!: FormGroup;
  public addendumForm!: FormGroup;
  public readonly enumProcessType = ProcessType;
  public loading = true;
  public countriesList: Array<ICountry> = [];
  public companiesList: Array<ICompany> = [];
  public areasList: Array<IArea> = [];
  public counterpartList: Array<ICounterPartBD> = [];
  public legalRepresentativesList: Array<ICounterPartBD> = [];
  public customerTypeList: Array<ICustomerType> = [];
  public tabApplicationDocuments?: ITabDocuments;

  public constructor(
    private dataService: ComboDataService,
    private spinnerService: SpinnerOverlayService,
    private fb: FormBuilder,
  ) {}

  public async ngOnInit() {
    await this.recoverData();
    this.initForm();
    this.initTabs();
  }

  public getformGroup(form: string) {
    return this.requestForm.get(form) as FormGroup;
  }

  private initForm() {
    this.addendumForm = this.requestForm.get('process.adenda') as FormGroup;
  }

  private async recoverData() {
    try {
      this.spinnerService.show();
      const responses = await Promise.all([
        this.dataService.getCountries(),
        this.dataService.getCompanies(),
        this.dataService.getAreas(),
        this.dataService.getCounterParts(),
        this.dataService.getLegalRepresentatives(),
        this.dataService.getCustomerTypes(),
      ]);
      this.countriesList = responses[0];
      this.companiesList = responses[1];
      this.areasList = responses[2];
      this.counterpartList = responses[3];
      this.legalRepresentativesList = responses[4];
      this.customerTypeList = responses[5];
      this.loading = false;
      this.spinnerService.hide();
    } catch (err) {
      console.error(err);
      this.loading = false;
      this.spinnerService.hide();
    }
  }

  private initTabs() {
    this.tabApplicationDocuments = getTabApplicationDocuments(ProcessType.ADENDA);
    const documentsTabModel = new DocumentsTabModel(this.tabApplicationDocuments);
    this.requestForm.addControl('tabApplicationDocuments', this.fb.group(documentsTabModel));
  }
}
