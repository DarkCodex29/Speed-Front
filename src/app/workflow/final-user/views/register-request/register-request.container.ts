import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { TipoProcesosBD } from '@speed/common/enums/process-type.enum';
import { IAbogadoResponsable, IProcess } from '@speed/common/interfaces';
import { LegalDocumentModel, NewRequestedModel } from '@speed/common/models';
import { SpinnerOverlayService } from '@speed/common/services';
import { ComboDataService } from '@speed/final-user/common/services';
import { WorkflowTabCacheService } from 'src/app/workflow/workflow-tab-cache-service';

@Component({
  selector: 'app-register-request-container',
  templateUrl: './register-request.container.html',
  providers: [ComboDataService],
})
export class RegisterRequestContainer implements OnInit {
  public isLoading = false;
  public requestForm!: FormGroup;
  public procesos: IProcess[] = [];
  public responsibleLawyersList: IAbogadoResponsable[] = [];
  cachedData: any;

  public constructor(
    private fb: FormBuilder,
    private dataService: ComboDataService,
    private spinnerService: SpinnerOverlayService,
    private cacheService: WorkflowTabCacheService
  ) { }

  public ngOnInit(): void {
    this.initForm();
    this.recoverData();
  }

  private initForm() {
    this.requestForm = this.fb.group({
      requested: new FormGroup({ ...new NewRequestedModel() }),
      process: new FormGroup({ ...new LegalDocumentModel() }),
      penalties: new FormArray<FormGroup>([]),
    });
  }

  private async recoverData() {
    this.cachedData = this.cacheService.get('Registrar Solicitud');
    if (this.cachedData && this.cachedData.responsibleLawyersList &&
      this.cachedData.procesos) {
      this.responsibleLawyersList = this.cachedData.responsibleLawyersList;
      this.procesos = this.cachedData.procesos;
    } else {
      try {
        this.isLoading = true;
        this.spinnerService.show();
        this.cachedData = {};
        this.responsibleLawyersList = await this.dataService.getResponsibleLawyers();
        this.cachedData.responsibleLawyersList = this.responsibleLawyersList;
        this.procesos = await this.dataService.getProcesos(TipoProcesosBD.PROCESO_HC);
        this.cachedData.procesos = this.procesos;

        this.cacheService.set('Registrar Solicitud', this.cachedData);

      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
      } finally {
        this.isLoading = false;
        this.spinnerService.hide();
      }
    }
  }
}
