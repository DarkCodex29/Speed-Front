import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@speed/env/environment';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SearchDocumentService {
  public constructor(private http: HttpClient) {}

  public obtenerDetalleContrato(idExpediente: number) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return firstValueFrom(this.http.get<any>(`${environment.apiUrl}/revisarBuscarDocumento/${idExpediente}`));
  }
}
