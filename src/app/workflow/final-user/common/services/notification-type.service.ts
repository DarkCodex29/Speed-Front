import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotificationTypeBD } from '@speed/common/interfaces/notification-type.interface';
import { environment } from '@speed/env/environment';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class NotificationTypeService {
  public constructor(private http: HttpClient) {}

  public getTipoNotificaciones(params: any) {
    return firstValueFrom(this.http.post<Array<NotificationTypeBD>>(`${environment.apiUrl}/tipoNotificacion/list`, params));
  }

  public getTipoNotificacionById(id: number) {
    return firstValueFrom(this.http.get<NotificationTypeBD>(`${environment.apiUrl}/tipoNotificacion/find/${id}`));
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public registerTipoNotificacion(params: any) {
    return this.http.post<Response>(`${environment.apiUrl}/tipoNotificacion/save`, params);
  }
}
