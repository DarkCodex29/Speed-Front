import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FilaSeguimientoSolicitudDTS, HcTipoContrato, IParamsSearchDocument, IResponseFile, IState } from '@speed/common/interfaces';
import { IDocumentoOutput, IDocumentoSearchDashOutput, IResponseModel } from '@speed/common/interfaces/output';
import { environment } from '@speed/env/environment';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class DocumentService {
  public constructor(private http: HttpClient) {}

  public findDocuments(params: any) {
    return firstValueFrom(this.http.post<IDocumentoOutput[]>(`${environment.apiUrl}/buscarDocumentosHC/buscar`, params));
  }

  public findDocumentsDashboard(params: any) {
    return firstValueFrom(this.http.post<IDocumentoSearchDashOutput[]>(`${environment.apiUrl}/buscarDocumentosHC/buscarDashboard`, params));
  }

  public findDocumentsForExcel(params: any) {
    return firstValueFrom(this.http.post<IDocumentoOutput[]>(`${environment.apiUrl}/buscarDocumentosHC/buscarExcel`, params));
  }
  public getTrackindDocuments(params: any) {
    return firstValueFrom(this.http.post<FilaSeguimientoSolicitudDTS[]>(`${environment.apiUrl}/seguimientoSolicitud/buscar`, params));
  }
  public validateTipoComponent(idExpediente: number) {
    // PENDIENTE CAMBIAR TIPADO
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return firstValueFrom(this.http.get<any>(`${environment.apiUrl}/revisarExpediente/validateComponent/${idExpediente}`));
  }
  public getEstadosDocument() {
    return firstValueFrom(this.http.get<IState[]>(`${environment.apiUrl}/seguimientoSolicitud/obtenerEstados`));
  }

  public guardarSolicitudes(data: { listadoSolicitudes: Array<FilaSeguimientoSolicitudDTS> }) {
    return this.http.post<IResponseModel>(`${environment.apiUrl}/seguimientoSolicitud/guardarSolicitudes`, data);
  }

  public getDocumento(params: any) {
    // PENDIENTE CAMBIAR TIPADO
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return firstValueFrom(this.http.get<any>(`${environment.apiUrl}/revisarDocumento/obtenerDocumento/${params}`));
  }
  public saveDraft(params: any) {
    // PENDIENTE CAMBIAR TIPADO
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this.http.post<any>(`${environment.apiUrl}/elaborarDocumento/guardarBorrador`, params);
  }
  public getInfoDocument(params: any) {
    // PENDIENTE CAMBIAR TIPADO
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this.http.get<any>(`${environment.apiUrl}/elaborarDocumento/abrirDialog`, { params: params });
  }

  public getUsersActives(params: any) {
    // PENDIENTE CAMBIAR TIPADO
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this.http.get<any[]>(`${environment.apiUrl}/elaborarDocumento/buscarUsuariosActivosBy`, { params: params });
  }
  // public exportarExcel() {
  //   return firstValueFrom(this.http.get<void>(`${environment.apiURL}/buscarDocumentosHC/exportarExcel`));
  // }
  public uploadFile(formData: FormData) {
    return this.http.post<IResponseFile>(`${environment.apiUrl}/elaborarDocumento/uploadFiles`, formData);
  }

  public downloadPlatillaDocument(params: any) {
    return this.http.get(`${environment.apiUrl}/generarPlantilla/plantilla`, { responseType: 'blob', params: params, observe: 'response' });
  }

  public downloadFile(idArchivo: number,idExpediente:number, nombreUsuario:string) {
    return this.http.get(`${environment.apiUrl}/descargarArchivo/${idExpediente}/${idArchivo}/`, { responseType: 'blob', observe: 'response' });
  }

  public downloadFileUser(idArchivo: number,idExpediente:number, idUsuario:string) {
    return this.http.get(`${environment.apiUrl}/descargarArchivo/usuario/${idExpediente}/${idArchivo}/${idUsuario}`, { responseType: 'blob', observe: 'response' });
  }

  public downloadFileUserURL(idArchivo: number,idExpediente:number, idUsuario:string) {
    return `${environment.apiUrl}/descargarArchivo/usuario/${idExpediente}/${idArchivo}/${idUsuario}`;
  }

  public validarPlantilla(params: any) {
    return this.http.get<any>(`${environment.apiUrl}/generarPlantilla/validar`, { params: params });
  }

  public findTipoContratos() {
    return firstValueFrom(this.http.get<Array<HcTipoContrato>>(`${environment.apiUrl}/generarPlantilla/findLstHcTipoContratoCodigoAdenda`));
  }

  public exportarExcel(params: IParamsSearchDocument) {
    return this.http.get<void>(`${environment.apiUrl}/buscarDocumentosHC/exportarExcel
    ?num=${params.num}
    &sum=${params.sum}
    &fFI=${params.fFI}
    &fFF=${params.fFF}
    &fVI=${params.fVI}
    &fVF=${params.fVF}
    &idP=${params.idP}
    &idC=${params.idC}
    &idA=${params.idA}
    &tUb=${params.tUb}
    &idU=${params.idU}
    &tAr=${params.tAr}
    &idS=${params.idS}
    &idRe=${params.idRe}
    &idCo=${params.idCo}
    &idRp=${params.idRp}
    &mD=${params.mD}
    &mH=${params.mH}
    &idTC=${params.idTC}
    &est=${params.est}`);
  }

  // public exportarExcel(params: IParamsSearchDocument) {
  //   return this.http.get<void>(`${environment.apiURL}/buscarDocumentosHC/exportarExcel`, { params: params});
  // }
}
