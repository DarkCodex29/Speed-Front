import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContratoDTS, IResponseFile } from '@speed/common/interfaces';
import { environment } from '@speed/env/environment';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class DocumentService {
  public constructor(private http: HttpClient) {}

  public findDocuments(params: any) {
    return firstValueFrom(this.http.post<ContratoDTS[]>(`${environment.apiUrl}/buscarDocumentosHC/buscar`, params));
  }
}
