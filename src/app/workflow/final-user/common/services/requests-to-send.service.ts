import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@speed/env/environment';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class RequestsToSendService {
  public constructor(private http: HttpClient) {}

  public obtenerDetalleContrato(idExpediente: number) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return firstValueFrom(this.http.get<any>(`${environment.apiUrl}/revisarSolicitudEnviada/${idExpediente}`));
  }

  public obtenerDetalle(idProceso: number, idExpediente: number) {
    return firstValueFrom(
      this.http.get<any>(
        `${environment.apiUrl}/revisarSolicitudEnviada/detalleContratoAdenda?idProceso=${idProceso}&idExpediente=${idExpediente}`,
      ),
    );
  }
}
