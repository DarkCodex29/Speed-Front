import { Component, OnInit, Input, AfterContentInit, AfterViewInit, ViewChild } from '@angular/core';
import { IDashboardResponse, IParameter } from '@speed/common/interfaces';
import { IModeloDocumento } from './common/interfaces';
import { LawyerDashboardComponent } from './common/components/lawyer-dashboard/lawyer-dashboard.component';
import { LawyerDashboardContainer } from './common/components/lawyer-dashboard/lawyer-dashboard.container';
import { PracticingDashboardContainer } from './common/components/practicing-dashboard/practicing-dashboard.container';
import { AdcDashboardContainer } from './common/components/adc-dashboard/adc-dashboard.container';
import { AreaDashboardContainer } from './common/components/area-dashboard/area-dashboard.container';
import { ManagerDashboardContainer } from './common/components/manager-dashboard/manager-dashboard.container';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @Input() public dataDashboard?: IDashboardResponse;
  @Input() public urlLegalAlDia?: IParameter;
  @Input() public modeloDocumentos!: Array<IModeloDocumento>;
  @ViewChild(LawyerDashboardContainer) lawyerDashboardContainer!: LawyerDashboardContainer;
  @ViewChild(PracticingDashboardContainer) practicingDashboardContainer!: PracticingDashboardContainer;
  @ViewChild(AdcDashboardContainer) adcDashboardContainer!: AdcDashboardContainer;
  @ViewChild(AreaDashboardContainer) areaDashboardContainer!: AreaDashboardContainer;
  @ViewChild(ManagerDashboardContainer) managerDashboardContainer!: ManagerDashboardContainer;

  public typeUser = 1;

  public ngOnInit(): void {
    this.typeUser = this.dataDashboard?.tipo || 5;
  }
  public ngAfterViewInit() {
    this.validarUrlExterno();
  }

  public validarUrlExterno() {
    const urlExternal: string = localStorage.getItem('urlExternal') || '';
    if (urlExternal && urlExternal !== '') {
      localStorage.setItem('urlExternal', 'false');
    }
  }

  public changeChildData() {
    switch (this.typeUser) {
      case 1:
        this.lawyerDashboardContainer.recoverData();
        break;
      case 2:
        this.practicingDashboardContainer.recoverData();
        break;
      case 3:
        this.adcDashboardContainer.recoverData();
        break;
      case 4:
        this.areaDashboardContainer.recoverData();
        break;
      case 5:
        this.managerDashboardContainer.recoverData();
        break;
    }
  }
}
