import { NgIf, NgFor } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DialogRef } from '@speed/common/dialog/dialog.ref';
import { DialogConfig } from '@speed/common/dialog/dialog.service';
import { ActionModal } from '@speed/common/enums';
import { Utils } from '@speed/common/helpers';
import { QuestionVirtualAssistantModel } from '@speed/common/models';
import { Subject } from 'rxjs';
import { VirtualAssistantMaintenanceService } from 'src/app/workflow/maintenance/common/services';
import { CustomReactiveFormDirective } from '@speed/common/directives';
import { IAreaPregunta } from '@speed/common/interfaces';

@Component({
  standalone: true,
  selector: 'ui-virtual-assistant-question-modal',
  templateUrl: 'virtual-assistant-question-modal.component.html',
  styleUrls: ['./virtual-assistant-question-modal.component.scss'],
  providers: [VirtualAssistantMaintenanceService],
  imports: [NgIf, NgFor, ReactiveFormsModule, CustomReactiveFormDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class VirtualAssistantQuestionModalComponent implements OnInit, OnDestroy {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public data: any;
  public questionForm: FormGroup;
  public idPregunta = 0;
  public areas: IAreaPregunta[] = [];
  public temas: IAreaPregunta[] = [];
  public showVigente = false;
  public actionType = ActionModal.REGISTRAR;
  public readonly actionModalEnum = ActionModal;
  private unsubscribe: Subject<void>;

  public constructor(
    private cd: ChangeDetectorRef,
    private virtualAssistantService: VirtualAssistantMaintenanceService,
    private dialogConfig: DialogConfig,
    private dialogRef: DialogRef<unknown>,
  ) {
    this.unsubscribe = new Subject();
    const question = new QuestionVirtualAssistantModel();
    this.questionForm = new FormGroup({ ...question });
    this.data = this.dialogConfig.data || {};
    this.areas = this.data.areas;
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

  public async selectArea(event: Event) {
    const id = (event as CustomEvent).detail != null ? (event as CustomEvent).detail : '';
    this.questionForm.get('codigoArea')?.setValue(id);
    this.temas = await this.virtualAssistantService.getTemasByArea({ codArea: this.questionForm.get('codigoArea')?.value });
  }

  public selectTema(event: Event) {
    const id = (event as CustomEvent).detail != null ? (event as CustomEvent).detail : '';
    this.questionForm.get('codigoTema')?.setValue(id);
  }

  public async submit() {
    Utils.validateAllFields(this.questionForm);
    if (this.questionForm.valid) {
      try {
        if (this.actionType === ActionModal.REGISTRAR) {
          await this.virtualAssistantService.registrarPregunta(this.questionForm.getRawValue());
        } else if (this.actionType === ActionModal.EDITAR) {
          await this.virtualAssistantService.modificarPregunta(this.questionForm.getRawValue());
        }
        this.dialogRef.close();
      } catch (err) {
        console.error(err);
      }
    }
  }

  private async initForm() {
    this.actionType = this.data.actionType || ActionModal.REGISTRAR;
    if (this.actionType === ActionModal.REGISTRAR) {
      this.showVigente = false;
      this.questionForm.get('vigente')?.setValue('S');
    } else if (this.actionType === ActionModal.EDITAR) {
      this.idPregunta = this.data.idPregunta;

      const pregunta = await this.virtualAssistantService.getPreguntaRespuesta({ codigo: this.idPregunta });
      this.showVigente = true;

      this.questionForm.get('idAplicacion')?.setValue(pregunta.id?.aplicacion);
      this.questionForm.get('codigo')?.setValue(pregunta.id?.codigo);
      this.questionForm.get('codigoArea')?.setValue(pregunta.grupo?.area?.id);
      this.temas = await this.virtualAssistantService.getTemasByArea({ codArea: this.questionForm.get('codigoArea')?.value });
      this.questionForm.get('codigoArea')?.disable({ onlySelf: true });
      this.questionForm.get('codigoTema')?.setValue(pregunta.grupo?.tema?.id);
      this.questionForm.get('codigoTema')?.disable({ onlySelf: true });
      this.questionForm.get('codigoPregunta')?.setValue(pregunta.codigoPregunta);
      this.questionForm.get('descripcionPregunta')?.setValue(pregunta.descripcionPregunta);
      this.questionForm.get('codigoRespuesta')?.setValue(pregunta.codigoRespuesta);
      this.questionForm.get('descripcionRespuesta')?.setValue(pregunta.descripcionRespuesta);
      this.questionForm.get('vigente')?.setValue(pregunta.vigente);
    }
    this.cd.detectChanges();
  }
}
