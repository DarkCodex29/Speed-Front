import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProcessType } from '@speed/common/enums';
import { IAbogadoResponsable, IContractInfo, IProcess, IResponseContractData, ITabDocuments, ITabModel } from '@speed/common/interfaces';
import { SpinnerOverlayService } from '@speed/common/services';
import { Subject, firstValueFrom, takeUntil } from 'rxjs';
import { ComboDataService, RegisterRequestService, RequestsToSendService } from '@speed/final-user/common/services';
import { DocumentsTabModel, LegalDocumentModel, NewRequestedModel } from '@speed/common/models';
import { TipoProcesosBD } from '@speed/common/enums/process-type.enum';
import {
  Utils,
  addValidatorsToFilesContract,
  getTabApplicationDocuments,
  getTabPowers,
  removeValidatorsAddendum,
  removeValidatorsContract,
  removeValidatorsToFilesContract,
  setValidatorsAddendumSaveProgress,
  setValidatorsAddendumSendRequest,
  setValidatorsAutomaticAddendumSaveProgress,
  setValidatorsAutomaticAddendumSendRequest,
  setValidatorsSaveContract,
  setValidatorsSendContract,
} from '@speed/common/helpers';
import { IDocumentFileModel, IDocumentsTabModel } from '@speed/common/interfaces/forms';
import { DialogService } from '@speed/common/dialog';
import { Router } from '@angular/router';
import { DeleteDocumentModalComponent, MessageModalComponent } from '@speed/common/modals';

@Component({
  selector: 'app-document-detail-rs',
  templateUrl: './document-detail-rs.component.html',
  styleUrls: ['./document-detail-rs.component.scss'],
  providers: [RequestsToSendService, RegisterRequestService, ComboDataService],
})
export class DocumentDetailRsComponent implements OnInit, OnDestroy {
  @Input() public idProceso?: number;
  @Input() public contract!: ITabModel;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Output() public readonly closeTab: EventEmitter<boolean>;

  public tabApplicationDocuments?: ITabDocuments;
  public tabPowers?: ITabDocuments;

  public isLoading = true;
  public requestForm!: FormGroup;
  public contractInfo!: IContractInfo;
  public responsibleLawyersList: IAbogadoResponsable[] = [];
  public procesos: IProcess[] = [];
  public flagPenalidad = false;
  public dataContract?: IResponseContractData;
  public flagVerificarInputs = false;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public data?: any;

  public readonly enumProcessType = ProcessType;
  private unsubscribe: Subject<void>;

  public constructor(
    private fb: FormBuilder,
    private dataService: ComboDataService,
    private spinnerService: SpinnerOverlayService,
    private requestsToSendService: RequestsToSendService,
    private registerRequestService: RegisterRequestService,
    private dialogService: DialogService,
    private router: Router,
    private comboDataService: ComboDataService,
  ) {
    this.closeTab = new EventEmitter();
    this.unsubscribe = new Subject();
  }

