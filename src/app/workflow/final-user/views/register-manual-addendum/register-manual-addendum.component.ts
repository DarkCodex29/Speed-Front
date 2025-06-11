import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogService } from '@speed/common/dialog';
import { ProcessType } from '@speed/common/enums';
import { Utils, setValidatorsRegisterManualAdendum } from '@speed/common/helpers';
import {
  IAbogadoResponsable,
  IArea,
  ICompany,
  ICounterPartBD,
  ICountry,
  ICustomerType,
  ITabDocuments,
  IUserNoticeValidity,
} from '@speed/common/interfaces';
import { IDocumentFileModel, IDocumentsTabModel } from '@speed/common/interfaces/forms';
import { NoticeValidityModalComponent } from '@speed/common/modals';
import { SpinnerOverlayService } from '@speed/common/services';
import { RegisterRequestService } from '@speed/final-user/common/services';
import { Subject, firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-register-manual-addendum',
  templateUrl: './register-manual-addendum.component.html',
  styleUrls: ['./register-manual-addendum.component.scss'],
  providers: [RegisterRequestService],
})
export class RegisterManualAddendumComponent implements OnInit, OnDestroy {
  @Input() public requestForm!: FormGroup;
  @Input() public tabApplicationDocuments?: ITabDocuments;
  @Input() public tabAdendum?: ITabDocuments;
  @Input() public countriesList: ICountry[] = [];
  @Input() public companiesList: ICompany[] = [];
  @Input() public areasList: IArea[] = [];
  @Input() public counterpartList: ICounterPartBD[] = [];
  @Input() public legalRepresentativesList: ICounterPartBD[] = [];
  @Input() public customerTypeList: ICustomerType[] = [];
  @Input() public requestingUserList: IAbogadoResponsable[] = [];
  @Input() public responsibleLawyersList: IAbogadoResponsable[] = [];
  public users: IUserNoticeValidity[] = [];
  public addendumForm!: FormGroup;
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
    setValidatorsRegisterManualAdendum(this.requestForm);
    this.initFormContract();
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public selectUserRequesting(event: Event) {
    this.requestForm.get('solicitante')?.setValue((event as CustomEvent).detail);
  }

  public selectResponsibleLawyer(event: Event) {
    this.requestForm.get('abogadoResponsable')?.setValue((event as CustomEvent).detail);
  }

  public isInvalidControl(control: string): boolean {
    return (this.requestForm.get(control)?.invalid && this.requestForm.get(control)?.touched) || false;
  }

  public getFormGroup(formGroup: string) {
    return this.requestForm.get(formGroup) as FormGroup;
  }

  public sendRequest() {
    Utils.validateAllFields(this.requestForm);
    if (this.requestForm.valid) {
      this.spinnerService.show();
      const paramsDocument = this.requestForm.value;
      const paramsExpedient = {
        idProceso: Number(ProcessType.ADENDA),
        aplicaPenalidad: false,
        titulo: this.requestForm.value.sumilla,
      };
      this.registerRequestService.saveExpediente(paramsExpedient).subscribe(async (result) => {
        const solicitante = paramsDocument.solicitante;
        const responsable = paramsDocument.abogadoResponsable;
        paramsDocument.idExpediente = result.id;
        paramsDocument.solicitante = paramsDocument.solicitante.id;
        paramsDocument.abogadoResponsable = paramsDocument.abogadoResponsable.id;
        paramsDocument.adenda.idContraparte = paramsDocument.adenda.idContraparte.id;

        paramsDocument.esAvance = false;
        paramsDocument.adenda.idContrato = paramsDocument.adenda.idContrato.idDocumentoLegal;
        paramsDocument.contrato = null;

        const arrayPromise = this.getAttachedDocuments(result.id);

        await firstValueFrom(this.registerRequestService.saveDocumentoLegal(paramsDocument)); //Guardar documento legal

        await Promise.all([
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
    }
  }

  private initForm() {
    this.formRequest = this.requestForm as FormGroup;
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
    const documentsAddendum: IDocumentsTabModel = this.requestForm.value.documentsAddendum;
    const archivosAddendum: Array<string> = [];
    documentsAddendum.documentos.forEach((item: IDocumentFileModel) => {
      archivosAddendum.push(...item.files);
    });

    const paramsAddendum = {
      idExpediente,
      idTipoDocumento: documentsAddendum.idTipoDocumento,
      titulo: documentsAddendum.titulo,
      archivo: archivosAddendum,
    };
    if (archivosAddendum.length > 0) {
      array.push(firstValueFrom(this.registerRequestService.saveAttachedDocuments(paramsAddendum)));
    }
    return array;
  }

  private initFormContract() {
    this.addendumForm = this.requestForm.get('adenda') as FormGroup;
  }
}
