import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Utils } from '@speed/common/helpers';
import { IAbogadoResponsable } from '@speed/common/interfaces';
import { SpinnerOverlayService } from '@speed/common/services';
import { environment } from '@speed/env/environment';
import { ComboDataService } from '@speed/final-user/common/services';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { WorkflowTabCacheService } from 'src/app/workflow/workflow-tab-cache-service';

@Component({
  selector: 'app-indicators',
  templateUrl: './indicators.component.html',
  styleUrls: ['./indicators.component.scss'],
  providers: [ComboDataService],
})
export class IndicatorsComponent implements OnInit {
  public isLoading = false;
  public requestForm!: FormGroup;
  public responsibleLawyerList: IAbogadoResponsable[] = [];
  public urlReporte!: SafeResourceUrl;
  public showReporte = false;
  public estadoList = [
    { id: 'N', nombre: 'En Solicitud' },
    { id: 'R', nombre: 'Solicitud Enviada' },
    { id: 'E', nombre: 'En Elaboración' },
    { id: 'D', nombre: 'Documento Elaborado' },
    { id: 'V', nombre: 'Enviado a Visado' },
    { id: 'S', nombre: 'Documento Visado' },
    { id: 'F', nombre: 'Enviado a Firma' },
    { id: 'C', nombre: 'Comunicación a Interesados' },
    { id: 'T', nombre: 'Vigente' },
    { id: 'O', nombre: 'Vencido' },
  ];
  cachedData: any;

  public constructor(
    private dataService: ComboDataService,
    private fb: FormBuilder,
    private spinnerService: SpinnerOverlayService,
    private domSanitizer: DomSanitizer,
    private cacheService: WorkflowTabCacheService
  ) {
    this.requestForm = this.fb.group({
      abogadoResponsable: [null],
      fechaInicio: [null, Validators.required],
      fechaFin: [null, Validators.required],
      estado: [''],
    });
  }

  public ngOnInit(): void {
    try {
      this.recoverData();
    } catch (err) {
      console.error(err);
    } finally {
      this.isLoading = false;
      this.spinnerService.hide();
    }
  }

  public cleanForm() {
    this.requestForm.reset();
    this.requestForm.get('estado')?.setValue('');
  }

  public submit() {
    Utils.validateAllFields(this.requestForm);
    if (this.requestForm.valid) {
      const url =
        environment.reporteIndicadores +
        '&rs:embed=true&rc:parameters=false' +
        '&fechaInicio=' +
        Utils.formatDate(this.requestForm.get('fechaInicio')?.value, 'DD/MM/YYYY') +
        '&fechaFin=' +
        Utils.formatDate(this.requestForm.get('fechaFin')?.value, 'DD/MM/YYYY') +
        '&abogadoResponsable=' +
        (this.requestForm.get('abogadoResponsable')?.value == null ? 0 : this.requestForm.get('abogadoResponsable')?.value.id) +
        '&estado=' +
        (this.requestForm.get('estado')?.value == null ? '' : this.requestForm.get('estado')?.value);
      this.urlReporte = this.domSanitizer.bypassSecurityTrustResourceUrl(url);
      this.cachedData.urlReporte = this.urlReporte;
      this.cacheService.set('Indicadores', this.cachedData);
      // eslint-disable-next-line no-console
      this.showReporte = true;
    }
  }

  public selectResponsibleLawyer(event: Event) {
    const select = (event as CustomEvent).detail;
    this.requestForm.get('abogadoResponsable')?.setValue(select);
  }

  public isInvalidControl(control: string): boolean {
    return (this.requestForm.get(control)?.invalid && this.requestForm.get(control)?.touched) || false;
  }

  private async recoverData() {
    this.cachedData = this.cacheService.get('Indicadores');
    if (this.cachedData && this.cachedData.responsibleLawyerList) {
      this.responsibleLawyerList = this.cachedData.responsibleLawyerList;
      if (this.cachedData.urlReporte) {
        this.urlReporte = this.cachedData.urlReporte;
        this.showReporte = true;
      }
    } else {
      try {
        this.isLoading = true;
        this.spinnerService.show();
        this.cachedData = {};
        this.responsibleLawyerList = await this.dataService.getResponsibleLawyers();

        this.cachedData.responsibleLawyerList = this.responsibleLawyerList;

        this.cacheService.set('Indicadores', this.cachedData);
        this.isLoading = false;
      } catch (err) {
        console.error(err);
        this.isLoading = false;
      }
    }
  }
}
