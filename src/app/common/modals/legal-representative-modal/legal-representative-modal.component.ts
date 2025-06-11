import { NgIf, NgFor } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DialogConfig, DialogRef } from '@speed/common/dialog';
import { ActionModal, CustomerType } from '@speed/common/enums';
import { Utils, addValidatorsClienteNatural } from '@speed/common/helpers';
import { ClientModel } from '@speed/common/models';
import { ClientService } from '@speed/final-user/common/services/client.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  standalone: true,
  selector: 'ui-legal-representative-modal',
  templateUrl: 'legal-representative-modal.component.html',
  styleUrls: ['./legal-representative-modal.component.scss'],
  providers: [ClientService],
  imports: [NgIf, NgFor, ReactiveFormsModule],
})
export class LegalRepresentativeModalComponent implements OnInit, OnDestroy {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public data: any;
  public clientForm: FormGroup;
  public readonly actionEnum = ActionModal;
  public actionType = ActionModal.REGISTRAR;
  private unsubscribe: Subject<void>;

  public constructor(
    private clientService: ClientService,
    private dialogConfig: DialogConfig,
    private dialogRef: DialogRef<unknown>,
  ) {
    this.unsubscribe = new Subject();
    const clientModel = new ClientModel();
    this.clientForm = new FormGroup({ ...clientModel });
    this.data = this.dialogConfig.data || {};
  }

  public ngOnInit() {
    this.initForm();
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
          tipoCliente: this.clientForm.get('tipoCliente')?.value,
          esContraparte: this.clientForm.get('esContraparte')?.value,
          esRepresentante: this.clientForm.get('esRepresentante')?.value,
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
        // eslint-disable-next-line no-console
        console.error(err);
      }
    }
  }

  private initForm() {
    this.actionType = this.data.actionType || ActionModal.REGISTRAR;
    this.clientForm.get('razonSocial')?.disable();
    this.clientForm.get('situacionSunat')?.disable();
    this.clientForm.get('situacionSunat')?.disable();
    addValidatorsClienteNatural(this.clientForm);
    if (this.actionType === ActionModal.REGISTRAR) {
      this.clientForm.get('tipoCliente')?.setValue(CustomerType.DNI);
      this.clientForm.get('esRepresentante')?.setValue(true);
    } else {
      this.clientForm.patchValue({
        idCliente: this.data.info.idRepresentanteLegal,
        tipoCliente: this.data.info.tipoCliente,
        numeroIdentificacion: this.data.info.numeroIdentificacion,
        nombre: this.data.info.nombre,
        apellidoPaterno: this.data.info.apellidoPaterno,
        apellidoMaterno: this.data.info.apellidoMaterno,
        correo: this.data.info.correo,
      });
      this.clientForm.get('esRepresentante')?.disable();
      this.clientForm.get('esContraparte')?.disable();
    }
  }
}
