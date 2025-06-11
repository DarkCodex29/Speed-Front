import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AlarmaContrato,
  DocumentoArea,
  DocumentoPorResponsable,
  ReporteArrendamiento,
  ReporteEstado,
  ReporteExpedienteArea,
  ReporteServicio,
  SeguimientoProcesosReporteBean,
} from '@speed/common/interfaces';
import { environment } from '@speed/env/environment';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ReportService {
  public constructor(private http: HttpClient) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public getReportDocumentByArea(param: any) {
    return firstValueFrom(this.http.get<Array<DocumentoArea>>(`${environment.apiUrl}/reporte/documentosArea`, { params: param }));
  }

  public getReporteDocumentoLegalPorAbogadoResponsable(param: any) {
    return firstValueFrom(
      this.http.get<Array<DocumentoPorResponsable>>(`${environment.apiUrl}/reporte/buscarDocumentosLegalesPorAbogadoResponsable`, {
        params: param,
      }),
    );
  }

  public getReporteAlarmaContratos(param: any) {
    return firstValueFrom(this.http.get<Array<AlarmaContrato>>(`${environment.apiUrl}/reporte/buscarAlarmaContratos`, { params: param }));
  }

  public getReporteEstadosR4(param: any) {
    return firstValueFrom(this.http.get<Array<ReporteEstado>>(`${environment.apiUrl}/reporte/filtrarReporteR4`, { params: param }));
  }

  public getReporteExpedienteArea(param: any) {
    return firstValueFrom(this.http.get<Array<ReporteExpedienteArea>>(`${environment.apiUrl}/reporte/expedientesArea`, { params: param }));
  }

  public getReporteServicios(param: any) {
    return firstValueFrom(this.http.get<Array<ReporteServicio>>(`${environment.apiUrl}/reporte/reporteServicio`, { params: param }));
  }

  public getReporteArrendamiento(param: any) {
    return firstValueFrom(
      this.http.get<Array<ReporteArrendamiento>>(`${environment.apiUrl}/reporte/reporteArrendamiento`, { params: param }),
    );
  }

  public getReporteSeguimientoProcesos(param: any) {
    return firstValueFrom(
      this.http.post<Array<SeguimientoProcesosReporteBean>>(`${environment.apiUrl}/reporte/reporteSeguimientoProcesos`, param),
    );
  }
}
