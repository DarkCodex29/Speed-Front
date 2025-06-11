import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@speed/env/environment';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ReopenExpedientService {
  public constructor(private http: HttpClient) {}

  public getAbogadosResponsables() {
    return firstValueFrom(this.http.get<any[]>(`${environment.apiUrl}/reabrirExpediente/abogadosResponsables`));
  }

  public reabrir(params: unknown) {
    return this.http.post<any>(`${environment.apiUrl}/reabrirExpediente/reabrir`, params);
  }
}
