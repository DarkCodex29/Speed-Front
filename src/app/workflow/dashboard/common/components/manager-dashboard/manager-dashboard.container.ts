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

@Component({
  selector: 'app-manager-dashboard',
  templateUrl: 'manager-dashboard.container.html',
  providers: [DashboardService],
})
export class ManagerDashboardContainer implements OnInit, OnDestroy {
  @Input() public dataDashboard?: IDashboardResponse;
  public grupos: Array<string> = [];
  public documentos: any = {};
  public isLoading = true;
  public dataSolicitudesGenerales: Array<ISolicitudesGenerales> = [];
  public dataSolicitudesGeneralesElaborado: Array<ISolicitudesGeneralesElaborado> = [];
  @Input() public urlLegalAlDia?: IParameter;
  public dataSolicitudesAbogadoResponsable: Array<ISolicitudesAbogadosResponsables> = [];
  public dataClientesInternos: Array<IClientesInternos> = [];
  public modeloDocumentos: Array<IModeloDocumento> = [];
  private unsubscribe: Subject<void>;

  public constructor(
    private dashboardService: DashboardService,
    private spinnerService: SpinnerOverlayService,
    private dialogService: DialogService,
  ) {
    this.unsubscribe = new Subject();
  }

  public async ngOnInit() {
    this.recoverData();
  }

  public recoverData() {
    this.spinnerService.show();
    this.getGruposDoc();
    this.getSolicitudes();
    this.getClienteInternos();
    this.getModeloDocumentos();
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
      });
  }

  private getGruposDoc() {
    this.dashboardService
      .solicitudesPorGrupoAdc()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((data) => {
        data.forEach((item) => {
          if (!this.grupos.includes(item.grupo)) {
            this.grupos.push(item.grupo);
          }
        });
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
      });
  }
}
