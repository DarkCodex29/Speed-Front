import { Component, Input, OnDestroy } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { ActionModal, ProcessType, Status } from '@speed/common/enums';
import { ICounterPartBD, ICustomerType } from '@speed/common/interfaces';
import { ComboDataService } from '../../services';
import { Subject, takeUntil } from 'rxjs';
import { setLegalRepresentativeModel } from '@speed/common/helpers';
import { DialogService } from '@speed/common/dialog';
import { CounterpartModalComponent, LegalRepresentativeModalComponent } from '@speed/common/modals';

@Component({
  selector: 'ui-counterpart-panel',
  templateUrl: './counterpart-panel.component.html',
  styleUrls: ['./counterpart-panel.component.scss'],
  providers: [ComboDataService],
})
export class CounterpartPanelComponent implements OnDestroy {
  @Input() public counterPartForm!: FormGroup;
  @Input() public processType: ProcessType = ProcessType.CONTRATO;
  @Input() public counterpartList: Array<ICounterPartBD> = [];
  @Input() public legalRepresentativesList: Array<ICounterPartBD> = [];
  @Input() public customerTypeList: Array<ICustomerType> = [];
  @Input() public isRegistroAdendaManual = false;
  @Input() public flagStyle = true;
  @Input() public flagDataAdenda = false;
  @Input() public disableInputs = false;
  public readonly enumProcessType = ProcessType;
  public documentNumber = '';
  private unsubscribe: Subject<void>;

  public constructor(
    private dataService: ComboDataService,
    private dialogService: DialogService,
  ) {
    this.unsubscribe = new Subject();
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public isInvalidControl(control: string): boolean {
    return (this.counterPartForm.get(control)?.invalid && this.counterPartForm.get(control)?.touched) || false;
  }

  public addRepresentativeToList(item: ICounterPartBD) {
    const legalRepresentativeModel = setLegalRepresentativeModel(item);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const index = this.counterPartForm.get('representantesLegales')?.value.findIndex((x: any) => x.idRepresentanteLegal == item.id);
    if (index == -1) {
      (this.counterPartForm.get(`representantesLegales`) as FormArray).push(new FormGroup({ ...legalRepresentativeModel }));
    }
  }

  public onClickAddRepresentativeTolist(event: Event) {
    const item = (event as CustomEvent).detail;
    this.addRepresentativeToList(item);
  }

  public removeRepresentative(position: number) {
    (this.counterPartForm.get(`representantesLegales`) as FormArray).removeAt(position);
  }

  public removeAllRepresentative() {
    while ((this.counterPartForm.get(`representantesLegales`) as FormArray).length > 0) {
      this.removeRepresentative(0);
    }
  }

  public async searchLegalRepresentatives(item: ICounterPartBD) {
    try {
      // this.counterPartForm.patchValue({
      //   idContraparte: item.id,
      // });
      this.removeAllRepresentative();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const legalRepresentative: any = await this.dataService.getRepresentativesByCounterpart(item.id);
      if (legalRepresentative.length > 0) {
        for (let i = 0; i < legalRepresentative.length; i++) {
          this.addRepresentativeToList(legalRepresentative[i]);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  public onClickSearchLegalRepresentative(event: Event) {
    const item = (event as CustomEvent).detail;
    this.counterPartForm.get('idContraparte')?.setValue(item);
    this.counterPartForm.get('situacionSunatContraparte')?.setValue(item.situacionSunat);
    this.counterPartForm.get('domicilioContraparte')?.setValue(item.direccion);
    this.counterPartForm.get('nombreContraparte')?.setValue(item.contacto);
    this.counterPartForm.get('telefonoContraparte')?.setValue(item.telefono);
    this.counterPartForm.get('emailContraparte')?.setValue(item.correo);
    this.counterPartForm.get('numeroIdentificacion')?.setValue(item.numeroIdentificacion);
    this.searchLegalRepresentatives(item);
  }

  public openRegistrarContraparte() {
    this.dialogService
      .show({
        component: CounterpartModalComponent,
        config: {
          data: {
            tipoCliente: this.customerTypeList.filter((c) => c.verContraparte === Status.SI),
            actionType: ActionModal.REGISTRAR,
          },
        },
      })
      .afterClosed.pipe(takeUntil(this.unsubscribe))
      .subscribe(async (action) => {
        const response = action as { idCliente: number };
        try {
          if (response && response.idCliente) {
            this.counterpartList = await this.dataService.getCounterParts();
            const index = this.counterpartList.findIndex((x) => x.id == response.idCliente);
            if (index != -1) {
              this.counterPartForm.get('idContraparte')?.setValue(this.counterpartList[index]);
              this.counterPartForm.get('situacionSunatContraparte')?.setValue(this.counterpartList[index].situacionSunat);
              this.counterPartForm.get('domicilioContraparte')?.setValue(this.counterpartList[index].direccion);
              this.counterPartForm.get('nombreContraparte')?.setValue(this.counterpartList[index]?.contacto);
              this.counterPartForm.get('telefonoContraparte')?.setValue(this.counterpartList[index].telefono);
              this.counterPartForm.get('emailContraparte')?.setValue(this.counterpartList[index].correo);
              await this.searchLegalRepresentatives(this.counterpartList[index]);
            }
          }
        } catch (err) {
          console.error(err);
        }
      });
  }

  public openRegistrarRepresentante() {
    this.dialogService
      .show({
        component: LegalRepresentativeModalComponent,
        config: {
          data: {
            tipoCliente: this.customerTypeList.filter((c) => c.verRepresentante === Status.SI),
            actionType: ActionModal.REGISTRAR,
          },
        },
      })
      .afterClosed.pipe(takeUntil(this.unsubscribe))
      .subscribe(async (action) => {
        const response = action as { idCliente: number };
        try {
          if (response && response.idCliente) {
            this.legalRepresentativesList = await this.dataService.getLegalRepresentatives();
            const index = this.legalRepresentativesList.findIndex((x) => x.id == response.idCliente);
            if (index != -1) {
              this.addRepresentativeToList(this.legalRepresentativesList[index]);
            }
          }
        } catch (err) {
          console.error(err);
        }
      });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async openEditarRepresentante(representanteInfo: any) {
    this.dialogService
      .show({
        component: LegalRepresentativeModalComponent,
        config: {
          data: {
            tipoCliente: this.customerTypeList.filter((c) => c.verRepresentante === Status.SI),
            actionType: ActionModal.EDITAR,
            info: representanteInfo,
          },
        },
      })
      .afterClosed.pipe(takeUntil(this.unsubscribe))
      .subscribe(async () => {
        try {
          this.legalRepresentativesList = await this.dataService.getLegalRepresentatives();
        } catch (err) {
          console.error(err);
        }
      });
  }
}
