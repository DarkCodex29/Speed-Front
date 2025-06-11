import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IDashboardResponse, IParameter } from '@speed/common/interfaces';
import { Subject, takeUntil } from 'rxjs';
import { DashboardService } from '../../services';
import { SpinnerOverlayService } from '@speed/common/services';
import {
  IClientesInternos,
  IModeloDocumento,
  ISolicitudesAbogadosResponsables,
  ISolicitudesGenerales,
  ISolicitudesGeneralesElaborado,
} from '../../interfaces';
import { DialogService } from '@speed/common/dialog';
import { MessageModalComponent } from '@speed/common/modals';
import { WorkflowTabCacheService } from 'src/app/workflow/workflow-tab-cache-service';

@Component({
  selector: 'app-lawyer-dashboard',
  templateUrl: 'lawyer-dashboard.container.html',
  providers: [DashboardService],
})
export class LawyerDashboardContainer implements OnInit, OnDestroy {
  @Input() public dataDashboard?: IDashboardResponse;
  public isLoading = true;
  public dataSolicitudesGenerales: Array<ISolicitudesGenerales> = [];
  public dataSolicitudesGeneralesElaborado: Array<ISolicitudesGeneralesElaborado> = [];
  @Input() public urlLegalAlDia?: IParameter;
  public dataSolicitudesAbogadoResponsable: Array<ISolicitudesAbogadosResponsables> = [];
  public dataClientesInternos: Array<IClientesInternos> = [];
  public modeloDocumentos: Array<IModeloDocumento> = [];
  private unsubscribe: Subject<void>;
  cachedData: any;

  public constructor(
    private dashboardService: DashboardService,
    private spinnerService: SpinnerOverlayService,
    private dialogService: DialogService,
    private cacheService: WorkflowTabCacheService,
  ) {
    this.unsubscribe = new Subject();
  }

  public async ngOnInit() {
    this.recoverData();
  }

  public recoverData() {
    //this.cachedData = this.cacheService.get('Dashboard');
    this.cachedData = {};
    if (
      this.cachedData &&
      this.cachedData.dataSolicitudesGenerales &&
      this.cachedData.dataSolicitudesAbogadoResponsable &&
      this.cachedData.dataSolicitudesGeneralesElaborado &&
      this.cachedData.dataClientesInternos &&
      this.cachedData.modeloDocumentos
    ) {
      this.dataSolicitudesGenerales = this.cachedData.dataSolicitudesGenerales;
      this.dataSolicitudesAbogadoResponsable = this.cachedData.dataSolicitudesAbogadoResponsable;
      this.dataSolicitudesGeneralesElaborado = this.cachedData.dataSolicitudesGeneralesElaborado;
      this.dataClientesInternos = this.cachedData.dataClientesInternos;
      this.modeloDocumentos = this.cachedData.modeloDocumentos;
    } else {
      this.spinnerService.show();
      this.getSolicitudes();
      this.getClienteInternos();
      this.getModeloDocumentos();
    }
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public onDownloadFile(ruta: string) {
    this.spinnerService.show();
    this.dashboardService
      .downloadDocument(ruta)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe({
        next: (response) => {
          this.spinnerService.hide();
          const fileName = response.headers.get('content-disposition')?.split(';')[1].split('=')[1];
          const blob: Blob = response.body as Blob;
          const a = document.createElement('a');
          a.download = fileName ?? '';
          a.href = window.URL.createObjectURL(blob);
          a.click();
        },
        error: () => {
          this.spinnerService.hide();
          this.dialogService.show({
            component: MessageModalComponent,
            config: {
              data: {
                message: 'Error al descargar el documento.',
              },
            },
          });
        },
      });
  }

  private async getSolicitudes() {
    const responses = await Promise.all([
      this.dashboardService.solicitudesGenerales(1),
      this.dashboardService.solicitudesPorAbogadoResponsable(1),
      this.dashboardService.solicitudesGeneralesElaborado(1),
    ]);
    this.dataSolicitudesGenerales = responses[0];
    this.dataSolicitudesAbogadoResponsable = responses[1];
    this.dataSolicitudesGeneralesElaborado = responses[2];

    this.cachedData.dataSolicitudesGenerales = this.dataSolicitudesGenerales;
    this.cachedData.dataSolicitudesAbogadoResponsable = this.dataSolicitudesAbogadoResponsable;
    this.cachedData.dataSolicitudesGeneralesElaborado = this.dataSolicitudesGeneralesElaborado;

    this.cacheService.set('Dashboard', this.cachedData);

    this.spinnerService.hide();
    this.isLoading = false;
  }

  private getClienteInternos() {
    this.dashboardService
      .clientesInternos(1)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe({
        next: (response) => {
          this.dataClientesInternos = response;
          this.cachedData.dataClientesInternos = this.dataClientesInternos;
          this.cacheService.set('Dashboard', this.cachedData);
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

  private getModeloDocumentos() {
    this.dashboardService
      .modeloDocumentos()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((data) => {
        this.modeloDocumentos = data;
        this.cachedData.modeloDocumentos = this.modeloDocumentos;
        this.cacheService.set('Dashboard', this.cachedData);
      });
  }
}
