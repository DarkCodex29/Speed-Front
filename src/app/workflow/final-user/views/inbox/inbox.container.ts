import { Component, OnInit } from '@angular/core';
import { ICompany, ICounterPartBD, ICountry, IProcess, IState } from '@speed/common/interfaces';
import { SpinnerOverlayService } from '@speed/common/services';
import { ComboDataService, InboxService } from '@speed/final-user/common/services';
import { Subject, takeUntil } from 'rxjs';
import { ISearchResponseInbox } from './common/interfaces';
import { Utils } from '@speed/common/helpers';
import { WorkflowTabCacheService } from 'src/app/workflow/workflow-tab-cache-service';

@Component({
  selector: 'app-inbox-container',
  templateUrl: './inbox.container.html',
  providers: [ComboDataService, InboxService],
})
export class InboxContainer implements OnInit {
  public isLoading = false;
  public countriesList: ICountry[] = [];
  public companiesList: ICompany[] = [];
  public counterpartsList: ICounterPartBD[] = [];
  public statesList: IState[] = [];
  public processesList: IProcess[] = [];
  public tableInbox: ISearchResponseInbox[] = [];
  public destroy$: Subject<boolean> = new Subject<boolean>();
  cachedData: any;

  public constructor(
    private dataService: ComboDataService,
    private spinnerService: SpinnerOverlayService,
    private inboxService: InboxService,
    private cacheService: WorkflowTabCacheService,
  ) {}

  public async ngOnInit() {
    await this.recoverData();
  }

  private async recoverData() {
    this.isLoading = true;
    this.spinnerService.show();
    //this.cachedData = this.cacheService.get('Bandeja de Entrada');
    this.cachedData = {};
    if (
      this.cachedData &&
      this.cachedData.countriesList &&
      this.cachedData.companiesList &&
      this.cachedData.counterpartsList &&
      this.cachedData.statesList &&
      this.cachedData.processesList
    ) {
      this.countriesList = this.cachedData.countriesList;
      this.companiesList = this.cachedData.companiesList;
      this.counterpartsList = this.cachedData.counterpartsList;
      this.statesList = this.cachedData.statesList;
      this.processesList = this.cachedData.processesList;
      if (this.cachedData.tableInbox) {
        this.tableInbox = this.cachedData.tableInbox;
      }
      this.isLoading = false;
      this.spinnerService.hide();
    } else {
      this.cachedData = {};
      try {
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
          usuario: '',
          fecha: Utils.formatDate(new Date(), 'yyyy-MM-DD'),
          pais: '',
        };

        this.inboxService
          .obtenerBandejaEntrada(params)
          .pipe(takeUntil(this.destroy$))
          .subscribe((items) => {
            this.tableInbox = items;
            this.cachedData.tableInbox = this.tableInbox;

            this.cacheService.set('Bandeja de Entrada', this.cachedData);

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
