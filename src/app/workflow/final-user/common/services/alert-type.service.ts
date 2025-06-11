import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertTypeBD } from '@speed/common/interfaces/alert.interface';
import { environment } from '@speed/env/environment';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AlertTypeService {
  public constructor(private http: HttpClient) {}

  public getTipoAlertas(params: any) {
    return firstValueFrom(this.http.post<Array<AlertTypeBD>>(`${environment.apiUrl}/tipoAlerta/list`, params));
  }

  public getTipoAlertaById(id:number) {
    return firstValueFrom(this.http.get<AlertTypeBD>(`${environment.apiUrl}/tipoAlerta/find/${id}`));
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public registerTipoAlerta(params: any) {
    return this.http.post<Response>(`${environment.apiUrl}/tipoAlerta/save`, params);
  }
}
