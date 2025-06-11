import { NgFor, NgIf } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { IContractBean } from 'src/app/workflow/final-user/views/inbox/common/interfaces';
import { ComboDataService, InboxService } from '@speed/final-user/common/services';
import { SpinnerOverlayService, DatosContratoService } from '@speed/common/services';
import { DialogConfig, DialogRef, DialogService } from '@speed/common/dialog';
import {
  IAbogadoResponsable,
  IArea,
  ICompany,
  ICounterPartBD,
  ICountry,
  ICustomerType,
  IRequestingUser,
  IResponseContractData,
} from '@speed/common/interfaces';
import { ProcessType } from '@speed/common/enums';
import { LegalAreaModel, LegalDocumentModel } from '@speed/common/models';
import { CustomReactiveFormDirective } from '@speed/common/directives';
import { MessageModalComponent } from '@speed/common/modals';
import { FinalUserComponentsModule } from '@speed/final-user/common/components';

@Component({
  standalone: true,
  selector: 'app-adenda-data-modal',
  templateUrl: './adenda-data-modal.component.html',
  styleUrls: ['./adenda-data-modal.component.scss'],
  providers: [InboxService, ComboDataService, DatosContratoService],
  imports: [NgIf, NgFor, ReactiveFormsModule, FinalUserComponentsModule, CustomReactiveFormDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdendaDataModalComponent implements OnInit, OnDestroy {
  public requestForm!: FormGroup;
  public formRequest!: FormGroup;
  public showButtonEdit = true;
  public modifiedResponsibleLawyerOrRequesting = false;
  public data!: IResponseContractData;
  public customerTypeList: Array<ICustomerType> = [];
  public counterpartList: Array<ICounterPartBD> = [];
  public legalRepresentativesList: Array<ICounterPartBD> = [];
  public countriesList: Array<ICountry> = [];
  public companiesList: Array<ICompany> = [];
  public areasList: Array<IArea> = [];
  public responsibleLawyersList: IAbogadoResponsable[] = [];
  public requestingUsersList: IRequestingUser[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public dataDialog: any;
  public loading = true;
  public disableInputs = true;
  public readonly enumProcessType = ProcessType;
  private unsubscribe: Subject<void>;
  private params: IContractBean = {
    idExpediente: 13920,
    idTraza: 128970,
  };

  public constructor(
    private fb: FormBuilder,
    private inboxService: InboxService,
    private dataService: ComboDataService,
    private spinnerService: SpinnerOverlayService,
    private dialogRef: DialogRef<unknown>,
    private dialogConfig: DialogConfig,
    private dialogService: DialogService,
    private datosContratoService: DatosContratoService,
  ) {
    this.unsubscribe = new Subject();
  }

  public async ngOnInit() {
    this.spinnerService.show();
    this.dataDialog = this.dialogConfig.data || {};
    this.params = this.dataDialog;
    await this.recoverData();
    this.initForm();
    // this.initFormAddendum();
    this.loadData();
    this.desactivarInputs();
    this.loading = false;
    this.spinnerService.hide();
  }
  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public get addendumForm() {
    return this.requestForm.get('adenda') as FormGroup;
  }

  public editData() {
    this.showButtonEdit = false;
    this.activarInputs();
    this.requestForm
      .get('abogadoResponsable')
      ?.valueChanges.pipe(takeUntil(this.unsubscribe))
      .subscribe(() => {
        this.modifiedResponsibleLawyerOrRequesting = true;
      });
    this.requestForm
      .get('solicitante')
      ?.valueChanges.pipe(takeUntil(this.unsubscribe))
      .subscribe(() => {
        this.modifiedResponsibleLawyerOrRequesting = true;
      });
  }

  public activarInputs() {
    this.requestForm.enable();
    this.disableInputs = false;
    // this.addendumForm.enable();
  }

  public saveData() {
    this.requestForm.get('contrato')?.disable();
    this.addendumForm.get('idOperacion')?.setValue(null);
    this.addendumForm.get('idOficina')?.setValue(null);
    this.addendumForm.get('idProyecto')?.setValue(null);
    this.addendumForm.get('tipoDocumento')?.setValue(null);
    this.addendumForm.get('idContrato')?.setValue(this.data.documentoLegal.adenda?.contrato?.id);
    this.addendumForm.get('exploracion')?.setValue(null);
    this.spinnerService.show();
    const values = this.requestForm.value;
    const params = {
      ...values,
      abogadoResponsable: values.abogadoResponsable.id,
      solicitante: values.solicitante.id,
      contrato: null,
    };

    this.datosContratoService
      .guardarDocumentoLegal(params)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe({
        next: () => {
          this.spinnerService.hide();
          this.dialogRef.close({ modified: true, changeResponsible: this.modifiedResponsibleLawyerOrRequesting });
          this.dialogService.show({
            component: MessageModalComponent,
            config: {
              data: {
                message: 'Solicitud guardada',
              },
            },
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
  }

  public cancelAction() {
    this.desactivarInputs();
    this.showButtonEdit = true;
  }

  public desactivarInputs() {
    this.requestForm.disable();
    this.addendumForm.disable();
    this.disableInputs = true;
  }

  public seleccionarAbogadoResponsable(event: Event) {
    const value = (event as CustomEvent).detail;
    this.requestForm.get('abogadoResponsable')?.setValue(value);
  }

  public seleccionarSolicitante(event: Event) {
    const value = (event as CustomEvent).detail;
    this.requestForm.get('solicitante')?.setValue(value);
  }

  public close() {
    this.dialogRef.close({ modified: false, changeResponsible: false });
  }

  public loadData() {
    this.requestForm.get('idDocumentoLegal')?.setValue(this.data.documentoLegal.id);
    this.requestForm.get('idExpediente')?.setValue(this.params.idExpediente);
    this.requestForm.get('esAdenda')?.setValue(true);
    this.requestForm.get('tipoContrato')?.setValue(this.data.documentoLegal.adenda?.contrato.tipo_contrato?.id);

    this.requestForm.get('abogadoResponsable')?.setValue(this.data.documentoLegal.responsable);
    this.requestForm.get('sumilla')?.setValue(this.data.documentoLegal.sumilla);
    this.requestForm.get('solicitante')?.setValue(this.data.documentoLegal.solicitante);

    this.requestForm
      .get('fechaBorrador')
      ?.setValue(
        this.data.documentoLegal.fechaBorradorFormat !== null
          ? this.data.documentoLegal.fechaBorradorFormat.split('/').reverse().join('-')
          : null,
      );

    this.addendumForm.get('idContraparte')?.setValue(this.data.documentoLegal.contraparte.id);
    this.addendumForm.get('idContrato')?.setValue(this.data.documentoLegal.adenda?.contrato.id);
    this.addendumForm.get('nameCounterPart')?.setValue(this.data.documentoLegal.contraparte.nombres);
    this.addendumForm.get('domicilioContraparte')?.setValue(this.data.documentoLegal.cnt_domicilio);
    this.addendumForm.get('nombreContraparte')?.setValue(this.data.documentoLegal.cnt_nombre_contacto);
    this.addendumForm.get('telefonoContraparte')?.setValue(this.data.documentoLegal.cnt_telefono_contacto);
    this.addendumForm.get('emailContraparte')?.setValue(this.data.documentoLegal.cnt_correo_contacto);
    this.addendumForm.get('numeroIdentificacion')?.setValue(this.data.documentoLegal.contraparte.numeroIdentificacion);
    this.addendumForm.get('situacionSunatContraparte')?.setValue(this.data.documentoLegal.contraparte.situacionSunat);
    const arregloRepresentantes = this.addendumForm.get('representantesLegales') as FormArray;
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

    const arregloUbicaciones = this.addendumForm.get('ubicaciones') as FormArray;
    for (const item of this.data.ubicaciones) {
      const grupo = this.fb.group({
        idUbicacion: [item.id],
        nombre: [item.nombre],
        esNuevo: null,
        eliminado: null,
      });
      arregloUbicaciones.push(grupo);
    }

    this.addendumForm
      .get('fechaInicio')
      ?.setValue(
        this.data.documentoLegal.adenda?.inicioVigenciaFormat !== ''
          ? this.data.documentoLegal.adenda?.inicioVigenciaFormat.split('/').reverse().join('-')
          : null,
      );
    this.addendumForm.get('aplicaFechaFin')?.setValue(this.data?.documentoLegal?.adenda?.modifica_fin);
    if (this.data?.documentoLegal?.adenda?.modifica_fin) {
      this.addendumForm
        .get('fechaFin')
        ?.setValue(
          this.data.documentoLegal.adenda?.nuevaFechaFinFormat !== ''
            ? this.data.documentoLegal.adenda?.nuevaFechaFinFormat.split('/').reverse().join('-')
            : null,
        );
      this.addendumForm.get('esIndefinido')?.setValue(this.data?.documentoLegal?.adenda?.indefinido);
    }
    this.addendumForm.get('propositoObservaciones')?.setValue(this.data?.documentoLegal?.adenda?.descripcion);
  }

  private initForm() {
    this.requestForm = this.fb.group({ ...new LegalDocumentModel(), ...new LegalAreaModel() });
  }

  private async recoverData() {
    try {
      const responses = await Promise.all([
        this.inboxService.obtenerbotonDatosContrato(this.params),
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
      this.requestingUsersList = responses[8];
    } catch (err) {
      console.error(err);
      this.spinnerService.hide();
    }
  }
}
