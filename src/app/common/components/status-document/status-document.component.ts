import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VirtualAssistantMaintenanceService } from 'src/app/workflow/maintenance/common/services';
import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { IEstadoDocumento } from '@speed/common/interfaces';
import { SpinnerOverlayService } from '@speed/common/services';
import { Utils } from '@speed/common/helpers';

@Component({
  selector: 'app-status-document',
  templateUrl: './status-document.component.html',
  standalone: true,
  styleUrls: ['./status-document.component.scss'],
  imports: [NgIf, NgFor, NgClass, ReactiveFormsModule, DatePipe],

  providers: [VirtualAssistantMaintenanceService],
})
export class StatusDocumentComponent {
  public busquedaInicial = false;
  public requestForm: FormGroup;
  public listEstados: Array<IEstadoDocumento> = [];
  public mensaje = '';
  public constructor(
    private fb: FormBuilder,
    private virtualAssistanService: VirtualAssistantMaintenanceService,
    private spinnerService: SpinnerOverlayService,
  ) {
    this.requestForm = this.fb.group({
      codigo: ['', [Validators.minLength(5), Validators.required]],
    });
  }
  public formatDate(date: Date) {
    return date !== null ? Utils.formatDate(date, 'DD/MM/yyyy') : '';
  }
  public async buscarDocumento() {
    Utils.validateAllFields(this.requestForm);
    if (this.requestForm.valid) {
      this.busquedaInicial = true;
      this.spinnerService.show();
      this.listEstados = await this.virtualAssistanService.getEstadoDocumento(this.requestForm.value);
      this.virtualAssistanService.registrarUsabilidad({ idOpcionAsistente: 1, esOpcionAsistente: 'N' });
      this.mensaje = this.requestForm.value.codigo;
      this.spinnerService.hide();
      this.requestForm.reset();
    }
  }
}
