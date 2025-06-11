import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Utils } from '@speed/common/helpers';
import { IGroup } from '@speed/common/interfaces';
import { SpinnerOverlayService } from '@speed/common/services';
import { environment } from '@speed/env/environment';
import { ComboDataService } from '@speed/final-user/common/services';
import { WorkflowTabCacheService } from 'src/app/workflow/workflow-tab-cache-service';

@Component({
  selector: 'app-user-groups-report',
  templateUrl: './user-groups-report.component.html',
  styleUrls: ['./user-groups-report.component.scss'],
  providers: [ComboDataService],
})
export class UserGroupsReportComponent implements OnInit {
  public requestForm!: FormGroup;
  public groupList: Array<IGroup> = [];
  public urlReporte!: SafeResourceUrl;
  public showReporte = false;
  cachedData: any;

  public constructor(
    private dataService: ComboDataService,
    private spinnerService: SpinnerOverlayService,
    private fb: FormBuilder,
    private domSanitizer: DomSanitizer,
    private cacheService: WorkflowTabCacheService
  ) {
    this.requestForm = this.fb.group({
      id_grupo: [null, Validators.required],
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

  public cleanForm() {
    this.requestForm.reset();
  }

  public submit(): void {
    Utils.validateAllFields(this.requestForm);
    if (this.requestForm.valid) {
      const url =
        environment.reporteGrupoUsuario +
        '&rs:embed=true&rc:parameters=false' +
        '&id_grupo=' +
        (this.requestForm.get('id_grupo')?.value == null ? '' : this.requestForm.get('id_grupo')?.value);
      this.urlReporte = this.domSanitizer.bypassSecurityTrustResourceUrl(url);
      this.cachedData.urlReporte = this.urlReporte;
      this.cacheService.set('Reporte de Grupos de Usuarios', this.cachedData);
      this.showReporte = true;
    }
  }

  private async recoverData() {
    this.cachedData = this.cacheService.get('Reporte de Grupos de Usuarios');
    if (this.cachedData && this.cachedData.groupList) {
      this.groupList = this.cachedData.groupList;
      if (this.cachedData.urlReporte) {
        this.urlReporte = this.cachedData.urlReporte;
        this.showReporte = true;
      }
    } else {
      this.spinnerService.show();
      this.cachedData = {};
      this.groupList = await this.dataService.getActiveGroups();
      this.cachedData.groupList = this.groupList;

      this.cacheService.set('Reporte de Grupos de Usuarios', this.cachedData);
      this.spinnerService.hide();
    }
  }
}