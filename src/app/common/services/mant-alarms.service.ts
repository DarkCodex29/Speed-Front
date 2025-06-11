import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@speed/env/environment';
import { IAlarmsInboxOutput, IResponseModel } from '../interfaces/output';
import { IAlarmModel } from '../interfaces/forms';

@Injectable()
export class MantAlarmsService {
  public constructor(private http: HttpClient) {}

  public getAlarmas(idExpediente: number) {
    return this.http.get<IAlarmsInboxOutput>(`${environment.apiUrl}/mantenimientoAlarma/bandejaAlarma/${idExpediente}`);
  }

  public saveAlarma(body: IAlarmModel) {
    return this.http.post<IResponseModel>(`${environment.apiUrl}/mantenimientoAlarma/guardar`, body);
  }
}
