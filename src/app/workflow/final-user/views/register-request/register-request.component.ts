import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogService } from '@speed/common/dialog';
import { ProcessType } from '@speed/common/enums';
import {
  Utils,
  addValidatorsToFilesContract,
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
import { IAbogadoResponsable, IProcess } from '@speed/common/interfaces';
import { IDocumentFileModel, IDocumentsTabModel } from '@speed/common/interfaces/forms';
import { MessageModalComponent } from '@speed/common/modals';
import { SpinnerOverlayService } from '@speed/common/services';
import { TabsComponent } from '@speed/common/tabs/components/tabs/tabs.component';
import { RegisterRequestService } from '@speed/final-user/common/services';
import { TabService } from '@speed/final-user/common/services/tab.service';
import { Subject, firstValueFrom, takeUntil } from 'rxjs';
import { Opciones, SubOpciones } from 'src/app/authentication/interfaces';

@Component({
  selector: 'app-register-request',
  templateUrl: './register-request.component.html',
  styleUrls: ['./register-request.component.scss'],
  providers: [RegisterRequestService],
})
export class RegisterRequestComponent implements OnInit, OnDestroy {
  @Input() public requestForm!: FormGroup;
  @Input() public responsibleLawyersList: IAbogadoResponsable[] = [];
  @Input() public procesos: IProcess[] = [];
  @ViewChild(TabsComponent) public tabsComponent!: TabsComponent;

  public readonly enumProcessType = ProcessType;
  private unsubscribe: Subject<void>;

  public constructor(
    private spinnerService: SpinnerOverlayService,
    private registerRequestService: RegisterRequestService,
    private dialogService: DialogService,
    private router: Router,
    private tabService: TabService,
  ) {
    this.unsubscribe = new Subject();
  }

  public ngOnInit(): void {
    this.subscribeChangeProcess();
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
  public selectAbogadoResponsable(event: Event) {
    const value = (event as CustomEvent).detail;
    this.requestForm.get('process.abogadoResponsable')?.setValue(value);
  }
  public async saveProgress() {
    switch (this.requestForm.value.requested.idProceso) {
      case ProcessType.CONTRATO:
        removeValidatorsAddendum(this.requestForm);
        setValidatorsSaveContract(this.requestForm);
        removeValidatorsToFilesContract(this.requestForm);
        break;
      case ProcessType.ADENDA:
        //Validaciones adenda
        removeValidatorsContract(this.requestForm);
        setValidatorsAddendumSaveProgress(this.requestForm);
        break;
      case ProcessType.ADENDA_AUTOMATICA:
        //Validaciones adenda automatica
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
      };

      this.registerRequestService.saveExpediente(paramsExpedient).subscribe(async (result) => {
        const paramsDocument = this.requestForm.value.process;
        const penalties = this.requestForm.value.penalties || [];
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
            penalidades: penalties,
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
        this.router.navigateByUrl('/speed/final-user/requests-to-send');
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

  buscarOpcionPorLink(opciones: Opciones[], linkBuscado: string): Opciones | null {
    for (const opcion of opciones) {
      // Verificar si la opción actual tiene el linkOpcion buscado
      if (opcion.linkOpcion === linkBuscado) {
        return opcion;
      }

      // Si tiene subOpciones, buscar recursivamente

      if (opcion.subOpciones) {
        const resultado = this.buscarOpcionPorLink(opcion.subOpciones, linkBuscado);
        if (resultado) {
          return resultado;
        }
      }
    }

    // Si no se encontró nada, devolver null
    return null;
  }

  public async sendRequest() {
    console.log(this.requestForm.value.tabApplicationDocuments.documentos[0].files);
    console.log(this.requestForm.value.tipoDocumento);

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
    console.log(this.requestForm);
    Utils.validateAllFields(this.requestForm);

    if (this.requestForm.valid) {
      const { requested, process, tipoDocumento } = this.requestForm.value;
      const idProceso = requested.idProceso;
      const codAdendaUnilateral = '56';

      const areEmailsValid = (representantesLegales: any[]) => {
        return representantesLegales.every(({ correo }: any) => correo && correo.trim().length > 0);
      };

      const areEmailsFormatValid = (representantesLegales: any[]) => {
        return representantesLegales.every(({ correo }: any) => Utils.isValidEmail(correo));
      };

      if (idProceso == +this.enumProcessType.ADENDA_AUTOMATICA) {
        const representantesLegales = process.adenda.representantesLegales;

        if (!areEmailsValid(representantesLegales)) {
          this.dialogService.show({
            component: MessageModalComponent,
            config: {
              data: {
                message: 'Ingrese correo de los representantes legales',
              },
            },
          });
          return;
        }

        if (!areEmailsFormatValid(representantesLegales)) {
          this.dialogService.show({
            component: MessageModalComponent,
            config: {
              data: {
                message: 'Revisar formato del correo de los representantes de la contraparte',
              },
            },
          });
          return;
        }

        if (tipoDocumento === codAdendaUnilateral) {
          const files = this.requestForm.value.tabApplicationDocuments.documentos[0].files;
          if (files.length <= 0) {
            this.dialogService.show({
              component: MessageModalComponent,
              config: {
                data: {
                  message: 'Adjunte los Documentos de Solicitud obligatorios',
                },
              },
            });
            return;
          }
        }
      }

      this.spinnerService.show();
      const paramsExpedient = {
        idProceso: Number(this.requestForm.value.requested.idProceso),
        aplicaPenalidad: this.requestForm.value.requested.aplicaPenalidad,
        titulo: '',
      };
      this.registerRequestService.saveExpediente(paramsExpedient).subscribe(async (result) => {
        const paramsDocument = this.requestForm.value.process;
        const penalties = this.requestForm.value.penalties || [];
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

        const results = Promise.all([
          ...arrayPromise, //Guardar archivos adjuntos
        ]);

        await results.then(
          () => firstValueFrom(this.registerRequestService.registerExpediente(paramsRecordFile)), //Registrar expediente
        );

        if (this.requestForm.value.requested.aplicaPenalidad) {
          await this.registerRequestService.savePenalidades({
            idExpediente: result.id,
            penalidades: penalties,
          });
        }

        this.spinnerService.hide();

        this.dialogService.show({
          component: MessageModalComponent,
          config: {
            data: {
              message: 'Solicitud enviada',
            },
          },
        });
        const userInfoString = localStorage.getItem('userInfo');
        if (userInfoString) {
          const userInfo = JSON.parse(userInfoString);
          const opcion = this.buscarOpcionPorLink(userInfo.listaOpciones, 'final-user/inbox');
          if (opcion) {
            this.tabService.actualizar(opcion);
            this.router.navigateByUrl('/speed/final-user/inbox');
          }
        }
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

  public getFormGroup(formGroup: string) {
    return this.requestForm.get(formGroup) as FormGroup;
  }

  public isInvalidControl(control: string): boolean {
    return (this.requestForm.get(control)?.invalid && this.requestForm.get(control)?.touched) || false;
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
          idExpediente,
          idTipoDocumento: applicationDocumentsForm.idTipoDocumento,
          titulo: applicationDocumentsForm.titulo,
          archivo: archivos,
        };
        if (archivos.length > 0) {
          array.push(firstValueFrom(this.registerRequestService.saveAttachedDocuments(params)));
        }
        const poderesTabModel = this.requestForm.value.tabPowers;

        const archivos2: Array<string> = [];
        poderesTabModel.documentos.forEach((item: IDocumentFileModel) => {
          archivos2.push(...item.files);
        });
        const params2 = {
          idExpediente,
          idTipoDocumento: poderesTabModel.idTipoDocumento,
          titulo: poderesTabModel.titulo,
          archivo: archivos2,
        };
        if (archivos2.length > 0) {
          array.push(firstValueFrom(this.registerRequestService.saveAttachedDocuments(params2)));
        }
        return array;
      }
      case ProcessType.ADENDA: {
        const applicationDocumentsForm: IDocumentsTabModel = this.requestForm.value.tabApplicationDocuments;
        const archivos: Array<string> = [];
        applicationDocumentsForm.documentos.forEach((item: IDocumentFileModel) => {
          archivos.push(...item.files);
        });
        const params = {
          idExpediente,
          idTipoDocumento: applicationDocumentsForm.idTipoDocumento,
          titulo: applicationDocumentsForm.titulo,
          archivo: archivos,
        };
        if (archivos.length > 0) {
          array.push(firstValueFrom(this.registerRequestService.saveAttachedDocuments(params)));
        }
        return array;
      }
      case ProcessType.ADENDA_AUTOMATICA: {
        const applicationDocumentsForm: IDocumentsTabModel = this.requestForm.value.tabApplicationDocuments;
        const archivos: Array<string> = [];
        applicationDocumentsForm.documentos.forEach((item: IDocumentFileModel) => {
          archivos.push(...item.files);
        });
        const params = {
          idExpediente,
          idTipoDocumento: applicationDocumentsForm.idTipoDocumento,
          titulo: applicationDocumentsForm.titulo,
          archivo: archivos,
        };
        if (archivos.length > 0) {
          array.push(firstValueFrom(this.registerRequestService.saveAttachedDocuments(params)));
        }
        return array;
      }
      default: {
        return [];
      }
    }
  }
}
