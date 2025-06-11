import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@speed/env/environment';
@Injectable()
export class SendRequestService {
  public constructor(private http: HttpClient) {}

  public enviarSolicituid(idExpediente: number) {
    return this.http.post<any>(`${environment.apiUrl}/enviarSolicitud/${idExpediente}`, null);
  }
}
