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
import { SendVisaModalPresenter } from './send-visa-modal.presenter';
import { Opciones,SubOpciones } from 'src/app/authentication/interfaces';
import { TabService } from '@speed/final-user/common/services/tab.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'ui-send-visa-modal',
  templateUrl: './send-visa-modal.component.html',
  styleUrls: ['./send-visa-modal.component.scss'],
  imports: [NgFor, ReactiveFormsModule, CustomReactiveFormDirective, NgIf],
  providers: [CommunicateInterestedService, RegisterRequestService, SendVisaModalPresenter],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SendVisaModalComponent implements OnInit {
  @ViewChild('selectUserInput') public selectUserInput!: ElementRef;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public listUsuarios: any[] = [];
  public listUsuariosSelected: IUserNoticeValidity[] = [];
  public data: any;
  public destinatario!: IDestinatario;
  private unsubscribe: Subject<void>;

  public constructor(
    private dialogRef: DialogRef<unknown>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private dialogConfig: DialogConfig<any>,
    private service: RegisterRequestService,
    private communicateService: CommunicateInterestedService,
    public requestForm: SendVisaModalPresenter,
    private spinnerService: SpinnerOverlayService,
    private router: Router,

    private tabService : TabService
  ) {
    this.unsubscribe = new Subject();
    this.data = this.dialogConfig.data || {};
    this.unsubscribe = new Subject();
  }

  public async ngOnInit() {
    this.requestForm.Form.get('idExpediente')?.setValue(this.data.idExpediente);
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
          switchMap((value) => this.communicateService.buscarInteresadosVisadores(value)),
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
  public sendRequest() {
    Utils.validateAllFields(this.requestForm.Form);
    if (this.requestForm.Valid) {
      this.spinnerService.show();
      const params = this.requestForm.Value;
      params.idVisadores = this.listUsuariosSelected.map((item) => {
        return item.id;
      });
      if (params.esUrgente == true) {
        params.observacion = 'Urgente <br>'.concat(String(params.observacion));
      }
      if (params.tieneObservacion == true) {
        params.observacion = '<span style="color:red; font-weight:bold">Observación</span><br>'.concat(String(params.observacion));
      }
      this.service
        .sendVisa(params)
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

  public close() {
    this.dialogRef.close();
  }
}
