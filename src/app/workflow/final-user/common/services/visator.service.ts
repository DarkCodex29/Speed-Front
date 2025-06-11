import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDestinatario } from '@speed/common/interfaces/output';
import { environment } from '@speed/env/environment';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class VisatorService {
  public constructor(private http: HttpClient) {}

  public getVisadores(idExpediente: number) {
    return this.http.get<any[]>(`${environment.apiUrl}/visado/verVisadores/${idExpediente}`);
  }

  public getDestinatario(idExpediente: number) {
    return firstValueFrom(this.http.get<IDestinatario>(`${environment.apiUrl}/visado/destinatario/${idExpediente}`));
  }

  public observarVisado(params: any) {
    return this.http.post(`${environment.apiUrl}/visado/observarVisado`, params);
  }

  public verCancelarVisado(params: any) {
    return firstValueFrom(this.http.get(`${environment.apiUrl}/cancelarVisado/verCancelarVisado/${params}`));
  }

  public cancelarVisado(params: any) {
    return this.http.put(`${environment.apiUrl}/cancelarVisado/cancelar`, params);
  }
}
