import { NgIf, NgFor } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DialogRef } from '@speed/common/dialog/dialog.ref';
import { DialogConfig } from '@speed/common/dialog/dialog.service';
import { ActionModal } from '@speed/common/enums';
import { SpinnerOverlayService } from '@speed/common/services';
import { TipoContratoBD } from '@speed/common/interfaces/template.interface';
import { TemplateService } from '@speed/final-user/common/services/template.service';
import { Subject, takeUntil } from 'rxjs';
import { Utils } from '@speed/common/helpers';
import { TemplateModel } from '@speed/common/models/template.model';
import { IFile, IResponseFile } from '@speed/common/interfaces';
import { DocumentService } from '@speed/final-user/common/services';
import { CustomReactiveFormDirective } from '@speed/common/directives';
@Component({
  standalone: true,
  selector: 'ui-template-modal',
  templateUrl: 'template-maintenance-modal.component.html',
  styleUrls: ['./template-maintenance-modal.component.scss'],
  providers: [TemplateService, DocumentService],
  imports: [NgIf, NgFor, ReactiveFormsModule, CustomReactiveFormDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TemplateMaintenanceModalComponent implements OnInit, OnDestroy {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public idTemplate?: number;
  public rutaPLantilla = '';
  public templateForm: FormGroup;
  public tipoContratos: Array<TipoContratoBD> = [];
  public file?: IFile;
  public readonly action = ActionModal;
  public actionType = ActionModal.REGISTRAR;
  private unsubscribe: Subject<void>;

  public constructor(
    private cd: ChangeDetectorRef,
    private templateService: TemplateService,
    private documentService: DocumentService,
    private dialogConfig: DialogConfig<{ id?: number; actionType?: ActionModal }>,
    private dialogRef: DialogRef<unknown>,
    private spinnerService: SpinnerOverlayService,
  ) {
    this.unsubscribe = new Subject();
    const templateModel = new TemplateModel();
    this.templateForm = new FormGroup({ ...templateModel });
    this.idTemplate = this.dialogConfig.data?.id;
    this.actionType = this.dialogConfig.data?.actionType || ActionModal.REGISTRAR;
  }

  public async ngOnInit() {
    this.templateForm.get('contenido')?.disable();
    this.tipoContratos = await this.templateService.getTipoContratos();
    if (this.idTemplate) {
      await this.patchValue();
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public onUpload(event: any) {
    this.spinnerService.show();
    try {
      const fileUpload = event.target.files[0];
      const formData = new FormData();
      formData.append('archivo', fileUpload);
      this.documentService.uploadFile(formData).subscribe((response: IResponseFile) => {
        event.target.value = '';
        this.file = {
          name: response.archivo,
          path: response.nombreArchivoDisco,
          size: (fileUpload.size * 0.00097656).toFixed(2),
        };

        this.templateForm.get('ruta')?.setValue(this.file.path);
        this.templateForm.get('name')?.setValue(this.file.name);
        this.rutaPLantilla = this.file.path;

        this.spinnerService.hide();
      });
    } catch (error) {
      this.spinnerService.hide();
    }
  }

  public submit() {
    Utils.validateAllFields(this.templateForm);
    if (this.templateForm.valid) {
      try {
        const params = this.templateForm.value;
        // eslint-disable-next-line no-console
        console.log(params);
        this.templateService
          .registerPlantilla(params)
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
    const data = await this.templateService.getPlantillaById(this.idTemplate as number);

    this.templateForm.get('id')?.setValue(data.id);
    this.templateForm.get('nombre')?.setValue(data.nombre);
    this.templateForm.get('idTipoContrato')?.setValue(data.tipoContrato.id);
    this.templateForm.get('estado')?.setValue(data.estado == 'A' ? true : false);
    this.rutaPLantilla = data.ruta;
  }
}
