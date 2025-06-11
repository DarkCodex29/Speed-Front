import { NgFor, NgIf } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogConfig, DialogRef } from '@speed/common/dialog';
import { CustomReactiveFormDirective } from '@speed/common/directives';
import { RegisterRequestService } from '@speed/final-user/common/services';
import { Subject, debounceTime, distinctUntilChanged, of, switchMap, takeUntil } from 'rxjs';
import { IDestinatario } from '@speed/common/interfaces/output';
import { CommunicateInterestedService, SpinnerOverlayService } from '@speed/common/services';
import { IUserNoticeValidity } from '@speed/common/interfaces';
import { Utils } from '@speed/common/helpers';
import { SecurityModalPresenter } from './security-modal.presenter';

@Component({
  standalone: true,
  selector: 'ui-security-modal',
  templateUrl: './security-modal.component.html',
  styleUrls: ['./security-modal.component.scss'],
  imports: [NgFor, ReactiveFormsModule, CustomReactiveFormDirective, NgIf],
  providers: [CommunicateInterestedService, RegisterRequestService, SecurityModalPresenter],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SecurityModalComponent implements OnInit {
  @ViewChild('selectUserInput') public selectUserInput!: ElementRef;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public listUsuarios: any[] = [];
  public listUsuariosSelected: IUserNoticeValidity[] = [];
  public data: any;
  public destinatario!: IDestinatario;
  public buscadorUsuariosLock = true;
  private unsubscribe: Subject<void>;

  public constructor(
    private dialogRef: DialogRef<unknown>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private dialogConfig: DialogConfig<any>,
    private service: RegisterRequestService,
    private communicateService: CommunicateInterestedService,
    public requestForm: SecurityModalPresenter,
    private spinnerService: SpinnerOverlayService,
  ) {
    this.unsubscribe = new Subject();
    this.data = this.dialogConfig.data || {};
    this.unsubscribe = new Subject();
  }

  public async ngOnInit() {
    this.requestForm.Form.get('idExpediente')?.setValue(this.data.idExpediente);
    this.changeConfidencialidad();
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
          switchMap((value) => this.communicateService.buscarInteresadosSeguridad(value)),
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

  public sendRequest() {
    Utils.validateAllFields(this.requestForm.Form);
    if (this.requestForm.Valid) {
      this.spinnerService.show();
      const params = this.requestForm.Value;
      params.usuarios = this.listUsuariosSelected;
      this.service
        .saveSecurityConfig(params)
        .pipe(takeUntil(this.unsubscribe))
        .subscribe({
          next: (response) => {
            this.spinnerService.hide();
            const params = { success: true, message: response.message };
            this.dialogRef.close(params);
          },
          error: (e) => {
            this.spinnerService.hide();
            const params = { success: false, message: e.error.message };
            this.dialogRef.close(params);
          },
        });
    }
  }

  public changeConfidencialidad() {
    if (this.requestForm.Form.get('esConfidencial')?.value == false) {
      this.buscadorUsuariosLock = true;
      this.listUsuariosSelected = [];
      this.requestForm.Form.get('buscadorUsuarios')?.patchValue(null);
    } else {
      this.buscadorUsuariosLock = false;
      this.listUsuariosSelected = [];
      this.requestForm.Form.get('buscadorUsuarios')?.patchValue(null);
    }
  }

  public close() {
    this.dialogRef.close();
  }
}
