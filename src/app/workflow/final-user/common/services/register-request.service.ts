import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IParameter, IRepresentanteCompania, IUser } from '@speed/common/interfaces';
import { IDestinatario, ISaveFileOutput } from '@speed/common/interfaces/output';
import { environment } from '@speed/env/environment';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class RegisterRequestService {
  public constructor(private http: HttpClient) {}

  public registerExpediente(params: unknown) {
    return this.http.post<Response>(`${environment.apiUrl}/registrarSolicitud/registrarExpediente`, params);
  }

  public saveExpediente(params: unknown) {
    return this.http.post<ISaveFileOutput>(`${environment.apiUrl}/registrarSolicitud/guardarExpediente`, params);
  }

  public saveDocumentoLegal(params: unknown) {
    return this.http.post<Response>(`${environment.apiUrl}/registrarSolicitud/guardarDocumentoLegal`, params);
  }

  public savePenalidades(params: unknown) {
    return firstValueFrom(this.http.post<Response>(`${environment.apiUrl}/registrarSolicitud/guardarPenalidades`, params));
  }

  public saveAttachedDocuments(params: unknown) {
    return this.http.post<Response>(`${environment.apiUrl}/adjuntarDocumento/guardar`, params);
  }

  public saveManualLegalDocument(params: unknown) {
    return this.http.post<Response>(`${environment.apiUrl}/registrarSolicitud/registrarDocumentoLegalManual`, params);
  }

  public getDestinatarioExpediente(params: any) {
    return firstValueFrom(this.http.get<IDestinatario>(`${environment.apiUrl}/observarSolicitud/destinatario`, { params: params }));
  }

  public registerExploration(params: unknown) {
    return firstValueFrom(this.http.post<any>(`${environment.apiUrl}/registrarSolicitud/guardarExploracion`, params));
  }

  public sendObservartion(params: unknown) {
    return this.http.post<Response>(`${environment.apiUrl}/observarSolicitud`, params);
  }

  public acceptRequest(params: any) {
    return this.http.post<any>(`${environment.apiUrl}/aceptarSolicitud/${params.idExpediente}`, null);
  }

  public sendVisa(params: unknown) {
    return this.http.post<any>(`${environment.apiUrl}/enviarVisado/enviar/`, params);
  }

  public acceptVisa(params: any) {
    return this.http.post<any>(`${environment.apiUrl}/visado/aprobar/${params.idExpediente}`, null);
  }

  public sendToElectronicSignature(params: unknown) {
    return this.http.post<any>(`${environment.apiUrl}/firmaElectronica/enviar/`, params);
  }

  public resendToElectronicSignature(params: unknown) {
    return this.http.post<any>(`${environment.apiUrl}/firmaElectronica/reenviar/`, params);
  }

  public resendElectronicSignatureNotification(params: any) {
    return this.http.post<any>(`${environment.apiUrl}/firmaElectronica/reenviarNotificacion/${params.idExpediente}`, params);
  }

  public deleteElectronicSignature(params: any) {
    return this.http.post<any>(`${environment.apiUrl}/firmaElectronica/eliminar/${params.idExpediente}`, params);
  }

  public sendToSignture(params: any) {
    return this.http.post<any>(`${environment.apiUrl}/enviarFirma/${params.idExpediente}`, null);
  }

  public saveSecurityConfig(params: any) {
    return this.http.post<any>(`${environment.apiUrl}/expedienteSeguridad/guardar/`, params);
  }
  public getRepresentantesCompania() {
    return firstValueFrom(this.http.get<Array<IUser>>(`${environment.apiUrl}/firmaElectronica/representantesCompania`));
  }

  public getTiposIdiomas() {
    return firstValueFrom(this.http.get<Array<IParameter>>(`${environment.apiUrl}/firmaElectronica/getTiposIdiomas`));
  }

  public getTiposFirma() {
    return firstValueFrom(this.http.get<Array<IParameter>>(`${environment.apiUrl}/firmaElectronica/getTiposFirma`));
  }
}
