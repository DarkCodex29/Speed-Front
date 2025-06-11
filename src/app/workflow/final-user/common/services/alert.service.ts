import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertBD, AlertTypeBD, GridBD } from '@speed/common/interfaces/alert.interface';
import { environment } from '@speed/env/environment';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AlertService {
  public constructor(private http: HttpClient) {}

  public getAlertas(params: any) {
    return firstValueFrom(this.http.post<Array<AlertBD>>(`${environment.apiUrl}/alerta/list`, params));
  }

  public getAlertaById(id:number) {
    return firstValueFrom(this.http.get<AlertBD>(`${environment.apiUrl}/alerta/find/${id}`));
  }

  public getGrids() {
    return firstValueFrom(this.http.get<Array<GridBD>>(`${environment.apiUrl}/alerta/grids`));
  }

  public getTipoAlertas() {
    return firstValueFrom(this.http.get<Array<AlertTypeBD>>(`${environment.apiUrl}/alerta/tipoAlertas`));
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public registerAlerta(params: any) {
    return this.http.post<Response>(`${environment.apiUrl}/alerta/save`, params);
  }
}
