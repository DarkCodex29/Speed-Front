import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@speed/env/environment';

@Injectable()
export class ArchiveFileService {
  public constructor(private http: HttpClient) {}

  public archivar(params: unknown) {
    return this.http.post<number>(`${environment.apiUrl}/archivarExpediente/archivar`, params);
  }
}
