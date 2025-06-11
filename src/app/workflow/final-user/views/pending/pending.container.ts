import { Component, OnInit } from '@angular/core';
import { ICompany, ICounterPartBD, ICountry, IProcess, IState } from '@speed/common/interfaces';
import { SpinnerOverlayService } from '@speed/common/services';
import { ComboDataService, InboxService } from '@speed/final-user/common/services';
import { Subject, takeUntil } from 'rxjs';
import { ISearchResponsePending } from './common/interfaces';
import { WorkflowTabCacheService } from 'src/app/workflow/workflow-tab-cache-service';

@Component({
  selector: 'app-pending-container',
  templateUrl: './pending.container.html',
  providers: [ComboDataService, InboxService],
})
export class PendingContainer implements OnInit {
  public isLoading = false;
  public countriesList: ICountry[] = [];
  public companiesList: ICompany[] = [];
  public counterpartsList: ICounterPartBD[] = [];
  public statesList: IState[] = [];
  public processesList: IProcess[] = [];
  public tablePending: ISearchResponsePending[] = [];
  public destroy$: Subject<boolean> = new Subject<boolean>();
  cachedData: any;

  public constructor(
    private dataService: ComboDataService,
    private spinnerService: SpinnerOverlayService,
    private inboxService: InboxService,
    private cacheService: WorkflowTabCacheService
  ) { }

  public async ngOnInit() {
    await this.recoverData();
  }

  private async recoverData() {
    this.cachedData = this.cacheService.get('Mis Pendientes');
    if (this.cachedData && this.cachedData.countriesList &&
      this.cachedData.companiesList &&
      this.cachedData.counterpartsList &&
      this.cachedData.statesList &&
      this.cachedData.processesList) {
      this.countriesList = this.cachedData.countriesList;
      this.companiesList = this.cachedData.companiesList;
      this.counterpartsList = this.cachedData.counterpartsList;
      this.statesList = this.cachedData.statesList;
      this.processesList = this.cachedData.processesList;
      if (this.cachedData.tablePending) {
        this.tablePending = this.cachedData.tablePending;
      }
    } else {
      try {
        this.isLoading = true;
        this.spinnerService.show();
        this.cachedData = {};
        const responses = await Promise.all([
          this.dataService.getCountries(),
          this.dataService.getCompanies(),
          this.dataService.getCounterParts(),
          this.dataService.getStates(),
          this.dataService.getProcesos(5),
        ]);

        this.countriesList = responses[0];
        this.companiesList = responses[1];
        this.counterpartsList = responses[2];
        this.statesList = responses[3];
        this.processesList = responses[4];

        this.cachedData.countriesList = this.countriesList;
        this.cachedData.companiesList = this.companiesList;
        this.cachedData.counterpartsList = this.counterpartsList;
        this.cachedData.statesList = this.statesList;
        this.cachedData.processesList = this.processesList;

        const params = {
          numero: '',
          compania: '',
          contraparte: '',
          sumilla: '',
          estado: '',
          proceso: '',
          usuario: '447',
        };

        this.inboxService
          .obtenerMisPendientes(params)
          .pipe(takeUntil(this.destroy$))
          .subscribe((items) => {
            this.tablePending = items;

            this.cachedData.tablePending = this.tablePending;

            this.cacheService.set('Mis Pendientes', this.cachedData);
            this.spinnerService.hide();
          });
        this.isLoading = false;
      } catch (err) {
        console.error(err);
        this.isLoading = false;
        this.spinnerService.hide();
      }
    }
  }

}
