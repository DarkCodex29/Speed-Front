import { NgIf, NgFor } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DialogRef } from '@speed/common/dialog/dialog.ref';
import { DialogConfig } from '@speed/common/dialog/dialog.service';
import { ActionModal } from '@speed/common/enums';
import { SpinnerOverlayService } from '@speed/common/services';
import { Subject, takeUntil } from 'rxjs';
import { PickListModule } from 'primeng/picklist';
import { Utils } from '@speed/common/helpers';
import { DocumentTypeService } from '@speed/final-user/common/services/document-type.service';
import { DocumentTypeModel } from '@speed/common/models/document-type.model';
import { FieldDocumentBD } from '@speed/common/interfaces/document-type.interface';
import { CustomReactiveFormDirective } from '@speed/common/directives';

@Component({
  standalone: true,
  selector: 'ui-document-type-modal',
  templateUrl: 'document-type-maintenance-modal.component.html',
  styleUrls: ['./document-type-maintenance-modal.component.scss'],
  providers: [DocumentTypeService],
  imports: [NgIf, NgFor, ReactiveFormsModule, PickListModule, CustomReactiveFormDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DocumentTypeMaintenanceModalComponent implements OnInit, OnDestroy {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public idDocumentType?: number;
  public documentTypeForm: FormGroup;
  public camposFuente: Array<FieldDocumentBD> = [];
  public camposAsignados: Array<FieldDocumentBD> = [];
  public readonly action = ActionModal;
  public actionType = ActionModal.REGISTRAR;
  private unsubscribe: Subject<void>;

  public constructor(
    private cd: ChangeDetectorRef,
    private documentTypeService: DocumentTypeService,
    private dialogConfig: DialogConfig<{ id?: number; actionType?: ActionModal }>,
    private dialogRef: DialogRef<unknown>,
    private spinnerService: SpinnerOverlayService,
  ) {
    this.unsubscribe = new Subject();
    const documentTypeModel = new DocumentTypeModel();
    this.documentTypeForm = new FormGroup({ ...documentTypeModel });
    this.idDocumentType = this.dialogConfig.data?.id;
    this.actionType = this.dialogConfig.data?.actionType || ActionModal.REGISTRAR;
  }

  public async ngOnInit() {
    this.documentTypeForm.get('contenido')?.disable();
    if (this.idDocumentType) {
      this.spinnerService.show();
      await this.patchValue();
      this.spinnerService.hide();
    } else {
      this.camposFuente = await this.documentTypeService.getCampos();
    }
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
    Utils.validateAllFields(this.documentTypeForm);
    if (this.documentTypeForm.valid) {
      try {
        const params = this.documentTypeForm.value;
        params.campos = this.camposAsignados;

        this.documentTypeService
          .registerTipoDocumento(params)
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

  private async patchValue() {
    const data = await this.documentTypeService.getTipoDocumentoById(this.idDocumentType as number);

    this.documentTypeForm.get('id')?.setValue(data.id);
    this.documentTypeForm.get('nombre')?.setValue(data.nombre);
    this.documentTypeForm.get('descripcion')?.setValue(data.descripcion);
    this.documentTypeForm.get('firmable')?.setValue(data.firmable);
    this.documentTypeForm.get('estado')?.setValue(data.estado == 'A' ? true : false);

    this.camposAsignados = data.campos;
    this.camposFuente = await this.documentTypeService.getCamposDisponibles(this.idDocumentType as number);
  }
}
