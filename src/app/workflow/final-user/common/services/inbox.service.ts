import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@speed/env/environment';
import { IContractBean, ISearchInbox, ISearchResponseInbox } from '../../views/inbox/common/interfaces';
import { IResponseContractData, ITabModel } from '@speed/common/interfaces';
import { Observable, firstValueFrom } from 'rxjs';
import { ISearchResponsePending } from '../../views/pending/common/interfaces';
import { ISearchResponseRequestsToSend } from '../../views/requests-to-send/common/interfaces';

@Injectable()
export class InboxService {
  public constructor(private http: HttpClient) {}

  public obtenerBandejaEntrada(params: ISearchInbox): Observable<ISearchResponseInbox[]> {
    return this.http.post<ISearchResponseInbox[]>(`${environment.apiUrl}/bandeja/bandejaEntrada`, params);
  }

  public obtenerMisPendientes(params: ISearchInbox): Observable<ISearchResponsePending[]> {
    return this.http.post<ISearchResponsePending[]>(`${environment.apiUrl}/bandeja/misPendientes`, params);
  }

  public obtenerMisSolicitudes(params: ISearchInbox): Observable<ISearchResponseInbox[]> {
    return this.http.post<ISearchResponseInbox[]>(`${environment.apiUrl}/bandeja/misSolicitudes`, params);
  }

  public obtenerSolicitudesPorEnviar(params: ISearchInbox): Observable<ISearchResponseRequestsToSend[]> {
    return this.http.post<ISearchResponseRequestsToSend[]>(`${environment.apiUrl}/bandeja/solicitudesPorEnviar`, params);
  }

  public obtenerbotonDatosContrato(params: IContractBean) {
    return firstValueFrom(
      this.http.get<IResponseContractData>(
        `${environment.apiUrl}/datosContrato/botonDatosContrato?idExpediente=${params.idExpediente}&idTraza=${params.idTraza}`,
      ),
    );
  }

  public obtenerDetalleExpediente(idExpediente: number) {
    // PENDIENTE CAMBIAR TIPADO
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return firstValueFrom(this.http.get<any>(`${environment.apiUrl}/revisarExpediente/detalleExpediente/${idExpediente}`));
  }

  public obtenerDetalleContrato(idTraza: number) {
    // PENDIENTE CAMBIAR TIPADO
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return firstValueFrom(this.http.get<any>(`${environment.apiUrl}/revisarExpediente/revisarTraza/${idTraza}`));
  }

  public obtenerTrazaAdendaContrato(idExpediente: number) {
    // PENDIENTE CAMBIAR TIPADO
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return firstValueFrom(this.http.get<ITabModel>(`${environment.apiUrl}/revisarDocumentoLegal/obtenerContratoAdenda/${idExpediente}`));
  }

  public obtenerDatosBasicosExpediente(idTraza: any) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return firstValueFrom(this.http.get<ITabModel>(`${environment.apiUrl}/revisarExpediente/obtenerDatosBasicosExpediente/${idTraza}`));
  }

  public validarArchivoPdfParaEnviarVisado(params: any) {
    return this.http.get<any>(`${environment.apiUrl}/enviarVisado/validarArchivoPdf/${params.idExpediente}`);
  }
}
