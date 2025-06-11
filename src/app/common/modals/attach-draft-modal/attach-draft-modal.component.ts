import { NgIf, NgFor } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogConfig, DialogRef, DialogService } from '@speed/common/dialog';
import { IAttachDocumentModal, IFile, IResponseFile } from '@speed/common/interfaces';
import { SpinnerOverlayService } from '@speed/common/services';
import { DocumentService } from '@speed/final-user/common/services';
import { Subject, debounceTime, distinctUntilChanged, of, switchMap, takeUntil } from 'rxjs';
import { AttachDraftModalPresenter } from './attach-draft-modal.presenter';
import { CustomReactiveFormDirective } from '@speed/common/directives';
import { MessageModalComponent } from '../message-modal';
import { LoginService } from 'src/app/authentication/services';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  standalone: true,
  selector: 'ui-attach-draft-modal',
  templateUrl: './attach-draft-modal.component.html',
  styleUrls: ['./attach-draft-modal.component.scss'],
  imports: [NgIf, NgFor, ReactiveFormsModule, CustomReactiveFormDirective, CheckboxModule],
  providers: [AttachDraftModalPresenter, DocumentService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AttachDraftModalComponent implements OnInit, OnDestroy {
  @ViewChild('selectUserInput') public selectUserInput!: ElementRef;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public attachDocumentConfig?: IAttachDocumentModal;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public datosDocument?: any;
  public listUsuarios: any[] = [];
  public listUsuariosUbicacion: any[] = [];
  public listUsuariosSelected: any[] = [];
  public file?: IFile;
  public id?: number;
  public cant?: number;
  public numero?: string;
  public label;
  public idProceso: number | undefined;
  public tipoDocumento: number | undefined;
  private unsubscribe: Subject<void>;
  public documentoObjeto?: object;
  public nombreCarpeta? : string;
  public constructor(
    private dialogService: DialogService,
    private dialogRef: DialogRef<boolean>,
    private dialogConfig: DialogConfig<any>,
    private spinnerService: SpinnerOverlayService,
    public attachDraftForm: AttachDraftModalPresenter,
    private documentService: DocumentService,
    private loginService: LoginService,
  ) {
    this.unsubscribe = new Subject();
    this.id = this.dialogConfig.data?.id;
    this.cant = this.dialogConfig.data?.cant;
    this.numero = this.dialogConfig.data?.num;
    this.label = this.dialogConfig.title != '' ? this.dialogConfig.title : 'Adjuntar Borrador';
    this.idProceso = this.dialogConfig.data?.idProceso;
    this.tipoDocumento = this.dialogConfig.data?.tipoDocumento;
    this.documentoObjeto = this.dialogConfig.data?.documentoObjeto;
    this.nombreCarpeta = this.dialogConfig.data.documentoObjeto.nombre;
  }

  public ngOnInit(): void {
    this.spinnerService.show();
    this.documentService
      .getInfoDocument({ id: this.id })
      .pipe(takeUntil(this.unsubscribe))
      .subscribe({
        next: (response) => {
          this.datosDocument = response;
          this.attachDraftForm.Form.get('id')?.setValue(this.id);
          this.attachDraftForm.Form.get('enviadoC')?.setValue(false);
          let userDefault;
          if (this.datosDocument.destinatariosDefecto.length > 1) {
            userDefault = this.datosDocument.destinatariosDefecto.filter(
              (d: any) => d.usuario.usuario != this.loginService.getUserInfo().usuario,
            );
          } else {
            userDefault = this.datosDocument.destinatariosDefecto;
          }
          this.listUsuariosSelected.push(...userDefault);
          this.spinnerService.hide();
        },
        error: (error) => {
          console.error(error);
          this.spinnerService.hide();
        },
      });
  }

  public async seleccionarUsuario(event: Event) {
    const termino = (event as CustomEvent).detail;
    if (termino.length > 2) {
      of(termino)
        .pipe(
          debounceTime(800),
          distinctUntilChanged(),
          takeUntil(this.unsubscribe),
          switchMap((value) => this.documentService.getUsersActives({ term: value })),
        )
        .subscribe((data) => {
          this.listUsuariosUbicacion = data.slice();
          this.listUsuarios = data.map((user) => {
            return user.usuario;
          });
        });
    }
  }

  public selectUser(event: Event) {
    if ((event as CustomEvent).detail !== null) {
      this.selectUserInput.nativeElement.value = null;
      const user = (event as CustomEvent).detail;
      let existe = true;
      existe = this.listUsuariosSelected.some((e) => e.usuario.id == user.id);
      if (!existe) {
        let index = this.listUsuariosUbicacion.findIndex((u) => (u.usuario.id = user.id));
        if (index > -1) {
          this.listUsuariosSelected.unshift(this.listUsuariosUbicacion[index]);
        }
      }
    }
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public close() {
    this.dialogRef.close();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public onUpload(event: any) {
    //this.spinnerService.show();
    try {
      let fileUpload = event.target.files[0];
      let format = fileUpload.name.split('.');
      const isVersionFinal = (this.label == "Adjuntar Versión Final");
      let name = this.cant && this.cant >= 1 && !isVersionFinal ? this.numero + '_V' + this.cant + '.' + format[format.length - 1] : fileUpload.name;
      console.log(name);
      const formData = new FormData();
      formData.append('archivo', fileUpload);
      formData.append('rename', name);
      this.documentService.uploadFile(formData).subscribe((response: IResponseFile) => {
        event.target.value = '';
        this.file = {
          name: response.archivo,
          path: response.nombreArchivoDisco,
          size: (fileUpload.size * 0.00097656).toFixed(2),
        };
        this.attachDraftForm.Form.get('archivo')?.setValue(response.nombreArchivoDisco);
        this.spinnerService.hide();
      });
    } catch (error) {
      this.spinnerService.hide();
    }
  }

  public deleteFileUpload() {
    this.file = undefined;
  }

  public onClickedSaveDocument() {
    const params = this.attachDraftForm.Value;
    params.idDestinatarios = this.listUsuariosSelected.map((item) => {
      return item.usuario.id;
    });
    this.spinnerService.show();
    this.documentService
      .saveDraft(params)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe({
        next: (response) => {
          if (response.resultado == 'error') {
            this.spinnerService.hide();
            this.dialogService.show({
              component: MessageModalComponent,
              config: {
                data: {
                  message: response.mensaje,
                },
              },
            });
          } else {
            this.spinnerService.hide();
            this.dialogRef.close(true);
            this.dialogService.show({
              component: MessageModalComponent,
              config: {
                data: {
                  message: 'Se adjuntó el archivo correctamente',
                },
              },
            });
          }          
        },
        error: (err: unknown) => {
          console.error(err);
          this.spinnerService.hide();
          this.dialogService.show({
            component: MessageModalComponent,
            config: {
              data: {
                message: 'Hubo un error al guardar el documento.',
              },
            },
          });
        },
      });
  }

  public eliminarUsuario(id: number) {
    this.listUsuariosSelected = this.listUsuariosSelected.filter((item) => item.usuario.id !== id);
  }
  esBorrador(): boolean {
    const borr = typeof this.nombreCarpeta === 'string' && this.nombreCarpeta.includes('Borrador');
    return borr;

  }
}
