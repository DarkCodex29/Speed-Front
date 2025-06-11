import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Utils } from '@speed/common/helpers';
import { IAbogadoResponsable, ICounterPartBD, IRequestingUser } from '@speed/common/interfaces';
import { SpinnerOverlayService } from '@speed/common/services';
import { environment } from '@speed/env/environment';
import { ComboDataService } from '@speed/final-user/common/services';
import { WorkflowTabCacheService } from 'src/app/workflow/workflow-tab-cache-service';

@Component({
  selector: 'app-electronic-signature-tracking',
  templateUrl: './electronic-signature-tracking.component.html',
  styleUrls: ['./electronic-signature-tracking.component.scss'],
  providers: [ComboDataService],
})
export class ElectronicSignatureTrackingComponent implements OnInit {
  public requestForm!: FormGroup;
  public requestingUserList: IRequestingUser[] = [];
  public responsibleLawyerList: IAbogadoResponsable[] = [];
  public listCounterpart: Array<ICounterPartBD> = [];
  public urlReporte!: SafeResourceUrl;
  public showReporte = false;
  cachedData: any;

  public constructor(
    private spinnerService: SpinnerOverlayService,
    private fb: FormBuilder,
    private dataService: ComboDataService,
    private domSanitizer: DomSanitizer,
    private cacheService: WorkflowTabCacheService
  ) {
    this.requestForm = this.fb.group({
      numero: [null],
      sumilla: [null],
      solicitante: [''],
      abogadoResponsable: [''],
      contraparte: [''],
    });
  }

  public ngOnInit(): void {
    try {
      this.recoverData();
    } catch (err) {
      console.error(err);
      this.spinnerService.hide();
    }
  }

  public selectResponsibleLawyer(event: Event) {
    const id = (event as CustomEvent).detail != null ? (event as CustomEvent).detail : '';
    this.requestForm.get('abogadoResponsable')?.setValue(id);
  }

  public selectCounterpart(event: Event) {
    const id = (event as CustomEvent).detail != null ? (event as CustomEvent).detail : '';
    this.requestForm.get('contraparte')?.setValue(id);
  }

  public selectRequestingUser(event: Event) {
    const id = (event as CustomEvent).detail != null ? (event as CustomEvent).detail : '';
    this.requestForm.get('solicitante')?.setValue(id);
  }

  public isInvalidControl(control: string): boolean {
    return (this.requestForm.get(control)?.invalid && this.requestForm.get(control)?.touched) || false;
  }

  public cleanForm() {
    this.requestForm.reset();
  }

  public submit(): void {
    Utils.validateAllFields(this.requestForm);
    if (this.requestForm.valid) {
      const url =
        environment.reporteSeguimientoFirmaElectronica +
        '&rs:embed=true&rc:parameters=false' +
        '&numero=' +
        (this.requestForm.get('numero')?.value == null ? '' : this.requestForm.get('numero')?.value) +
        '&sumilla=' +
        (this.requestForm.get('sumilla')?.value == null ? '' : this.requestForm.get('sumilla')?.value) +
        '&solicitante=' +
        (this.requestForm.get('solicitante')?.value == '' ? '0' : String(this.requestForm.get('solicitante')?.value.id)) +
        '&abogadoResponsable=' +
        (this.requestForm.get('abogadoResponsable')?.value == '' ? '0' : String(this.requestForm.get('abogadoResponsable')?.value.id)) +
        '&contraparte=' +
        (this.requestForm.get('contraparte')?.value == '' ? '0' : String(this.requestForm.get('contraparte')?.value.id));
      this.urlReporte = this.domSanitizer.bypassSecurityTrustResourceUrl(url);
      this.cachedData.urlReporte = this.urlReporte;
      this.cacheService.set('Seguimiento de Firma Electrónica', this.cachedData);
      this.showReporte = true;
    }
  }

  private async recoverData() {
    this.cachedData = this.cacheService.get('Seguimiento de Firma Electrónica');
    if (this.cachedData && this.cachedData.requestingUserList &&
      this.cachedData.responsibleLawyerList &&
      this.cachedData.listCounterpart
    ) {
      this.requestingUserList = this.cachedData.requestingUserList;
      this.responsibleLawyerList = this.cachedData.responsibleLawyerList;
      this.listCounterpart = this.cachedData.listCounterpart;
      if (this.cachedData.urlReporte) {
        this.urlReporte = this.cachedData.urlReporte;
        this.showReporte = true;
      }
    } else {
      this.spinnerService.show();
      this.cachedData = {};
      const responses = await Promise.all([
        this.dataService.getRequestingUsers(),
        this.dataService.getResponsibleLawyers(),
        this.dataService.getCounterParts(),
      ]);
      this.requestingUserList = responses[0];
      this.responsibleLawyerList = responses[1];
      this.listCounterpart = responses[2];

      this.cachedData.requestingUserList = this.requestingUserList;
      this.cachedData.responsibleLawyerList = this.responsibleLawyerList;
      this.cachedData.listCounterpart = this.listCounterpart;

      this.cacheService.set('Seguimiento de Firma Electrónica', this.cachedData);

      this.spinnerService.hide();
    }
  }
}