  public async ngOnInit() {
    this.isLoading = true;
    this.spinnerService.show();
    await this.recoverData();
    this.initForm();
    this.subscribeChangeProcess();
    await this.loadData();
    this.spinnerService.hide();
    this.isLoading = false;
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public selectAbogadoResponsable(event: Event) {
    const value = (event as CustomEvent).detail;
    this.requestForm.get('process.abogadoResponsable')?.setValue(value);
  }

  public getFormGroup(formGroup: string) {
    return this.requestForm.get(formGroup) as FormGroup;
  }

  public isInvalidControl(control: string): boolean {
    return (this.requestForm.get(control)?.invalid && this.requestForm.get(control)?.touched) || false;
  }

  public async loadData() {
    if (this.idProceso == this.enumProcessType.CONTRATO) {
      this.loadContratoData();
    } else if (this.idProceso == this.enumProcessType.ADENDA) {
      await this.loadAdendaData();
    } else if (this.idProceso == this.enumProcessType.ADENDA_AUTOMATICA) {
      await this.loadAdendaAutomaticaData();
    }
  }

  public async saveProgress() {
    switch (this.requestForm.value.requested.idProceso) {
      case ProcessType.CONTRATO:
        //Validaciones contrato
        this.requestForm.get('process.esContrato')?.setValue(true);
        this.requestForm.get('process.esAdenda')?.setValue(false);
        this.requestForm.get('process.esAdendaAutomatica')?.setValue(false);
        this.requestForm.get('process.adenda')?.disable();
        removeValidatorsAddendum(this.requestForm);
        setValidatorsSaveContract(this.requestForm);
        removeValidatorsToFilesContract(this.requestForm);
        break;
      case ProcessType.ADENDA:
        //Validaciones adenda
        this.requestForm.get('process.esContrato')?.setValue(false);
        this.requestForm.get('process.esAdenda')?.setValue(true);
        this.requestForm.get('process.esAdendaAutomatica')?.setValue(false);
        this.requestForm.get('process.contrato')?.disable();
        removeValidatorsContract(this.requestForm);
        setValidatorsAddendumSaveProgress(this.requestForm);
        break;
      case ProcessType.ADENDA_AUTOMATICA:
        //Validaciones adenda automatica
        this.requestForm.get('process.esContrato')?.setValue(false);
        this.requestForm.get('process.esAdenda')?.setValue(false);
        this.requestForm.get('process.esAdendaAutomatica')?.setValue(true);
        this.requestForm.get('process.contrato')?.disable();
        removeValidatorsContract(this.requestForm);
        setValidatorsAutomaticAddendumSaveProgress(this.requestForm);
        break;
    }
    Utils.validateAllFields(this.requestForm);

    if (this.requestForm.valid) {
      this.spinnerService.show();
      const paramsExpedient = {
        idProceso: Number(this.requestForm.value.requested.idProceso),
        aplicaPenalidad: this.requestForm.value.requested.aplicaPenalidad,
        titulo: '',
        idExpediente: this.requestForm.value.requested.idExpediente,
      };
      this.registerRequestService.saveExpediente(paramsExpedient).subscribe(async (result) => {
        const paramsDocument = this.requestForm.value.process;
        paramsDocument.idExpediente = result.id;
        paramsDocument.esAvance = true;
        paramsDocument.abogadoResponsable = paramsDocument.abogadoResponsable?.id ?? null;
        if (paramsDocument.contrato) {
          paramsDocument.contrato.idContraparte = paramsDocument.contrato?.idContraparte?.id ?? null;
        }
        if (paramsDocument.adenda) {
          paramsDocument.adenda.idContraparte = paramsDocument.adenda?.idContraparte?.id ?? null;
          paramsDocument.adenda.idContrato = paramsDocument.adenda?.idContrato?.idDocumentoLegal ?? null;
        }
        const arrayPromise = this.getAttachedDocuments(result.id, this.requestForm.value.requested.idProceso);
        await Promise.all([
          firstValueFrom(this.registerRequestService.saveDocumentoLegal(paramsDocument)), //Guardar documento legal
          ...arrayPromise, //Guardar archivos adjuntos
        ]);
        if (this.requestForm.value.requested.aplicaPenalidad) {
          await this.registerRequestService.savePenalidades({
            idExpediente: result.id,
            penalidades: this.requestForm.value.penalties,
          });
        }
        this.spinnerService.hide();

        this.dialogService.show({
          component: MessageModalComponent,
          config: {
            data: {
              message: 'Solicitud guardada',
            },
          },
        });
        this.closeTab.emit(true);
      });
    } else {
      this.dialogService.show({
        component: MessageModalComponent,
        config: {
          data: {
            message: 'Complete los campos obligatorios',
          },
        },
      });
    }
  }

  public async sendRequest() {
    switch (this.requestForm.value.requested.idProceso) {
      case +this.enumProcessType.CONTRATO:
        //Validaciones contrato
        this.requestForm.get('process.esContrato')?.setValue(true);
        this.requestForm.get('process.esAdenda')?.setValue(false);
        this.requestForm.get('process.esAdendaAutomatica')?.setValue(false);
        this.requestForm.get('process.adenda')?.disable();
        removeValidatorsAddendum(this.requestForm);
        setValidatorsSendContract(this.requestForm);
        addValidatorsToFilesContract(this.requestForm);
        break;
      case +this.enumProcessType.ADENDA:
        //Validaciones adenda
        this.requestForm.get('process.esContrato')?.setValue(false);
        this.requestForm.get('process.esAdenda')?.setValue(true);
        this.requestForm.get('process.esAdendaAutomatica')?.setValue(false);
        this.requestForm.get('process.contrato')?.disable();
        removeValidatorsContract(this.requestForm);
        setValidatorsAddendumSendRequest(this.requestForm);
        break;
      case +this.enumProcessType.ADENDA_AUTOMATICA:
        //Validaciones adenda automatica
        this.requestForm.get('process.esContrato')?.setValue(false);
        this.requestForm.get('process.esAdenda')?.setValue(false);
        this.requestForm.get('process.esAdendaAutomatica')?.setValue(true);
        this.requestForm.get('process.contrato')?.disable();
        removeValidatorsContract(this.requestForm);
        setValidatorsAutomaticAddendumSendRequest(this.requestForm);
        break;
    }
    Utils.validateAllFields(this.requestForm);

    if (this.requestForm.valid) {
      this.spinnerService.show();
      const paramsExpedient = {
        idProceso: Number(this.requestForm.value.requested.idProceso),
        aplicaPenalidad: this.requestForm.value.requested.aplicaPenalidad,
        titulo: '',
        idExpediente: this.requestForm.value.requested.idExpediente,
      };
      this.registerRequestService.saveExpediente(paramsExpedient).subscribe(async (result) => {
        const paramsDocument = this.requestForm.value.process;
        paramsDocument.idExpediente = result.id;
        paramsDocument.esAvance = false; //preguntar
        paramsDocument.abogadoResponsable = paramsDocument.abogadoResponsable?.id ?? null;

        if (paramsDocument.contrato) {
          paramsDocument.contrato.idContraparte = paramsDocument.contrato?.idContraparte?.id ?? null;
        }
        if (paramsDocument.adenda) {
          paramsDocument.adenda.idContraparte = paramsDocument.adenda?.idContraparte?.id ?? null;
          paramsDocument.adenda.idContrato = paramsDocument.adenda?.idContrato?.idDocumentoLegal ?? null;
        }

        const paramsRecordFile = {
          idExpediente: result.id,
          abogadoResponsable: this.requestForm.value.process.abogadoResponsable,
        };

        const arrayPromise = this.getAttachedDocuments(result.id, this.requestForm.value.requested.idProceso);
        await firstValueFrom(this.registerRequestService.saveDocumentoLegal(paramsDocument));

        if (this.requestForm.value.requested.aplicaPenalidad) {
          await this.registerRequestService.savePenalidades({
            idExpediente: result.id,
            penalidades: this.requestForm.value.penalties,
          });
        }

        const results = Promise.all([
          ...arrayPromise, //Guardar archivos adjuntos
        ]);

        await results.then(
          () => firstValueFrom(this.registerRequestService.registerExpediente(paramsRecordFile)), //Registrar expediente
        );

        this.spinnerService.hide();

        this.dialogService.show({
          component: MessageModalComponent,
          config: {
            data: {
              message: 'Solicitud enviada',
            },
          },
        });
        this.router.navigateByUrl('/speed/final-user/inbox');
      });
    } else {
      this.dialogService.show({
        component: MessageModalComponent,
        config: {
          data: {
            message: 'Complete los campos obligatorios',
          },
        },
      });
    }
  }

  public openModalEliminarSolicitud() {
    this.dialogService
      .show({
        component: DeleteDocumentModalComponent,
        config: {
          data: {
            idExpediente: this.requestForm.value.requested.idExpediente,
            accion: 'Eliminar',
            numero: null,
            eliminarSolicitud: true,
          },
        },
      })
      .afterClosed.subscribe((action) => {
        const response = action;
        if (response) {
          this.closeTab.emit(true);
        }
      });
  }

  private loadContratoData() {
    this.initTabsContract();
    this.requestForm.get('requested.idExpediente')?.setValue(this.data.datosContratoBean.documentoLegal.expediente.id);
    this.requestForm.get('process.idDocumentoLegal')?.setValue(this.data.datosContratoBean.documentoLegal.id);
    this.requestForm.get('process.abogadoResponsable')?.setValue(this.data.datosContratoBean.documentoLegal.responsable);
    this.requestForm.get('requested.aplicaPenalidad')?.setValue(this.data.datosContratoBean.documentoLegal.expediente?.aplicaPenalidad);
    if (this.data.datosContratoBean.documentoLegal.expediente?.aplicaPenalidad) {
      this.flagPenalidad = true;
    }
    // Contraparte
    this.requestForm.get('process.contrato.idContraparte')?.setValue(this.data.datosContratoBean.documentoLegal.contraparte);
    this.requestForm
      .get('process.contrato.situacionSunatContraparte')
      ?.setValue(this.data.datosContratoBean.documentoLegal.contraparte.situacionSunat);
    this.requestForm.get('process.contrato.domicilioContraparte')?.setValue(this.data.datosContratoBean.documentoLegal.cnt_domicilio);
    this.requestForm.get('process.contrato.nombreContraparte')?.setValue(this.data.datosContratoBean.documentoLegal.cnt_nombre_contacto);
    this.requestForm
      .get('process.contrato.telefonoContraparte')
      ?.setValue(this.data.datosContratoBean.documentoLegal.cnt_telefono_contacto);

    this.requestForm
      .get('process.contrato.numeroIdentificacion')
      ?.setValue(this.data.datosContratoBean.documentoLegal.contraparte.numeroIdentificacion);

    this.requestForm.get('process.contrato.emailContraparte')?.setValue(this.data.datosContratoBean.documentoLegal.cnt_correo_contacto);
    const arregloRepresentantes = this.requestForm.get('process.contrato.representantesLegales') as FormArray;
    for (const item of this.data.datosContratoBean.representantes) {
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
    // Elaboracion
    this.requestForm.get('process.contrato.idPais')?.setValue(this.data.datosContratoBean.idPais);
    this.requestForm.get('process.contrato.idCompania')?.setValue(this.data.datosContratoBean.idCompania);
    this.requestForm.get('process.contrato.idArea')?.setValue(this.data.datosContratoBean.documentoLegal.area.id);
    this.requestForm
      .get('process.contrato.propositoObservaciones')
      ?.setValue(this.data.datosContratoBean.documentoLegal.contrato.descripcion);
    const arregloUbicaciones = this.requestForm.get('process.contrato.ubicaciones') as FormArray;
    for (const item of this.data.datosContratoBean.ubicaciones) {
      const grupo = this.fb.group({
        idUbicacion: [item.id],
        nombre: [item.nombre],
      });
      arregloUbicaciones.push(grupo);
    }
    this.requestForm
      .get('process.contrato.fechaInicio')
      ?.setValue(
        this.data.datosContratoBean.documentoLegal.contrato?.fechaInicioFormat !== null
          ? this.data.datosContratoBean.documentoLegal.contrato?.fechaInicioFormat.split('/').reverse().join('-')
          : null,
      );
    this.requestForm
      .get('process.contrato.fechaFin')
      ?.setValue(
        this.data.datosContratoBean.documentoLegal.contrato?.fechaFinFormat !== null
          ? this.data.datosContratoBean.documentoLegal.contrato?.fechaFinFormat.split('/').reverse().join('-')
          : null,
      );
    this.requestForm.get('process.contrato.esIndefinido')?.setValue(this.data.datosContratoBean.documentoLegal.contrato?.indefinido);
    if (this.data.datosContratoBean.documentoLegal.contrato?.moneda !== null) {
      this.requestForm.get('process.contrato.idMoneda')?.setValue(this.data.datosContratoBean.documentoLegal.contrato?.moneda.id);
    }
    if (
      this.data.datosContratoBean.documentoLegal.contrato?.modalidad_pago === 'Precio Fijo' ||
      this.data.datosContratoBean.documentoLegal.contrato?.modalidad_pago === 'PF'
    ) {
      this.requestForm.get('process.contrato.modalidadPago')?.setValue('esPrecioFijo');
    } else if (
      this.data.datosContratoBean.documentoLegal.contrato?.modalidad_pago === 'Precio Unitario' ||
      this.data.datosContratoBean.documentoLegal.contrato?.modalidad_pago === 'PU'
    ) {
      this.requestForm.get('process.contrato.modalidadPago')?.setValue('esPrecioUnitario');
    }
    if (this.data.datosContratoBean.documentoLegal.contrato?.aplicaModalidadPago === 1) {
      this.requestForm.get('process.contrato.aplicaModalidadPago')?.setValue(true);
      this.requestForm.get('process.contrato.montoFijoTotalEstimado')?.enable();
    } else if (this.data.datosContratoBean.documentoLegal.contrato?.aplicaModalidadPago === 0) {
      this.requestForm.get('process.contrato.aplicaModalidadPago')?.setValue(false);
    }
    if (this.data.datosContratoBean.documentoLegal.contrato?.monto !== null) {
      this.requestForm.get('process.contrato.montoFijoTotalEstimado')?.setValue(this.data.datosContratoBean.documentoLegal.contrato?.monto);
    }
    this.requestForm.get('process.contrato.aplicaAdelanto')?.setValue(this.data.datosContratoBean.documentoLegal.contrato?.adelanto);
    if (this.data.datosContratoBean.documentoLegal.contrato?.adelanto) {
      this.requestForm.get('process.contrato.montoAdelanto')?.enable();
    }
    if (this.data.datosContratoBean.documentoLegal.contrato?.monto_adelanto !== null) {
      this.requestForm.get('process.contrato.montoAdelanto')?.setValue(this.data.datosContratoBean.documentoLegal.contrato?.monto_adelanto);
    }
    this.requestForm
      .get('process.contrato.aplicaRenovacionAutomatica')
      ?.setValue(this.data.datosContratoBean.documentoLegal.contrato?.renovacion_auto);
    if (this.data.datosContratoBean.documentoLegal.contrato?.renovacion_auto) {
      this.requestForm.get('process.contrato.periodoRenovar')?.enable();
    }
    if (this.data.datosContratoBean.documentoLegal.contrato?.periodo_renovar) {
      this.requestForm
        .get('process.contrato.periodoRenovar')
        ?.setValue(this.data.datosContratoBean.documentoLegal.contrato?.periodo_renovar);
    }
    if (this.data.datosContratoBean.documentoLegal.contrato?.aplicaPeriodicidad === 1) {
      this.requestForm.get('process.contrato.aplicaPeriodicidad')?.setValue(true);
      this.requestForm.get('process.contrato.periodicidadPago')?.enable();
    } else if (this.data.datosContratoBean.documentoLegal.contrato?.aplicaPeriodicidad === 0) {
      this.requestForm.get('process.contrato.aplicaPeriodicidad')?.setValue(false);
    }
    if (this.data.datosContratoBean.documentoLegal.contrato?.periodicidad !== null) {
      this.requestForm
        .get('process.contrato.periodicidadPago')
        ?.setValue(this.data.datosContratoBean.documentoLegal.contrato?.periodicidad);
    }
    this.requestForm
      .get('process.contrato.aplicaArrendamiento')
      ?.setValue(this.data.datosContratoBean.documentoLegal.contrato?.arrendamiento);
    this.flagVerificarInputs = true;

    for (const documentAux of this.data.datosContratoBean.documentos) {
      if (documentAux.tipoDocumento.nombre == 'Documentos Solicitud') {
        this.requestForm.get('tabApplicationDocuments')?.get('id')?.setValue(documentAux.id);
        for (const file of documentAux.archivos) {
          const control = new FormControl(file.nombreArchivoDisco + '-' + file.fila, Validators.required);
          this.tabApplicationDocuments?.requiredFiles[file.fila - 1].files.push({
            name: file.nombre,
            path: file.nombreArchivoDisco,
            size: '0',
          });
          ((this.requestForm.get('tabApplicationDocuments.documentos') as FormArray).at(file.fila - 1).get('files') as FormArray).push(
            control,
          );
        }
      } else if (documentAux.tipoDocumento.nombre == 'Poderes') {
        this.requestForm.get('tabPowers')?.get('id')?.setValue(documentAux.id);
        for (const file of documentAux.archivos) {
          const control = new FormControl(file.nombreArchivoDisco + '-' + file.fila, Validators.required);
          this.tabPowers?.requiredFiles[file.fila - 1].files.push({
            name: file.nombre,
            path: file.nombreArchivoDisco,
            size: '0',
          });
          ((this.requestForm.get('tabPowers.documentos') as FormArray).at(file.fila - 1).get('files') as FormArray).push(control);
        }
      }
    }
  }

  private async loadAdendaAutomaticaData() {
    this.requestForm.get('requested.idExpediente')?.setValue(this.data.datosAdendaBean.documentoLegal.expediente.id);
    this.requestForm.get('process.idDocumentoLegal')?.setValue(this.data.datosAdendaBean.documentoLegal.id);
    this.requestForm.get('process.abogadoResponsable')?.setValue(this.data.datosAdendaBean.documentoLegal.responsable);
    await this.loadDataAdendaContrato(this.data.datosAdendaBean.adenda?.contrato.id);
    //Contraparte
    this.requestForm.get('process.adenda.idContraparte')?.setValue(this.data.datosAdendaBean.documentoLegal.contraparte);
    //this.requestForm.get('process.adenda.idContrato')?.setValue(this.data.datosAdendaBean.adenda?.contrato.id);
    this.requestForm.get('process.adenda.nameCounterPart')?.setValue(this.data.datosAdendaBean.documentoLegal.contraparte.nombres);
    this.requestForm.get('process.adenda.domicilioContraparte')?.setValue(this.data.datosAdendaBean.documentoLegal.cnt_domicilio);
    this.requestForm.get('process.adenda.nombreContraparte')?.setValue(this.data.datosAdendaBean.documentoLegal.cnt_nombre_contacto);
    this.requestForm.get('process.adenda.telefonoContraparte')?.setValue(this.data.datosAdendaBean.documentoLegal.cnt_telefono_contacto);
    this.requestForm.get('process.adenda.emailContraparte')?.setValue(this.data.datosAdendaBean.documentoLegal.cnt_correo_contacto);
    this.requestForm.get('process.adenda.tipoDocumento')?.setValue(this.data.datosAdendaBean.adenda.hcTipoContrato.id);
    this.requestForm
      .get('process.adenda.situacionSunatContraparte')
      ?.setValue(this.data.datosAdendaBean.documentoLegal.contraparte.situacionSunat);
    this.requestForm
      .get('process.adenda.numeroIdentificacion')
      ?.setValue(this.data.datosAdendaBean.documentoLegal.contraparte.numeroIdentificacion);

    this.initTabsAddendum();
    const arregloRepresentantes = this.requestForm.get('process.adenda.representantesLegales') as FormArray;
    for (const item of this.data.datosAdendaBean.representantes) {
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

    const arregloUbicaciones = this.requestForm.get('process.adenda.ubicaciones') as FormArray;
    for (const item of this.data.datosAdendaBean.ubicaciones) {
      const grupo = this.fb.group({
        idUbicacion: [item.id],
        nombre: [item.nombre],
        esNuevo: null,
        eliminado: null,
      });
      arregloUbicaciones.push(grupo);
    }

    this.requestForm
      .get('process.adenda.fechaInicio')
      ?.setValue(
        this.data.datosAdendaBean.adenda?.inicioVigenciaFormat !== ''
          ? this.data.datosAdendaBean.adenda?.inicioVigenciaFormat.split('/').reverse().join('-')
          : null,
      );
    this.requestForm.get('process.adenda.aplicaFechaFin')?.setValue(this.data.datosAdendaBean.adenda?.modifica_fin);
    if (this.data.datosAdendaBean.adenda?.modifica_fin) {
      this.requestForm
        .get('process.adenda.fechaFin')
        ?.setValue(
          this.data.datosAdendaBean.adenda?.nuevaFechaFinFormat !== ''
            ? this.data.datosAdendaBean.adenda?.nuevaFechaFinFormat.split('/').reverse().join('-')
            : null,
        );
      this.requestForm.get('process.adenda.esIndefinido')?.setValue(this.data.datosAdendaBean.adenda?.indefinido);
    }
    this.requestForm.get('process.adenda.propositoObservaciones')?.setValue(this.data.datosAdendaBean.adenda?.descripcion);
    for (const documentAux of this.data.datosAdendaBean.documentos) {
      this.requestForm.get('tabApplicationDocuments')?.get('id')?.setValue(documentAux.id);
      for (const file of documentAux.archivos) {
        const control = new FormControl(file.nombreArchivoDisco + '-' + file.fila, Validators.required);
        this.tabApplicationDocuments?.requiredFiles[0].files.push({
          name: file.nombre,
          path: file.nombreArchivoDisco,
          size: '0',
        });
        ((this.requestForm.get('tabApplicationDocuments.documentos') as FormArray).at(0).get('files') as FormArray).push(control);
      }
    }
  }

  private async loadAdendaData() {
    this.requestForm.get('requested.idExpediente')?.setValue(this.data.datosAdendaBean.documentoLegal.expediente.id);
    this.requestForm.get('process.idDocumentoLegal')?.setValue(this.data.datosAdendaBean.documentoLegal.id);
    this.requestForm.get('process.abogadoResponsable')?.setValue(this.data.datosAdendaBean.documentoLegal.responsable);
    await this.loadDataAdendaContrato(this.data.datosAdendaBean.adenda?.contrato.id);
    //Contraparte
    this.requestForm.get('process.adenda.idContraparte')?.setValue(this.data.datosAdendaBean.documentoLegal.contraparte);
    //this.requestForm.get('process.adenda.idContrato')?.setValue(this.data.datosAdendaBean.adenda?.contrato.id);
    this.requestForm.get('process.adenda.nameCounterPart')?.setValue(this.data.datosAdendaBean.documentoLegal.contraparte.nombres);
    this.requestForm.get('process.adenda.domicilioContraparte')?.setValue(this.data.datosAdendaBean.documentoLegal.cnt_domicilio);
    this.requestForm.get('process.adenda.nombreContraparte')?.setValue(this.data.datosAdendaBean.documentoLegal.cnt_nombre_contacto);
    this.requestForm.get('process.adenda.telefonoContraparte')?.setValue(this.data.datosAdendaBean.documentoLegal.cnt_telefono_contacto);
    this.requestForm.get('process.adenda.emailContraparte')?.setValue(this.data.datosAdendaBean.documentoLegal.cnt_correo_contacto);
    this.requestForm
      .get('process.adenda.situacionSunatContraparte')
      ?.setValue(this.data.datosAdendaBean.documentoLegal.contraparte.situacionSunat);
    this.requestForm
      .get('process.adenda.numeroIdentificacion')
      ?.setValue(this.data.datosAdendaBean.documentoLegal.contraparte.numeroIdentificacion);

    this.initTabsAddendum();
    const arregloRepresentantes = this.requestForm.get('process.adenda.representantesLegales') as FormArray;
    for (const item of this.data.datosAdendaBean.representantes) {
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

    const arregloUbicaciones = this.requestForm.get('process.adenda.ubicaciones') as FormArray;
    for (const item of this.data.datosAdendaBean.ubicaciones) {
      const grupo = this.fb.group({
        idUbicacion: [item.id],
        nombre: [item.nombre],
        esNuevo: null,
        eliminado: null,
      });
      arregloUbicaciones.push(grupo);
    }

    this.requestForm
      .get('process.adenda.fechaInicio')
      ?.setValue(
        this.data.datosAdendaBean.adenda?.inicioVigenciaFormat !== ''
          ? this.data.datosAdendaBean.adenda?.inicioVigenciaFormat.split('/').reverse().join('-')
          : null,
      );
    this.requestForm.get('process.adenda.aplicaFechaFin')?.setValue(this.data.datosAdendaBean.adenda?.modifica_fin);
    if (this.data.datosAdendaBean.adenda?.modifica_fin) {
      this.requestForm
        .get('process.adenda.fechaFin')
        ?.setValue(
          this.data.datosAdendaBean.adenda?.nuevaFechaFinFormat !== ''
            ? this.data.datosAdendaBean.adenda?.nuevaFechaFinFormat.split('/').reverse().join('-')
            : null,
        );
      this.requestForm.get('process.adenda.esIndefinido')?.setValue(this.data.datosAdendaBean.adenda?.indefinido);
    }
    this.requestForm.get('process.adenda.propositoObservaciones')?.setValue(this.data.datosAdendaBean.adenda?.descripcion);
    for (const documentAux of this.data.datosAdendaBean.documentos) {
      this.requestForm.get('tabApplicationDocuments')?.get('id')?.setValue(documentAux.id);
      for (const file of documentAux.archivos) {
        const control = new FormControl(file.nombreArchivoDisco + '-' + file.fila, Validators.required);
        this.tabApplicationDocuments?.requiredFiles[0].files.push({
          name: file.nombre,
          path: file.nombreArchivoDisco,
          size: '0',
        });
        ((this.requestForm.get('tabApplicationDocuments.documentos') as FormArray).at(0).get('files') as FormArray).push(control);
      }
    }
  }
  private async loadDataAdendaContrato(idContrato: number) {
    const dataContrato = await this.comboDataService.filterContractById(idContrato);
    this.requestForm.get('process.adenda.idContrato')?.setValue(dataContrato);
    this.contractInfo = await this.comboDataService.getInfoContract(String(dataContrato.idDocumentoLegal));
    this.contractInfo.numeroAdenda = this.data.datosAdendaBean.adenda.secuencia;
  }
  private initForm() {
    this.requestForm = this.fb.group({
      requested: new FormGroup({ ...new NewRequestedModel() }),
      process: new FormGroup({ ...new LegalDocumentModel() }),
      penalties: new FormArray<FormGroup>([]),
    });
    this.requestForm.get('requested.idProceso')?.setValue(this.idProceso);
  }

  private async recoverData() {
    try {
      this.responsibleLawyersList = await this.dataService.getResponsibleLawyers();
      this.procesos = await this.dataService.getProcesos(TipoProcesosBD.PROCESO_HC);
      this.data = await this.requestsToSendService.obtenerDetalle(Number(this.idProceso), this.contract.id);
    } catch (err) {
      console.error(err);
    } finally {
      this.isLoading = false;
      this.spinnerService.hide();
    }
  }

  private subscribeChangeProcess() {
    this.requestForm
      .get('requested.idProceso')
      ?.valueChanges.pipe(takeUntil(this.unsubscribe))
      .subscribe((value) => {
        this.requestForm.removeControl('tabApplicationDocuments');
        this.requestForm.removeControl('tabPowers');

        switch (value) {
          case this.enumProcessType.CONTRATO:
            this.requestForm.get('process.esContrato')?.setValue(true);
            this.requestForm.get('process.esAdenda')?.setValue(false);
            this.requestForm.get('process.esAdendaAutomatica')?.setValue(false);
            this.requestForm.get('process.adenda')?.disable();
            this.requestForm.get('process.contrato')?.enable();
            break;
          case this.enumProcessType.ADENDA:
            this.requestForm.get('process.esContrato')?.setValue(false);
            this.requestForm.get('process.esAdenda')?.setValue(true);
            this.requestForm.get('process.esAdendaAutomatica')?.setValue(false);
            this.requestForm.get('process.contrato')?.disable();
            this.requestForm.get('process.adenda')?.enable();
            break;
          case this.enumProcessType.ADENDA_AUTOMATICA:
            this.requestForm.get('process.esContrato')?.setValue(false);
            this.requestForm.get('process.esAdenda')?.setValue(false);
            this.requestForm.get('process.esAdendaAutomatica')?.setValue(true);
            this.requestForm.get('process.contrato')?.disable();
            this.requestForm.get('process.adenda')?.enable();
            break;
        }
      });
  }

  private getAttachedDocuments(idExpediente: number, process: ProcessType) {
    const array = [];
    switch (process) {
      case ProcessType.CONTRATO: {
        const applicationDocumentsForm: IDocumentsTabModel = this.requestForm.value.tabApplicationDocuments;
        const archivos: Array<string> = [];
        applicationDocumentsForm.documentos.forEach((item: IDocumentFileModel) => {
          archivos.push(...item.files);
        });
        const params = {
          id: applicationDocumentsForm.id,
          idExpediente,
          idTipoDocumento: applicationDocumentsForm.idTipoDocumento,
          titulo: applicationDocumentsForm.titulo,
          archivo: archivos.length == 0 ? null : archivos,
        };
        array.push(firstValueFrom(this.registerRequestService.saveAttachedDocuments(params)));
        const poderesTabModel = this.requestForm.value.tabPowers;

        const archivos2: Array<string> = [];
        poderesTabModel.documentos.forEach((item: IDocumentFileModel) => {
          archivos2.push(...item.files);
        });
        const params2 = {
          idExpediente,
          id: poderesTabModel.id,

          idTipoDocumento: poderesTabModel.idTipoDocumento,
          titulo: poderesTabModel.titulo,
          archivo: archivos2.length == 0 ? null : archivos2,
        };
        array.push(firstValueFrom(this.registerRequestService.saveAttachedDocuments(params2)));

        return array;
      }
      case ProcessType.ADENDA: {
        const applicationDocumentsForm: IDocumentsTabModel = this.requestForm.value.tabApplicationDocuments;
        const archivos: Array<string> = [];
        applicationDocumentsForm.documentos.forEach((item: IDocumentFileModel) => {
          archivos.push(...item.files);
        });
        const params = {
          id: this.data.datosAdendaBean.documentos[0].id,
          idExpediente,
          idTipoDocumento: applicationDocumentsForm.idTipoDocumento,
          titulo: applicationDocumentsForm.titulo,
          archivo: archivos.length == 0 ? null : archivos,
        };
        array.push(firstValueFrom(this.registerRequestService.saveAttachedDocuments(params)));
        return array;
      }
      case ProcessType.ADENDA_AUTOMATICA: {
        const applicationDocumentsForm: IDocumentsTabModel = this.requestForm.value.tabApplicationDocuments;
        const archivos: Array<string> = [];
        applicationDocumentsForm.documentos.forEach((item: IDocumentFileModel) => {
          archivos.push(...item.files);
        });
        const params = {
          id: this.data.datosAdendaBean.documentos[0].id,
          idExpediente,
          idTipoDocumento: applicationDocumentsForm.idTipoDocumento,
          titulo: applicationDocumentsForm.titulo,
          archivo: archivos.length == 0 ? null : archivos,
        };
        array.push(firstValueFrom(this.registerRequestService.saveAttachedDocuments(params)));

        return array;
      }
      default: {
        return [];
      }
    }
  }
  private initTabsAddendum() {
    this.tabApplicationDocuments = getTabApplicationDocuments(ProcessType.ADENDA);
    const documentsTabModel = new DocumentsTabModel(this.tabApplicationDocuments);
    this.requestForm.addControl('tabApplicationDocuments', this.fb.group(documentsTabModel));
  }

  private initTabsContract() {
    this.tabApplicationDocuments = getTabApplicationDocuments(ProcessType.CONTRATO);
    const documentsTabModel = new DocumentsTabModel(this.tabApplicationDocuments);
    this.requestForm.addControl('tabApplicationDocuments', this.fb.group(documentsTabModel));
    this.tabPowers = getTabPowers();
    const poderesTabModel = new DocumentsTabModel(this.tabPowers);
    this.requestForm.addControl('tabPowers', this.fb.group(poderesTabModel));
  }
}
