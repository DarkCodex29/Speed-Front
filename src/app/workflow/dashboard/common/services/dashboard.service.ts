import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@speed/env/environment';
import {
  IClientesInternos,
  IDocumentADC,
  IModeloDocumento,
  IProcesoFirmaADC,
  IProcesoVisadoADC,
  ISolicitudesAbogados,
  ISolicitudesAbogadosResponsables,
  ISolicitudesArea,
  ISolicitudesGenerales,
  ISolicitudesGeneralesElaborado,
  ISolicitudesVigentes,
} from '../interfaces';
import { firstValueFrom } from 'rxjs';
import { IDashboardResponse, IParameter, ParametroBD } from '@speed/common/interfaces';

@Injectable()
export class DashboardService {
  public constructor(private http: HttpClient) {}

  public validarAcceso() {
    return this.http.get<IDashboardResponse>(`${environment.apiUrl}/dashboard/validarAcceso`);
  }

  public solicitudesGenerales(tipo: number) {
    return firstValueFrom(this.http.get<Array<ISolicitudesGenerales>>(`${environment.apiUrl}/dashboard/solicitudesGenerales?tipo=${tipo}`));
  }

  public solicitudesGeneralesElaborado(tipo: number) {
    return firstValueFrom(
      this.http.get<Array<ISolicitudesGeneralesElaborado>>(`${environment.apiUrl}/dashboard/solicitudesGeneralesElaborado?tipo=${tipo}`),
    );
  }

  public solicitudesPorAbogadoResponsable(tipo: number) {
    return firstValueFrom(
      this.http.get<Array<ISolicitudesAbogadosResponsables>>(
        `${environment.apiUrl}/dashboard/solicitudesPorAbogadoResponsable?tipo=${tipo}`,
      ),
    );
  }

  public clientesInternos(tipo: number) {
    return this.http.get<Array<IClientesInternos>>(`${environment.apiUrl}/dashboard/clientesInternos?tipo=${tipo}`);
  }

  public solicitudesPorGrupoAdc() {
    return this.http.get<Array<IDocumentADC>>(`${environment.apiUrl}/dashboard/solicitudesPorGrupoAdc`);
  }

  public procesoPorFirmaAdc() {
    return this.http.get<Array<IProcesoFirmaADC>>(`${environment.apiUrl}/dashboard/procesoPorFirmaAdc`);
  }

  public procesoPorVisadoAdc() {
    return this.http.get<Array<IProcesoVisadoADC>>(`${environment.apiUrl}/dashboard/procesoPorVisadoAdc`);
  }

  public solicitudesGeneralesArea() {
    return firstValueFrom(this.http.get<Array<ISolicitudesGenerales>>(`${environment.apiUrl}/dashboard/solicitudesGeneralesArea`));
  }

  public solicitudesPorAbogadoArea() {
    return firstValueFrom(this.http.get<Array<ISolicitudesAbogados>>(`${environment.apiUrl}/dashboard/solicitudesPorAbogadoArea`));
  }

  public solicitudesVigentesArea() {
    return firstValueFrom(this.http.get<Array<ISolicitudesVigentes>>(`${environment.apiUrl}/dashboard/solicitudesVigentesArea`));
  }

  public solicitudesArea() {
    return firstValueFrom(this.http.get<Array<ISolicitudesArea>>(`${environment.apiUrl}/dashboard/solicitudesArea`));
  }

  public modeloDocumentos() {
    return this.http.get<Array<IModeloDocumento>>(`${environment.apiUrl}/dashboard/modeloDocumentos`);
  }
  public getUrlLegalAlDia() {
    return firstValueFrom(this.http.get<IParameter>(`${environment.apiUrl}/parametro/urlLegalAlDia`));
  }
  public downloadDocument(ruta: string) {
    return this.http.post(
      `${environment.apiUrl}/descargarArchivo/plantilla`,
      {
        ruta,
      },
      { responseType: 'blob', observe: 'response' },
    );
  }
}
