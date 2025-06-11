import { CUSTOM_ELEMENTS_SCHEMA, Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ComboDataService, InboxService } from '@speed/final-user/common/services';
import { SpinnerOverlayService, DatosContratoService } from '@speed/common/services';
import { LegalAreaModel, LegalDocumentModel, PenaltyModel, ReiterationModel } from '@speed/common/models';
import { DialogConfig, DialogRef, DialogService } from '@speed/common/dialog';
import { NgFor, NgIf } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { ProcessType } from '@speed/common/enums';
import { IContractBean } from 'src/app/workflow/final-user/views/inbox/common/interfaces';
import {
  HcTipoContrato,
  IAbogadoResponsable,
  IArea,
  ICompany,
  ICounterPartBD,
  ICountry,
  ICustomerType,
  IParameter,
  IRequestingUser,
  IResponseContractData,
  ISelect,
} from '@speed/common/interfaces';
import { CustomReactiveFormDirective } from '@speed/common/directives';
import { MessageModalComponent } from '../message-modal';
import { FinalUserComponentsModule } from '@speed/final-user/common/components';

@Component({
  standalone: true,
  selector: 'app-contrato-data-modal',
  templateUrl: './contrato-data-modal.component.html',
  styleUrls: ['./contrato-data-modal.component.scss'],
  providers: [InboxService, ComboDataService, DatosContratoService],
  imports: [NgIf, NgFor, ReactiveFormsModule, FinalUserComponentsModule, CustomReactiveFormDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ContratoDataModalComponent implements OnInit, OnDestroy {
  public overlay = false;
  public legalDocumentForm!: FormGroup;
  public showButtonEdit = true;
  public modifiedResponsibleLawyerOrRequesting = false;
  public modifiedVigencia = false;
  public data!: IResponseContractData;
  public dataTipoContrato: Array<ISelect> = [];
  public customerTypeList: Array<ICustomerType> = [];
  public userRequestingList: Array<IRequestingUser> = [];
  public counterpartList: Array<ICounterPartBD> = [];
  public legalRepresentativesList: Array<ICounterPartBD> = [];
  public countriesList: Array<ICountry> = [];
  public companiesList: Array<ICompany> = [];
  public areasList: Array<IArea> = [];
  public contractTypeList: Array<HcTipoContrato> = [];
  public monedasList: IParameter[] = [];
  public responsibleLawyersList: IAbogadoResponsable[] = [];
  public loading = true;
  public readonly enumProcessType = ProcessType;
  public penaltyApplies = false;
  private unsubscribe: Subject<void>;
  private params?: IContractBean | null;

  public constructor(
    private fb: FormBuilder,
    private inboxService: InboxService,
    private dataService: ComboDataService,
    private spinnerService: SpinnerOverlayService,
    private datosContratoService: DatosContratoService,
    private dialogService: DialogService,
    private dialogRef: DialogRef<unknown>,
    private dialogConfig: DialogConfig,
  ) {
    this.unsubscribe = new Subject();
  }

  public async ngOnInit() {
    this.spinnerService.show();
    this.params = (this.dialogConfig.data as IContractBean) || null;
    await this.recoverData();
    this.initForm();
    this.loadData();
    this.desactivarInputs();
    this.loading = false;
    this.spinnerService.hide();
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public editData() {
    this.showButtonEdit = false;
    this.activarInputs();
    this.legalDocumentForm
      .get('abogadoResponsable')
      ?.valueChanges.pipe(takeUntil(this.unsubscribe))
      .subscribe(() => {
        this.modifiedResponsibleLawyerOrRequesting = true;
      });
    this.legalDocumentForm
      .get('solicitante')
      ?.valueChanges.pipe(takeUntil(this.unsubscribe))
      .subscribe(() => {
        this.modifiedResponsibleLawyerOrRequesting = true;
      });
    this.contractForm
      .get('fechaFin')
      ?.valueChanges.pipe(takeUntil(this.unsubscribe))
      .subscribe(() => {
        this.modifiedVigencia = true;
      });
  }

  public activarInputs() {
    this.legalDocumentForm.enable();
    this.legalDocumentForm.get('adenda')?.disable();
    if (!this.contractForm.value.aplicaModalidadPago) {
      this.contractForm.get('montoFijoTotalEstimado')?.disable();
    }
    if (this.contractForm.value.esIndefinido) {
      this.contractForm.get('fechaFin')?.disable();
    }
    if (!this.contractForm.value.aplicaAdelanto) {
      this.contractForm.get('montoAdelanto')?.disable();
    }
    if (!this.contractForm.value.aplicaRenovacionAutomatica) {
      this.contractForm.get('periodoRenovar')?.disable();
    }
    if (!this.contractForm.value.aplicaPeriodicidad) {
      this.contractForm.get('periodicidadPago')?.disable();
    }
  }

  public saveData() {
    this.spinnerService.show();
    const { penalidades, ...restForm } = this.legalDocumentForm.value;
    const params = {
      ...restForm,
      abogadoResponsable: restForm.abogadoResponsable.id,
      solicitante: restForm.solicitante.id,
    };

    params.contrato.idContraparte = restForm.contrato.idContraparte.id;

    this.datosContratoService
      .guardarDocumentoLegal(params)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe({
        next: () => {
          this.spinnerService.hide();
          this.dialogRef.close({
            modified: true,
            changeResponsible: this.modifiedResponsibleLawyerOrRequesting,
          });
        },
        error: (error) => {
          this.spinnerService.hide();
          console.error(error);
          this.dialogService.show({
            component: MessageModalComponent,
            config: { data: { message: 'Error al guardar, intente nuevamente.' } },
          });
        },
      });

    if (restForm.aplicaPenalidad) {
      this.datosContratoService
        .savePenalidades({
          idExpediente: Number(this.params?.idExpediente),
          penalidades,
        })
        .pipe(takeUntil(this.unsubscribe))
        .subscribe();
    }
  }

  public cancelAction() {
    this.desactivarInputs();
    this.showButtonEdit = true;
  }

  public desactivarInputs() {
    this.legalDocumentForm.disable();
  }

  public close() {
    this.dialogRef.close({ modified: false, changeResponsible: false, changeVigencia: false });
  }

  public seleccionarAbogadoResponsable(event: Event) {
    const value = (event as CustomEvent).detail;
    this.legalDocumentForm.get('abogadoResponsable')?.setValue(value);
  }
  public selectUserRequesting(event: Event) {
    const customEvent = event as CustomEvent;
    this.legalDocumentForm.get('solicitante')?.setValue(customEvent.detail);
  }
  public get contractForm() {
    return this.legalDocumentForm.get('contrato') as FormGroup;
  }

  public loadData() {
    this.legalDocumentForm.get('abogadoResponsable')?.setValue(this.data.documentoLegal.responsable);
    this.legalDocumentForm.get('sumilla')?.setValue(this.data.documentoLegal.sumilla);
    this.legalDocumentForm.get('solicitante')?.setValue(this.data.documentoLegal.solicitante);
    this.legalDocumentForm.get('tipoContrato')?.setValue(this.data.documentoLegal.contrato?.tipo_contrato?.id);

    this.legalDocumentForm
      .get('fechaBorrador')
      ?.setValue(
        this.data.documentoLegal.fechaBorradorFormat !== null
          ? this.data.documentoLegal.fechaBorradorFormat.split('/').reverse().join('-')
          : null,
      );

    this.contractForm.get('idContraparte')?.setValue(this.data.documentoLegal.contraparte);
    this.contractForm.get('situacionSunatContraparte')?.setValue(this.data.documentoLegal.contraparte.situacionSunat);
    this.contractForm.get('domicilioContraparte')?.setValue(this.data.documentoLegal.cnt_domicilio);
    this.contractForm.get('nombreContraparte')?.setValue(this.data.documentoLegal.cnt_nombre_contacto);
    this.contractForm.get('numeroIdentificacion')?.setValue(this.data.documentoLegal.contraparte?.numeroIdentificacion);

    this.contractForm.get('telefonoContraparte')?.setValue(this.data.documentoLegal.cnt_telefono_contacto);
    this.contractForm.get('emailContraparte')?.setValue(this.data.documentoLegal.cnt_correo_contacto);
    const arregloRepresentantes = this.contractForm.get('representantesLegales') as FormArray;
    for (const item of this.data.representantes) {
      const grupo = this.fb.group({
        idRepresentanteLegal: [item.id],
        tipoCliente: [item.tipo.id],
        tipoDocumento: [item.tipo.nombre],
        numeroIdentificacion: [item.numeroIdentificacion],
        nombre: [item.nombre],
        apellidoPaterno: [item.apellidoPaterno],
        apellidoMaterno: [item.apellidoMaterno],
        nombreCompleto: [item.label],
        correo: [item.correo],
        esRepresentante: [item.esRepresentante],
        esContraparte: [item.esContraparte],
        eliminado: [false],
      });
      arregloRepresentantes.push(grupo);
    }

    const arregloUbicaciones = this.contractForm.get('ubicaciones') as FormArray;
    for (const item of this.data.ubicaciones) {
      const grupo = this.fb.group({
        idUbicacion: [item.id],
        nombre: [item.nombre],
      });
      arregloUbicaciones.push(grupo);
    }

    this.contractForm.get('idPais')?.setValue(this.data.idPais);
    this.contractForm.get('idCompania')?.setValue(this.data.idCompania);
    this.contractForm.get('idArea')?.setValue(this.data.documentoLegal.area.id);
    this.contractForm.get('propositoObservaciones')?.setValue(this.data.documentoLegal.contrato?.descripcion);

    this.contractForm
      .get('fechaInicio')
      ?.setValue(
        this.data.documentoLegal.contrato?.fechaInicioFormat !== null
          ? this.data.documentoLegal.contrato?.fechaInicioFormat.split('/').reverse().join('-')
          : null,
      );

    this.contractForm
      .get('fechaFin')
      ?.setValue(
        this.data.documentoLegal.contrato?.fechaFinFormat !== null
          ? this.data.documentoLegal.contrato?.fechaFinFormat.split('/').reverse().join('-')
          : null,
      );

    this.contractForm.get('esIndefinido')?.setValue(this.data.documentoLegal.contrato?.indefinido);

    if (this.data.documentoLegal.contrato?.moneda !== null) {
      this.contractForm.get('idMoneda')?.setValue(this.data.documentoLegal.contrato?.moneda.id);
    }

    if (this.data.documentoLegal.contrato?.modalidad_pago === 'Precio Fijo' || this.data.documentoLegal.contrato?.modalidad_pago === 'PF') {
      this.contractForm.get('modalidadPago')?.setValue('esPrecioFijo');
    } else if (
      this.data.documentoLegal.contrato?.modalidad_pago === 'Precio Unitario' ||
      this.data.documentoLegal.contrato?.modalidad_pago === 'PU'
    ) {
      this.contractForm.get('modalidadPago')?.setValue('esPrecioUnitario');
    }

    if (this.data.documentoLegal.contrato?.monto !== null) {
      this.contractForm.get('montoFijoTotalEstimado')?.setValue(this.data.documentoLegal.contrato?.monto);
    }

    if (this.data.documentoLegal.contrato?.aplicaModalidadPago === 1) {
      this.contractForm.get('aplicaModalidadPago')?.setValue(true);
    } else if (this.data.documentoLegal.contrato?.aplicaModalidadPago === 0) {
      this.contractForm.get('aplicaModalidadPago')?.setValue(false);
    }

    this.contractForm.get('aplicaAdelanto')?.setValue(this.data.documentoLegal.contrato?.adelanto);
    if (this.data.documentoLegal.contrato?.monto_adelanto !== null) {
      this.contractForm.get('montoAdelanto')?.setValue(this.data.documentoLegal.contrato?.monto_adelanto);
    }
    if (this.data.documentoLegal.contrato?.periodicidad !== null) {
      this.contractForm.get('periodicidadPago')?.setValue(this.data.documentoLegal.contrato?.periodicidad);
    }
    this.contractForm.get('aplicaRenovacionAutomatica')?.setValue(this.data.documentoLegal.contrato?.renovacion_auto);
    if (this.data.documentoLegal.contrato?.periodo_renovar) {
      this.contractForm.get('periodicidadPago')?.setValue(this.data.documentoLegal.contrato?.periodo_renovar);
    }

    if (this.data.documentoLegal.contrato?.aplicaPeriodicidad === 1) {
      this.contractForm.get('aplicaPeriodicidad')?.setValue(true);
    } else if (this.data.documentoLegal.contrato?.aplicaPeriodicidad === 0) {
      this.contractForm.get('aplicaPeriodicidad')?.setValue(false);
    }

    this.contractForm.get('aplicaArrendamiento')?.setValue(this.data.documentoLegal.contrato?.arrendamiento);
  }

  public getFormArray(formArray: string) {
    return this.legalDocumentForm.get(formArray) as FormArray;
  }

  public getFormReiteration(position: number) {
    return (this.legalDocumentForm.get('penalidades') as FormArray).at(position).get('reiterancias') as FormArray;
  }

  public changeCheckbox(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.getFormArray('penalidades').controls.forEach((value) => {
      const penalidad = value as FormGroup<PenaltyModel>;
      penalidad.controls.aplica.setValue(checked);
    });
  }

  private initForm() {
    this.legalDocumentForm = this.fb.group({
      ...new LegalDocumentModel(),
      ...new LegalAreaModel(),
      penalidades: new FormArray<FormGroup>([]),
    });
    this.legalDocumentForm.get('idExpediente')?.setValue(this.params?.idExpediente);
    this.legalDocumentForm.get('idDocumentoLegal')?.setValue(this.data.documentoLegal.id);
    this.legalDocumentForm.get('aplicaPenalidad')?.setValue(this.data.documentoLegal.expediente?.aplicaPenalidad);
    this.legalDocumentForm.get('adenda')?.disable();
    this.legalDocumentForm.get('esContrato')?.setValue(true);
  }

  private async recoverData() {
    try {
      const responses = await Promise.all([
        this.inboxService.obtenerbotonDatosContrato(this.params as IContractBean),
        this.dataService.getCustomerTypes(),
        this.dataService.getCounterParts(),
        this.dataService.getLegalRepresentatives(),
        this.dataService.getCountries(),
        this.dataService.getCompanies(),
        this.dataService.getAreas(),
        this.dataService.getResponsibleLawyers(),
        this.dataService.getRequestingUsers(),
      ]);
      this.data = responses[0];
      this.customerTypeList = responses[1];
      this.counterpartList = responses[2];
      this.legalRepresentativesList = responses[3];
      this.countriesList = responses[4];
      this.companiesList = responses[5];
      this.areasList = responses[6];
      this.responsibleLawyersList = responses[7];
      this.userRequestingList = responses[8];
      this.contractTypeList = this.data.listaTipoContrato;

      this.dataTipoContrato = this.contractTypeList.map((elem) => ({
        value: elem.id,
        label: elem.nombre,
      }));

      this.penaltyApplies = Boolean(this.data.documentoLegal.expediente?.aplicaPenalidad);

      if (this.penaltyApplies) {
        this.getPenalties();
      }
    } catch (err) {
      console.error(err);
      this.spinnerService.hide();
    }
  }

  private getPenalties() {
    this.dataService
      .getPenaltiesByExpediente(Number(this.params?.idExpediente))
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((data) => {
        if (data.length > 0) {
          data.forEach((penalty) => {
            const penaltyModel = new FormGroup({ ...new PenaltyModel() });
            penaltyModel.patchValue({ ...penalty, aplica: penalty.aplica || false });
            if (penalty.reiterancias.length > 0) {
              penalty.reiterancias.forEach((reiterancia) => {
                const reiterationModel = new FormGroup({ ...new ReiterationModel() });
                reiterationModel.patchValue(reiterancia);
                (penaltyModel.get('reiterancias') as FormArray).push(reiterationModel);
              });
            }
            (this.legalDocumentForm.get('penalidades') as FormArray).push(penaltyModel);
          });
          this.legalDocumentForm.disable();
        }
      });
  }
}
