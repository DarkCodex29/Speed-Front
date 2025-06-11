import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IDashboardResponse, IParameter } from '@speed/common/interfaces';
import { DashboardService } from '../../services';
import { Subject, takeUntil } from 'rxjs';
import { SpinnerOverlayService } from '@speed/common/services';
import { IModeloDocumento, IProcesoFirmaADC, IProcesoVisadoADC } from '../../interfaces';
import { DialogService } from '@speed/common/dialog';
import { MessageModalComponent } from '@speed/common/modals';
import { WorkflowTabCacheService } from 'src/app/workflow/workflow-tab-cache-service';

@Component({
  selector: 'app-adc-dashboard',
  templateUrl: 'adc-dashboard.container.html',
  providers: [DashboardService],
})
export class AdcDashboardContainer implements OnInit, OnDestroy {
  @Input() public dataDashboard?: IDashboardResponse;
  public isLoading = true;
  public grupos: Array<string> = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public documentos: any = {};
  public procesoFirma: Array<IProcesoFirmaADC> = [];
  public procesoVisado: Array<IProcesoVisadoADC> = [];
  @Input() public urlLegalAlDia?: IParameter;
  public modeloDocumentos: Array<IModeloDocumento> = [];
  private unsubscribe: Subject<void>;
  cachedData: any;

  public constructor(
    private dashboardService: DashboardService,
    private spinnerService: SpinnerOverlayService,
    private dialogService: DialogService,
    private cacheService: WorkflowTabCacheService
  ) {
    this.unsubscribe = new Subject();
  }

  public async ngOnInit() {
    this.recoverData();
  }

  public recoverData() {
    //this.cachedData = this.cacheService.get('Dashboard');
    this.cachedData = {};
    if (this.cachedData != null && this.cachedData.grupos
      && this.cachedData.documentos
      && this.cachedData.procesoFirma
      && this.cachedData.procesoVisado
      && this.cachedData.modeloDocumentos) {
      this.grupos = this.cachedData.grupos;
      this.documentos = this.cachedData.documentos;
      this.procesoFirma = this.cachedData.procesoFirma;
      this.procesoVisado = this.cachedData.procesoVisado;
      this.modeloDocumentos = this.cachedData.modeloDocumentos;
    } else {
      this.spinnerService.show();
      this.dashboardService
        .solicitudesPorGrupoAdc()
        .pipe(takeUntil(this.unsubscribe))
        .subscribe((data) => {
          data.forEach((item) => {
            if (!this.grupos.includes(item.grupo)) {
              this.grupos.push(item.grupo);
            }
          });
          this.cachedData.grupos = this.grupos;
          data.forEach((item) => {
            if (item.estado in this.documentos) {
              const index = this.grupos.indexOf(item.grupo);
              this.documentos[item.estado][index] = item.cantidad;
            } else {
              this.documentos[item.estado] = new Array(this.grupos.length).fill(0);
              const index = this.grupos.indexOf(item.grupo);
              this.documentos[item.estado][index] = item.cantidad;
            }
          });
          this.cachedData.documentos = this.documentos;
          this.cacheService.set('Dashboard', this.cachedData);
          this.spinnerService.hide();
          this.isLoading = false;
        });
      this.getProcesoFirmaADC();
      this.getProcesoVisadoADC();
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

  private getProcesoFirmaADC() {
    this.dashboardService
      .procesoPorFirmaAdc()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe({
        next: (response) => {
          this.procesoFirma = response;
          this.cachedData.procesoFirma = this.procesoFirma;
          this.cacheService.set('Dashboard', this.cachedData);
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

  private getProcesoVisadoADC() {
    this.dashboardService
      .procesoPorVisadoAdc()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe({
        next: (response) => {
          this.procesoVisado = response;
          this.cachedData.procesoVisado = this.procesoVisado;
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
