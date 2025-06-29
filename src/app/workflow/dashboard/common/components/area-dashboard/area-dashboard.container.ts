import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IDashboardResponse, IParameter } from '@speed/common/interfaces';
import { DashboardService } from '../../services';
import {
  IModeloDocumento,
  ISolicitudesAbogados,
  ISolicitudesArea,
  ISolicitudesGenerales,
  ISolicitudesGeneralesElaborado,
  ISolicitudesVigentes,
} from '../../interfaces';
import { Subject, takeUntil } from 'rxjs';
import { SpinnerOverlayService } from '@speed/common/services';
import { DialogService } from '@speed/common/dialog';
import { MessageModalComponent } from '@speed/common/modals';
import { WorkflowTabCacheService } from 'src/app/workflow/workflow-tab-cache-service';

@Component({
  selector: 'app-area-dashboard',
  templateUrl: 'area-dashboard.container.html',
  providers: [DashboardService],
})
export class AreaDashboardContainer implements OnInit, OnDestroy {
  @Input() public dataDashboard?: IDashboardResponse;
  public isLoading = true;
  public dataSolicitudesGenerales: Array<ISolicitudesGenerales> = [];
  public dataSolicitudesGeneralesElaborado: Array<ISolicitudesGeneralesElaborado> = [];
  public dataSolicitudesAbogado: Array<ISolicitudesAbogados> = [];
  public dataSolicitudesVigente: Array<ISolicitudesVigentes> = [];
  @Input() public urlLegalAlDia?: IParameter;
  public dataSolicitudes: Array<ISolicitudesArea> = [];
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
      this.cachedData.dataSolicitudesGeneralesElaborado &&
      this.cachedData.dataSolicitudesAbogado &&
      this.cachedData.dataSolicitudesVigente &&
      this.cachedData.dataSolicitudes &&
      this.cachedData.modeloDocumentos
    ) {
      this.dataSolicitudesGenerales = this.cachedData.dataSolicitudesGenerales;
      this.dataSolicitudesGeneralesElaborado = this.cachedData.dataSolicitudesGeneralesElaborado;
      this.dataSolicitudesAbogado = this.cachedData.dataSolicitudesAbogado;
      this.dataSolicitudesVigente = this.cachedData.dataSolicitudesVigente;
      this.dataSolicitudes = this.cachedData.dataSolicitudes;
      this.modeloDocumentos = this.cachedData.modeloDocumentos;
    } else {
      this.spinnerService.show();
      this.getSolicitudes();
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
      this.dashboardService.solicitudesGeneralesArea(),
      this.dashboardService.solicitudesPorAbogadoArea(),
      this.dashboardService.solicitudesVigentesArea(),
      this.dashboardService.solicitudesArea(),
      this.dashboardService.solicitudesGeneralesElaborado(4),
    ]);
    this.dataSolicitudesGenerales = responses[0];
    this.dataSolicitudesAbogado = responses[1];
    this.dataSolicitudesVigente = responses[2];
    this.dataSolicitudes = responses[3];
    this.dataSolicitudesGeneralesElaborado = responses[4];
    this.cachedData.dataSolicitudesGenerales = this.dataSolicitudesGenerales;
    this.cachedData.dataSolicitudesGeneralesElaborado = this.dataSolicitudesGeneralesElaborado;
    this.cachedData.dataSolicitudesAbogado = this.dataSolicitudesAbogado;
    this.cachedData.dataSolicitudesVigente = this.dataSolicitudesVigente;
    this.cachedData.dataSolicitudes = this.dataSolicitudes;

    this.cacheService.set('Dashboard', this.cachedData);

    this.spinnerService.hide();
    this.isLoading = false;
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
