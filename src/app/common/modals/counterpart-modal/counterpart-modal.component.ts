import { NgIf, NgFor } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DialogRef } from '@speed/common/dialog/dialog.ref';
import { DialogConfig } from '@speed/common/dialog/dialog.service';
import { ActionModal, CustomerType } from '@speed/common/enums';
import {
  Utils,
  addValidatorsClienteJuridico,
  addValidatorsClienteNatural,
  removeValidatorsClienteJuridico,
  removeValidatorsClienteNatural,
} from '@speed/common/helpers';
import { ICounterPartBD } from '@speed/common/interfaces';
import { ClientModel } from '@speed/common/models';
import { SpinnerOverlayService } from '@speed/common/services';
import { ClientService } from '@speed/final-user/common/services/client.service';
import { Subject, startWith, takeUntil } from 'rxjs';

@Component({
  standalone: true,
  selector: 'ui-counterpart-modal',
  templateUrl: 'counterpart-modal.component.html',
  styleUrls: ['./counterpart-modal.component.scss'],
  providers: [ClientService],
  imports: [NgIf, NgFor, ReactiveFormsModule],
})
export class CounterpartModalComponent implements OnInit, OnDestroy {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public data: any;
  public clientForm: FormGroup;
  public isJuridica = true;
  private actionType = ActionModal.REGISTRAR;
  private unsubscribe: Subject<void>;

  public constructor(
    private cd: ChangeDetectorRef,
    private clientService: ClientService,
    private dialogConfig: DialogConfig,
    private spinnerService: SpinnerOverlayService,
    private dialogRef: DialogRef<unknown>,
  ) {
    this.unsubscribe = new Subject();
    const clientModel = new ClientModel();
    this.clientForm = new FormGroup({ ...clientModel });
    this.data = this.dialogConfig.data || {};
  }

  public ngOnInit() {
    this.initForm();
    this.subscribeCustomerType();
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public close() {
    this.dialogRef.close();
  }

  public submit() {
    Utils.validateAllFields(this.clientForm);
    if (this.clientForm.valid) {
      try {
        const params = {
          idCliente: this.clientForm.get('idCliente')?.value,
          apellidoMaterno: this.clientForm.get('apellidoMaterno')?.value,
          apellidoPaterno: this.clientForm.get('apellidoPaterno')?.value,
          nombre: this.clientForm.get('nombre')?.value,
          numeroIdentificacion: this.clientForm.get('numeroIdentificacion')?.value,
          correo: this.clientForm.get('correo')?.value,
          razonSocial: this.clientForm.get('razonSocial')?.value,
          tipoCliente: this.clientForm.get('tipoCliente')?.value,
          esContraparte: this.clientForm.get('esContraparte')?.value,
          esRepresentante: this.clientForm.get('esRepresentante')?.value,
          direccion: this.clientForm.get('direccion')?.value,
          telefono: this.clientForm.get('telefono')?.value,
          contacto: this.clientForm.get('contacto')?.value,
          situacionSunat: this.clientForm.get('situacionSunat')?.value,
          estado: 'A',
        };
        if (this.actionType === ActionModal.EDITAR) {
          params.esContraparte = this.data.info.esContraparte;
          params.esRepresentante = this.data.info.esRepresentante;
        }

        this.clientService
          .registerCliente(params)
          .pipe(takeUntil(this.unsubscribe))
          .subscribe((data) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const variable: any = data;
            if (this.actionType === ActionModal.EDITAR) {
              this.data.info.idRepresentanteLegal = params.idCliente;
              this.data.info.tipoCliente = params.tipoCliente;
              this.data.info.numeroIdentificacion = params.numeroIdentificacion;
              this.data.info.nombre = params.nombre;
              this.data.info.apellidoPaterno = params.apellidoPaterno;
              this.data.info.apellidoMaterno = params.apellidoMaterno;
              this.data.info.correo = params.correo;
              this.dialogRef.close(params);
            } else {
              params.idCliente = variable.id;
              this.dialogRef.close(params);
            }
          });
      } catch (err) {
        console.error(err);
      }
    }
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

  private initForm() {
    this.actionType = this.data.actionType || ActionModal.REGISTRAR;
    if (this.actionType === ActionModal.REGISTRAR) {
      this.clientForm.get('tipoCliente')?.setValue(CustomerType.PERSONA_JURIDICA);
      //this.clientForm.get('situacionSunat')?.disable();
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
    this.clientForm.get('situacionSunat')?.setValue(value.situacionSunat);
  }

  private subscribeCustomerType() {
    this.clientForm
      .get('tipoCliente')
      ?.valueChanges.pipe(takeUntil(this.unsubscribe), startWith(this.clientForm.value.tipoCliente))
      .subscribe((data) => {
        if (Number(data) === CustomerType.PERSONA_JURIDICA) {
          removeValidatorsClienteNatural(this.clientForm);
          this.isJuridica = true;
          this.clientForm.get('nombre')?.disable();
          this.clientForm.get('apellidoPaterno')?.disable();
          this.clientForm.get('esContraparte')?.setValue(true);
          this.clientForm.get('apellidoMaterno')?.disable();
          this.clientForm.get('esRepresentante')?.disable();
          this.clientForm.get('razonSocial')?.enable();
          addValidatorsClienteJuridico(this.clientForm);
          this.cd.detectChanges();
        } else {
          removeValidatorsClienteJuridico(this.clientForm);
          this.isJuridica = false;
          this.clientForm.get('nombre')?.enable();
          this.clientForm.get('apellidoPaterno')?.enable();
          this.clientForm.get('esContraparte')?.setValue(true, { emitModelToViewChange: true });
          this.clientForm.get('apellidoMaterno')?.enable();
          this.clientForm.get('esContraparte')?.enable();
          this.clientForm.get('esRepresentante')?.enable();
          this.clientForm.get('razonSocial')?.disable();
          addValidatorsClienteNatural(this.clientForm);
          this.cd.detectChanges();
        }
      });
  }
}
