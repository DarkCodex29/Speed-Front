import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogService } from '@speed/common/dialog';
import { ProcessType } from '@speed/common/enums';
import { Utils } from '@speed/common/helpers';
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
import { IDocumentFileModel, IDocumentsTabModel } from '@speed/common/interfaces/forms';
import { MessageModalComponent, NoticeValidityModalComponent } from '@speed/common/modals';
import { SpinnerOverlayService } from '@speed/common/services';
import { RegisterRequestService } from '@speed/final-user/common/services';
import { Subject, firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-register-manual-contract',
  templateUrl: './register-manual-contract.component.html',
  styleUrls: ['./register-manual-contract.component.scss'],
  providers: [RegisterRequestService],
})
export class RegisterManualContractComponent implements OnInit, OnDestroy {
  @Input() public requestForm!: FormGroup;
  @Input() public tabApplicationDocuments?: ITabDocuments;
  @Input() public tabPowers?: ITabDocuments;
  @Input() public tabContract?: ITabDocuments;
  @Input() public countriesList: ICountry[] = [];
  @Input() public companiesList: ICompany[] = [];
  @Input() public areasList: IArea[] = [];
  @Input() public counterpartList: ICounterPartBD[] = [];
  @Input() public legalRepresentativesList: ICounterPartBD[] = [];
  @Input() public customerTypeList: ICustomerType[] = [];
  @Input() public tiposContratoList: IContractType[] = [];
  @Input() public requestingUserList: IAbogadoResponsable[] = [];
  @Input() public responsibleLawyersList: IAbogadoResponsable[] = [];
  public contractForm!: FormGroup;
  public formRequest!: FormGroup;
  public readonly enumProcessType = ProcessType;
  private unsubscribe: Subject<void>;

  public constructor(
    private spinnerService: SpinnerOverlayService,
    private registerRequestService: RegisterRequestService,
    private dialogService: DialogService,
    private router: Router,
  ) {
    this.unsubscribe = new Subject();
  }

  public ngOnInit(): void {
    this.initForm();
    this.initFormContract();
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
  public selectUserRequesting(event: Event) {
    const customEvent = event as CustomEvent;
    this.requestForm.get('requested.solicitante')?.setValue(customEvent.detail);
  }

  public selectResponsibleLawyer(event: Event) {
    const customEvent = event as CustomEvent;
    this.requestForm.get('requested.abogadoResponsable')?.setValue(customEvent.detail);
  }

  public isInvalidControl(control: string): boolean {
    return (this.requestForm.get(control)?.invalid && this.requestForm.get(control)?.touched) || false;
  }

  public getFormGroup(formGroup: string) {
    return this.requestForm.get(formGroup) as FormGroup;
  }

  public async presionarBoton() {
    //const paramsDocument = this.requestForm.value.requested;
    const representantesLegales = this.requestForm.value.requested.contrato.representantesLegales;
    let correosRepresentantesLegalesValid = true;
    if(representantesLegales){
      correosRepresentantesLegalesValid = representantesLegales.every(({correo}:any) => correo!=null && correo.trim().length !== 0);
    }
    Utils.validateAllFields(this.requestForm);
    if (this.requestForm.valid) {
      if(correosRepresentantesLegalesValid){
        this.spinnerService.show();
        const paramsExpedient = {
          idProceso: Number(ProcessType.CONTRATO),
          aplicaPenalidad: false,
          titulo: this.requestForm.value.requested.sumilla,
        };
        this.registerRequestService.saveExpediente(paramsExpedient).subscribe(async (result) => {
          const solicitante = this.requestForm.value.requested.solicitante;
          const responsable = this.requestForm.value.requested.abogadoResponsable;
          const paramsDocument = this.requestForm.value.requested;
          paramsDocument.idExpediente = result.id;
          paramsDocument.solicitante = paramsDocument.solicitante.id;
          paramsDocument.abogadoResponsable = paramsDocument.abogadoResponsable.id;
          paramsDocument.contrato.idContraparte = paramsDocument.contrato.idContraparte.id;
          paramsDocument.esAvance = false;
          paramsDocument.adenda = null;
          // const paramsRecordFile = {
          //   idExpediente: result.id,
          //   idResponsable: paramsDocument.abogadoResponsable,
          //   usuarios: [
          //     { id: 447, usuario: 'WILDER CEVALLOS MAMANI', esGrupo: 0 },
          //     { id: 1, usuario: 'Grupo - Comunes', esGrupo: 1 },
          //   ],
          // };
  
          const arrayPromise = this.getAttachedDocuments(result.id);
  
          await Promise.all([
            firstValueFrom(this.registerRequestService.saveDocumentoLegal(paramsDocument)), //Guardar documento legal
            ...arrayPromise, //Guardar archivos adjuntos
          ]);
          // await firstValueFrom(this.registerRequestService.saveManualLegalDocument(paramsRecordFile)); //Registrar expediente
  
          // this.spinnerService.hide();
          // this.requestForm.reset();
  
          // this.dialogService.show({
          //   component: MessageModalComponent,
          //   config: {
          //     data: {
          //       message: 'Solicitud guardada',
          //     },
          //   },
          // });
          this.spinnerService.hide();
  
          this.dialogService
            .show({
              component: NoticeValidityModalComponent,
              config: {
                data: {
                  solicitante: solicitante,
                  responsable: responsable,
                  idExpediente: result.id,
                },
              },
            })
            .afterClosed.subscribe((action) => {
              const response = action;
              if (response) {
                this.requestForm.reset();
                this.router.navigateByUrl('/speed/final-user/inbox');
              }
            });
        });
      } else {
        this.dialogService.show({
          component: MessageModalComponent,
          config: {
            data: {
              message: 'Ingrese correo de los representaste legales',
            },
          },
        });
      }     
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

  private getAttachedDocuments(idExpediente: number) {
    const applicationDocumentsForm: IDocumentsTabModel = this.requestForm.value.tabApplicationDocuments;
    const array = [];
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

    const documentsContract: IDocumentsTabModel = this.requestForm.value.tabContract;
    const archivosContract: Array<string> = [];
    documentsContract.documentos.forEach((item: IDocumentFileModel) => {
      archivosContract.push(...item.files);
    });

    const paramsContract = {
      idExpediente,
      idTipoDocumento: documentsContract.idTipoDocumento,
      titulo: documentsContract.titulo,
      archivo: archivosContract,
    };
    if (archivosContract.length > 0) {
      array.push(firstValueFrom(this.registerRequestService.saveAttachedDocuments(paramsContract)));
    }

    const documentsPowers: IDocumentsTabModel = this.requestForm.value.tabPowers;
    const archivosPowers: Array<string> = [];
    documentsPowers.documentos.forEach((item: IDocumentFileModel) => {
      archivosPowers.push(...item.files);
    });
    const paramsPowers = {
      idExpediente,
      idTipoDocumento: documentsPowers.idTipoDocumento,
      titulo: documentsPowers.titulo,
      archivo: archivosPowers,
    };
    if (archivosPowers.length > 0) {
      array.push(firstValueFrom(this.registerRequestService.saveAttachedDocuments(paramsPowers)));
    }
    return array;
  }

  private initForm() {
    this.formRequest = this.requestForm.get('requested') as FormGroup;
  }

  private initFormContract() {
    this.contractForm = this.requestForm.get('requested.contrato') as FormGroup;
  }
}
