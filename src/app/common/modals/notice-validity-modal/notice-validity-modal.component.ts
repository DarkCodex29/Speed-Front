import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { DialogConfig, DialogRef, DialogService } from '@speed/common/dialog';
import { CustomReactiveFormDirective } from '@speed/common/directives';
import { NgFor, NgIf } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged, of, switchMap, takeUntil } from 'rxjs';
import { CommunicateInterestedService } from '../../services/communicate-interested.service';
import { IUserNoticeValidity } from '../../interfaces/user-notice-validity.interface';
import { RegisterRequestService } from '@speed/final-user/common/services';
import { SpinnerOverlayService } from '@speed/common/services';
import { MessageModalComponent } from '@speed/common/modals';

@Component({
  standalone: true,
  selector: 'app-notice-validity-modal',
  templateUrl: './notice-validity-modal.component.html',
  styleUrls: ['./notice-validity-modal.component.scss'],
  imports: [NgFor, ReactiveFormsModule, CustomReactiveFormDirective, NgIf],
  providers: [CommunicateInterestedService, RegisterRequestService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NoticeValidityModalComponent implements OnDestroy {
  @ViewChild('selectUserInput') public selectUserInput!: ElementRef;
  public noticeValidityForm = this.fb.group({
    usuario: [null],
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public listUsuarios: any[] = [];
  public listUsuariosSelected: IUserNoticeValidity[] = [];
  private unsubscribe: Subject<void>;

  public constructor(
    private dialogRef: DialogRef<unknown>,
    private fb: FormBuilder,
    private communicateService: CommunicateInterestedService,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private dialogConfig: DialogConfig<any>,
    private registerRequestService: RegisterRequestService,
    private spinnerService: SpinnerOverlayService,
    private dialogService: DialogService,
  ) {
    this.unsubscribe = new Subject();
    const sol = {
      id: this.dialogConfig.data.solicitante.id,
      usuario: this.dialogConfig.data.solicitante.nombreCompleto,
      esGrupo: 0,
    };
    this.listUsuariosSelected.push(sol);
    if (this.dialogConfig.data.solicitante.id !== this.dialogConfig.data.responsable.id) {
      const res = {
        id: this.dialogConfig.data.responsable.id,
        usuario: this.dialogConfig.data.responsable.nombreCompleto,
        esGrupo: 0,
      };
      this.listUsuariosSelected.push(res);
    }
    const com = {
      id: 1,
      usuario: 'Grupo - Comunes',
      esGrupo: 1,
    };
    this.listUsuariosSelected.push(com);
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public close() {
    this.dialogRef.close();
  }

  public eliminarUsuario(id: number) {
    this.listUsuariosSelected = this.listUsuariosSelected.filter((item) => item.id !== id);
  }

  public async seleccionarUsuario(event: Event) {
    const termino = (event as CustomEvent).detail;
    if (termino.length > 2) {
      of(termino)
        .pipe(
          debounceTime(800),
          distinctUntilChanged(),
          takeUntil(this.unsubscribe),
          switchMap((value) => this.communicateService.buscarInteresados(value)),
        )
        .subscribe((data) => {
          this.listUsuarios = data;
        });
    }
  }

  public selectUser(event: Event) {
    if ((event as CustomEvent).detail !== null) {
      this.selectUserInput.nativeElement.value = null;
      const user = (event as CustomEvent).detail;
      let existe = true;
      existe = this.listUsuariosSelected.some((e) => e.id == user.id);
      if (!existe) {
        const item = {
          id: user.id,
          usuario: user.nombre,
          esGrupo: user.tipo == 'usuario' ? 0 : 1,
        };
        this.listUsuariosSelected.push(item);
      }
    }
  }

  public async register() {
    this.spinnerService.show();
    const params = {
      idExpediente: this.dialogConfig.data.idExpediente,
      idResponsable: this.dialogConfig.data.responsable.id,
      usuarios: this.listUsuariosSelected,
    };
    //Registrar expediente
    this.registerRequestService
      .saveManualLegalDocument(params)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe({
        next: () => {
          this.spinnerService.hide();
          this.dialogRef.close(true);
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
            config: { data: { message: 'Error al guardar' } },
          });
        },
      });
  }
}
