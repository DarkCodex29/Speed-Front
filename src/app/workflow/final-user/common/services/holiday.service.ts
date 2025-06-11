import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HolidayBD } from '@speed/common/interfaces/holiday.interface';
import { environment } from '@speed/env/environment';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class HolidayService {
  public constructor(private http: HttpClient) {}

  public getFeriados(params: any) {
    return firstValueFrom(this.http.post<Array<HolidayBD>>(`${environment.apiUrl}/feriado/list`, params));
  }

  public getFeriadoById(id: number) {
    return firstValueFrom(this.http.get<HolidayBD>(`${environment.apiUrl}/feriado/find/${id}`));
  }

  public registerFeriado(params: any) {
    return this.http.post<Response>(`${environment.apiUrl}/feriado/save`, params);
  }
}
