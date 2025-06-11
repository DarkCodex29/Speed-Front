import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VirtualAssistantMaintenanceService } from 'src/app/workflow/maintenance/common/services';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { SpinnerOverlayService } from '@speed/common/services';
import { Utils } from '@speed/common/helpers';

@Component({
  selector: 'app-register-question-assistant',
  templateUrl: './register-question-assistant.component.html',
  standalone: true,
  styleUrls: ['./register-question-assistant.component.scss'],
  imports: [NgIf, NgFor, NgClass, ReactiveFormsModule],

  providers: [VirtualAssistantMaintenanceService],
})
export class RegisterQuestionAssistantComponent {
  public requestForm: FormGroup;
  public mensaje = '';
  public constructor(
    private fb: FormBuilder,
    private virtualAssistanService: VirtualAssistantMaintenanceService,
    private spinnerService: SpinnerOverlayService,
  ) {
    this.requestForm = this.fb.group({
      pregunta: ['', [Validators.minLength(5), Validators.required]],
    });
  }
  public async registerPregunta() {
    Utils.validateAllFields(this.requestForm);
    if (this.requestForm.valid) {
      this.spinnerService.show();
      this.mensaje = 'Su pregunta se registró de manera correcta';
      this.virtualAssistanService.registrarUsabilidad({ idOpcionAsistente: 2, esOpcionAsistente: 'N' });
      this.spinnerService.hide();
      this.requestForm.reset();
    }
  }
}
