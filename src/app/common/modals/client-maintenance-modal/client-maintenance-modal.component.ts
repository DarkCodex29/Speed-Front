import { NgIf, NgFor } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DialogRef } from '@speed/common/dialog/dialog.ref';
import { DialogConfig } from '@speed/common/dialog/dialog.service';
import { ActionModal, CustomerType } from '@speed/common/enums';
import {
  Utils,
  addValidatorsClienteJuridico,
  addValidatorsClienteMantenimiento,
  removeValidatorsClienteJuridico,
  removeValidatorsClienteMantenimiento,
} from '@speed/common/helpers';
import { ICounterPartBD, ICounterPartTypeBD } from '@speed/common/interfaces';
import { ClientModel } from '@speed/common/models';
import { SpinnerOverlayService } from '@speed/common/services';
import { ClientService } from '@speed/final-user/common/services/client.service';
import { Subject, startWith, takeUntil } from 'rxjs';

@Component({
  standalone: true,
  selector: 'ui-client-modal',
  templateUrl: 'client-maintenance-modal.component.html',
  styleUrls: ['./client-maintenance-modal.component.scss'],
  providers: [ClientService],
  imports: [NgIf, NgFor, ReactiveFormsModule],
})
export class ClientMaintenanceModalComponent implements OnInit, OnDestroy {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public data: any;
  public clientData!: ICounterPartBD;
  public clientForm: FormGroup;
  public isJuridica = true;
  public tiposCliente: Array<ICounterPartTypeBD> = [];
  public readonly action = ActionModal;
  public actionType = ActionModal.REGISTRAR;
  private unsubscribe: Subject<void>;

  public constructor(
    private cd: ChangeDetectorRef,
    private clientService: ClientService,
    private dialogConfig: DialogConfig,
    private dialogRef: DialogRef<unknown>,
    private spinnerService: SpinnerOverlayService,
  ) {
    this.unsubscribe = new Subject();
    const clientModel = new ClientModel();
    this.clientForm = new FormGroup({ ...clientModel });
    this.data = this.dialogConfig.data || {};
  }

  public async exitDni(event: any) {
    const dni = event.target.value;
    if (dni.length >= 8) {
      this.spinnerService.show();
      const validation = await this.clientService.validateClientCounterpart({ dni: this.clientForm.get('numeroIdentificacion')?.value });
      if (validation.existe) {
        this.patchValue(validation.cliente as ICounterPartBD);
      }
      this.spinnerService.hide();
    }
  }

  public async ngOnInit() {
    this.tiposCliente = await this.clientService.getTipos();
    this.initForm();
    this.subscribeCustomerType();
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public close() {
    const params = { modified: false };
    this.dialogRef.close(params);
  }

  public submit() {
    Utils.validateAllFields(this.clientForm);
    if (this.clientForm.valid) {
      try {
        const params = this.clientForm.value;
        params.estado = params.estado ? 'A' : 'I';

        this.clientService
          .registerCliente(params)
          .pipe(takeUntil(this.unsubscribe))
          .subscribe(() => {
            const params = { modified: true };
            this.dialogRef.close(params);
          });
      } catch (err) {
        console.error(err);
      }
    }
  }

  private patchValue(value: ICounterPartBD) {
    this.clientForm.get('idCliente')?.setValue(value.id);
    this.clientForm.get('apellidoMaterno')?.setValue(value.apellidoMaterno);
    this.clientForm.get('apellidoPaterno')?.setValue(value.apellidoPaterno);
    this.clientForm.get('nombre')?.setValue(value.nombre);
    this.clientForm.get('numeroIdentificacion')?.setValue(value.numeroIdentificacion);
    this.clientForm.get('correo')?.setValue(value.correo);
    this.clientForm.get('razonSocial')?.setValue(value.razonSocial);
    this.clientForm.get('tipoCliente')?.setValue(value.tipo?.id);
    this.clientForm.get('esContraparte')?.setValue(value.esContraparte);
    this.clientForm.get('esRepresentante')?.setValue(value.esRepresentante);
    this.clientForm.get('estado')?.setValue(value.estado == 'A' ? true : false);
    this.clientForm.get('direccion')?.setValue(value.direccion);
    this.clientForm.get('telefono')?.setValue(value.telefono);
    this.clientForm.get('contacto')?.setValue(value.contacto);
  }

  private async initForm() {
    this.actionType = this.data.actionType || ActionModal.REGISTRAR;
    if (this.actionType === ActionModal.REGISTRAR) {
      this.clientForm.get('tipoCliente')?.setValue(CustomerType.PERSONA_JURIDICA);
      this.clientForm.get('estado')?.setValue(true);
    } else {
      this.clientData = await this.clientService.getClienteById({ idCliente: this.data.idCliente });
      this.clientForm.get('idCliente')?.setValue(this.clientData.id);
      this.clientForm.get('apellidoMaterno')?.setValue(this.clientData.apellidoMaterno);
      this.clientForm.get('apellidoPaterno')?.setValue(this.clientData.apellidoPaterno);
      this.clientForm.get('estado')?.setValue(this.clientData.estado == 'A' ? true : false);
      this.clientForm.get('fechaCreacion')?.setValue(this.clientData.fechaCreacion);
      this.clientForm.get('nombre')?.setValue(this.clientData.nombre);
      this.clientForm.get('numeroIdentificacion')?.setValue(this.clientData.numeroIdentificacion);
      this.clientForm.get('razonSocial')?.setValue(this.clientData.razonSocial);
      this.clientForm.get('tipoCliente')?.setValue(this.clientData.tipo?.id);
      this.clientForm.get('correo')?.setValue(this.clientData.correo);
      this.clientForm.get('distancia')?.setValue(this.clientData.distancia);
      this.clientForm.get('telefono')?.setValue(this.clientData.telefono);
      this.clientForm.get('direccion')?.setValue(this.clientData.direccion);
      this.clientForm.get('esContraparte')?.setValue(this.clientData.esContraparte);
      this.clientForm.get('esRepresentante')?.setValue(this.clientData.esRepresentante);
      this.clientForm.get('situacionSunat')?.setValue(this.clientData.situacionSunat);
      this.clientForm.get('contacto')?.setValue(this.clientData.contacto);
    }
  }

  private subscribeCustomerType() {
    this.clientForm
      .get('tipoCliente')
      ?.valueChanges.pipe(takeUntil(this.unsubscribe), startWith(this.clientForm.value.tipoCliente))
      .subscribe((data) => {
        if (Number(data) === CustomerType.PERSONA_JURIDICA) {
          removeValidatorsClienteMantenimiento(this.clientForm);
          this.isJuridica = true;
          this.clientForm.get('nombre')?.disable();
          this.clientForm.get('apellidoPaterno')?.disable();
          this.clientForm.get('apellidoMaterno')?.disable();
          this.clientForm.get('esRepresentante')?.enable();
          this.clientForm.get('razonSocial')?.enable();
          addValidatorsClienteJuridico(this.clientForm);
          this.cd.detectChanges();
        } else {
          removeValidatorsClienteJuridico(this.clientForm);
          this.isJuridica = false;
          this.clientForm.get('nombre')?.enable();
          this.clientForm.get('apellidoPaterno')?.enable();
          this.clientForm.get('apellidoMaterno')?.enable();
          this.clientForm.get('esContraparte')?.enable();
          this.clientForm.get('esRepresentante')?.enable();
          this.clientForm.get('razonSocial')?.disable();
          addValidatorsClienteMantenimiento(this.clientForm);
          this.cd.detectChanges();
        }
      });
  }
}
