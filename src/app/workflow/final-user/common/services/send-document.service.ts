import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDestinatario } from '@speed/common/interfaces/output';
import { environment } from '@speed/env/environment';

@Injectable()
export class SendDocumentService {
  public constructor(private http: HttpClient) {}

  public registerDelivery(params: any) {
    return this.http.post(`${environment.apiUrl}/entregaDocumento/registrarEntrega`, params);
  }
}
