import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { IArea, ICompany, ICounterPartBD, ICountry, ICustomerType, ITabDocuments } from '@speed/common/interfaces';
import { Subject, takeUntil } from 'rxjs';
import { ComboDataService } from '@speed/final-user/common/services';
import { SpinnerOverlayService } from '@speed/common/services';
import { getTabApplicationDocuments, getTabPowers } from '@speed/common/helpers';
import { ProcessType } from '@speed/common/enums';
import { DocumentsTabModel, PenaltyModel, ReiterationModel } from '@speed/common/models';

@Component({
  selector: 'app-contract-form',
  templateUrl: './contract-form.component.html',
  styleUrls: ['./contract-form.component.scss'],
  providers: [ComboDataService],
})
export class ContractFormComponent implements OnInit, OnDestroy {
  @Input() public requestForm!: FormGroup;
  public contractForm!: FormGroup;
  public loading = true;
  public countriesList: Array<ICountry> = [];
  public companiesList: Array<ICompany> = [];
  public areasList: Array<IArea> = [];
  public counterpartList: Array<ICounterPartBD> = [];
  public legalRepresentativesList: Array<ICounterPartBD> = [];
  public customerTypeList: Array<ICustomerType> = [];
  @Input() public tabApplicationDocuments?: ITabDocuments;
  @Input() public tabPowers?: ITabDocuments;
  public showApplyPenalty = false;
  private unsubscribe: Subject<void>;

  public constructor(
    private dataService: ComboDataService,
    private spinnerService: SpinnerOverlayService,
    private fb: FormBuilder,
  ) {
    this.unsubscribe = new Subject();
  }

  public async ngOnInit() {
    await this.recoverData();
    this.initForm();
    this.subscribeApplyPenalty();
    if (this.requestForm.value.requested.aplicaPenalidad) {
      this.requestForm.get('requested.aplicaPenalidad')?.setValue(true);
    }
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public subscribeApplyPenalty() {
    this.requestForm
      .get('requested.aplicaPenalidad')
      ?.valueChanges.pipe(takeUntil(this.unsubscribe))
      .subscribe((data) => {
        this.showApplyPenalty = data || false;
        if (!data) {
          (this.requestForm.get('penalties') as FormArray).clear();
        } else {
          this.getPenalties();
        }
      });
  }

  public getFormArray(formArray: string) {
    return this.requestForm.get(formArray) as FormArray;
  }

  public getFormReiteration(position: number) {
    return (this.requestForm.get('penalties') as FormArray).at(position).get('reiterancias') as FormArray;
  }

  public getformGroup(form: string) {
    return this.requestForm.get(form) as FormGroup;
  }

  public changeCheckbox(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.getFormArray('penalties').controls.forEach((value) => {
      const penalidad = value as FormGroup<PenaltyModel>;
      penalidad.controls.aplica.setValue(checked);
    });
  }

  private initForm() {
    this.contractForm = this.requestForm.get('process.contrato') as FormGroup;
    this.contractForm.get('modalidadPago')?.setValue('esPrecioFijo');
    this.contractForm.get('montoFijoTotalEstimado')?.disable();
    this.contractForm.get('montoAdelanto')?.disable();
    this.contractForm.get('periodoRenovar')?.disable();
    this.contractForm.get('periodicidadPago')?.disable();
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
      // eslint-disable-next-line no-console
      console.error(err);
      this.loading = false;
      this.spinnerService.hide();
    }
  }

  private initTabs() {
    this.tabApplicationDocuments = getTabApplicationDocuments(ProcessType.CONTRATO);
    const documentsTabModel = new DocumentsTabModel(this.tabApplicationDocuments);
    this.requestForm.addControl('tabApplicationDocuments', this.fb.group(documentsTabModel));
    this.tabPowers = getTabPowers();
    const poderesTabModel = new DocumentsTabModel(this.tabPowers);
    this.requestForm.addControl('tabPowers', this.fb.group(poderesTabModel));
  }

  private getPenalties() {
    this.dataService
      .getPenaltiesByExpediente(Number(this.requestForm.value.requested.idExpediente))
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((data) => {
        if (data.length > 0) {
          data.forEach((penalty) => {
            const penaltyModel = new FormGroup({ ...new PenaltyModel() });
            penaltyModel.patchValue(penalty);
            if (penalty.reiterancias.length > 0) {
              penalty.reiterancias.forEach((reiterancia) => {
                const reiterationModel = new FormGroup({ ...new ReiterationModel() });
                reiterationModel.patchValue(reiterancia);
                (penaltyModel.get('reiterancias') as FormArray).push(reiterationModel);
              });
            }
            (this.requestForm.get('penalties') as FormArray).push(penaltyModel);
          });
        }
      });
  }
}
