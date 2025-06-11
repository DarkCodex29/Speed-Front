import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { IDashboardResponse, IParameter } from '@speed/common/interfaces';
import { SpinnerOverlayService } from '@speed/common/services';
import { interval, Subject, Subscription, takeUntil } from 'rxjs';
import { DashboardService } from './common/services';
import { WorkflowTabCacheService } from '../workflow-tab-cache-service';
import { DashboardComponent } from './dashboard.component';

@Component({
  selector: 'app-dashboard-container',
  templateUrl: './dashboard.container.html',
  providers: [DashboardService],
})
export class DashboardContainer implements OnInit, OnDestroy {
  @ViewChild(DashboardComponent) lawyerDashboardContainer!: DashboardComponent;
  public isLoading = true;
  public dataDashboard?: IDashboardResponse;
  public urlLegalAlDia?: IParameter;
  private unsubscribe: Subject<void> = new Subject();
  private mySubscription: Subscription;
  cachedData: any;

  public constructor(
    private dashboardService: DashboardService,
    private spinnerService: SpinnerOverlayService,
    private cacheService: WorkflowTabCacheService
  ) {
    this.mySubscription = interval(120000).subscribe((x) => {
      this.recoverData();
    });
  }

  public async ngOnInit() {
    this.recoverData();
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
    this.mySubscription.unsubscribe();
  }

  public async recoverData() {
    //this.cachedData = this.cacheService.get('Dashboard');
    this.cachedData = {};
    if (this.cachedData && this.cachedData.urlLegalAlDia && this.cachedData.dataDashboard) {
      this.urlLegalAlDia = this.cachedData.urlLegalAlDia;
      this.dataDashboard = this.cachedData.dataDashboard;
      this.isLoading = false;
    }
    else {
      this.spinnerService.show();
      this.cachedData = {};
      this.urlLegalAlDia = await this.dashboardService.getUrlLegalAlDia();
      this.cachedData.urlLegalAlDia = this.urlLegalAlDia;
      this.dashboardService
        .validarAcceso()
        .pipe(takeUntil(this.unsubscribe))
        .subscribe({
          next: (data) => {
            this.dataDashboard = data;
            this.cachedData.dataDashboard = data;
            this.cacheService.set('Dashboard', this.cachedData);
            this.spinnerService.hide();
            this.isLoading = false;
          },
          error: (err) => {
            this.spinnerService.hide();
            this.isLoading = false;
            console.error(err);
          },
        });
        this.lawyerDashboardContainer?.changeChildData();    
    }

  }
}
