import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@speed/env/environment';
import { IInterested, IResponseModel } from '../interfaces/output';
import { ICommunicateStakeholdersForm } from '../interfaces/forms';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CommunicateInterestedService {
  public constructor(private http: HttpClient) {}

  public buscarInteresados(termino: string) {
    return this.http.post<any[]>(`${environment.apiUrl}/comunicarInteresados/buscarInteresados`, { termino });
  }

  public buscarInteresadosSeguridad(termino: string) {
    return this.http.post<any[]>(`${environment.apiUrl}/comunicarInteresados/buscarInteresadosSeguridad`, { termino });
  }

  public buscarInteresadosVisadores(termino: string) {
    return this.http.post<any[]>(`${environment.apiUrl}/enviarVisado/buscarVisadores`, { termino });
  }
  public getInteresadosModal(idExpediente: number) {
    return firstValueFrom(this.http.get<any[]>(`${environment.apiUrl}/comunicarInteresados/comunicarInteresadosModal/${idExpediente}`));
  }

  public enviarComunicaciones(params: ICommunicateStakeholdersForm) {
    return this.http.post<IResponseModel>(`${environment.apiUrl}/comunicarInteresados/enviarComunicaciones`, params);
  }
}
