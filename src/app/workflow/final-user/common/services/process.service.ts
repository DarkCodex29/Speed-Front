import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ParametroBD, RolesBD } from '@speed/common/interfaces';
import { DocumentTypeBD } from '@speed/common/interfaces/document-type.interface';
import { ProcessBD, TipoProcesoBD, UsuarioParticipanteBD } from '@speed/common/interfaces/process.interface';
import { environment } from '@speed/env/environment';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ProcessService {
  public constructor(private http: HttpClient) {}

  public getProcesos(params: any) {
    return firstValueFrom(this.http.post<Array<ProcessBD>>(`${environment.apiUrl}/proceso/list`, params));
  }

  public getProcesoById(id: number) {
    return firstValueFrom(this.http.get<ProcessBD>(`${environment.apiUrl}/proceso/find/${id}`));
  }

  public getTipoProcesos() {
    return firstValueFrom(this.http.get<Array<TipoProcesoBD>>(`${environment.apiUrl}/proceso/tipoProcesos`));
  }

  public getConfidencialidad() {
    return firstValueFrom(this.http.get<Array<ParametroBD>>(`${environment.apiUrl}/proceso/confidencialidad`));
  }

  public getUsuariosParticipante() {
    return firstValueFrom(this.http.get<Array<UsuarioParticipanteBD>>(`${environment.apiUrl}/proceso/usuariosParticipante`));
  }

  public getUsuariosParticipanteDisponibles(id: number) {
    return firstValueFrom(
      this.http.get<Array<UsuarioParticipanteBD>>(`${environment.apiUrl}/proceso/usuariosParticipanteDisponibles/${id}`),
    );
  }

  public getRolesParticipante() {
    return firstValueFrom(this.http.get<Array<RolesBD>>(`${environment.apiUrl}/proceso/rolesParticipante`));
  }

  public getRolesParticipanteDisponibles(id: number) {
    return firstValueFrom(this.http.get<Array<RolesBD>>(`${environment.apiUrl}/proceso/rolesParticipanteDisponibles/${id}`));
  }

  public getRolesProceso() {
    return firstValueFrom(this.http.get<Array<RolesBD>>(`${environment.apiUrl}/proceso/rolesProceso`));
  }

  public getRolesProcesoDisponibles(id: number) {
    return firstValueFrom(this.http.get<Array<RolesBD>>(`${environment.apiUrl}/proceso/rolesProcesoDisponibles/${id}`));
  }

  public getTipoDocumentos() {
    return firstValueFrom(this.http.get<Array<DocumentTypeBD>>(`${environment.apiUrl}/proceso/tiposDocumento`));
  }

  public getTipoDocumentosDisponibles(id: number) {
    return firstValueFrom(this.http.get<Array<DocumentTypeBD>>(`${environment.apiUrl}/proceso/tiposDocumentoDisponible/${id}`));
  }

  public registerProceso(params: any) {
    return this.http.post<Response>(`${environment.apiUrl}/proceso/save`, params);
  }
}
