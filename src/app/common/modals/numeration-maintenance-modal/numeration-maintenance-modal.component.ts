import { NgIf, NgFor } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DialogRef } from '@speed/common/dialog/dialog.ref';
import { DialogConfig } from '@speed/common/dialog/dialog.service';
import { ActionModal } from '@speed/common/enums';
import { AreaBD } from '@speed/common/interfaces';
import { SpinnerOverlayService } from '@speed/common/services';
import { Subject, takeUntil } from 'rxjs';
import { Utils } from '@speed/common/helpers';
import { CustomReactiveFormDirective } from '@speed/common/directives';
import { NumerationService } from '@speed/final-user/common/services/numeration.service';
import { NumerationModel } from '@speed/common/models/numeration.model';
import { DocumentTypeBD } from '@speed/common/interfaces/document-type.interface';
import { RadioButtonModule } from 'primeng/radiobutton';

@Component({
  standalone: true,
  selector: 'ui-numeration-modal',
  templateUrl: 'numeration-maintenance-modal.component.html',
  styleUrls: ['./numeration-maintenance-modal.component.scss'],
  providers: [NumerationService],
  imports: [NgIf, NgFor, ReactiveFormsModule, CustomReactiveFormDirective, RadioButtonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NumerationMaintenanceModalComponent implements OnInit, OnDestroy {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public idNumeration?: number;
  public numerationForm: FormGroup;
  public tipoDocumentos: Array<DocumentTypeBD> = [];
  public areas: Array<AreaBD> = [];
  public readonly action = ActionModal;
  public actionType = ActionModal.REGISTRAR;
  private unsubscribe: Subject<void>;

  public constructor(
    private cd: ChangeDetectorRef,
    private numerationService: NumerationService,
    private dialogConfig: DialogConfig<{ id?: number; actionType?: ActionModal }>,
    private dialogRef: DialogRef<unknown>,
    private spinnerService: SpinnerOverlayService,
  ) {
    this.unsubscribe = new Subject();
    const numerationModel = new NumerationModel();
    this.numerationForm = new FormGroup({ ...numerationModel });
    this.idNumeration = this.dialogConfig.data?.id;
    this.actionType = this.dialogConfig.data?.actionType || ActionModal.REGISTRAR;
  }

  public async ngOnInit() {
    this.numerationForm.get('contenido')?.disable();
    this.tipoDocumentos = await this.numerationService.getTipoDocumentos();
    this.areas = await this.numerationService.getAreas();
    if (this.idNumeration) {
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

  public submit() {
    Utils.validateAllFields(this.numerationForm);
    if (this.numerationForm.valid) {
      try {
        const params = this.numerationForm.value;
        // eslint-disable-next-line no-console
        console.log(params);
        this.numerationService
          .registerNumeracion(params)
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
    const data = await this.numerationService.getNumeracionById(this.idNumeration as number);

    this.numerationForm.get('id')?.setValue(data.id);
    this.numerationForm.get('idArea')?.setValue(data.area.id);
    this.numerationForm.get('idTipoDocumento')?.setValue(data.tipoDocumento.id);
    this.numerationForm.get('numeroActual')?.setValue(data.valor);
    this.numerationForm.get('preFormato')?.setValue(data.preformato);
    this.numerationForm.get('postFormato')?.setValue(data.postFormato);
    this.numerationForm.get('longitud')?.setValue(data.longitud);
    this.numerationForm.get('tipoNumeracion')?.setValue(data.tipo);
  }
}
