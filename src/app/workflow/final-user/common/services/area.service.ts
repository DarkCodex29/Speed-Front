import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AreaBD, SedeBD } from '@speed/common/interfaces/area.interface';
import { environment } from '@speed/env/environment';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AreaService {
  public constructor(private http: HttpClient) {}

  public getAreas(params: any) {
    return firstValueFrom(this.http.post<Array<AreaBD>>(`${environment.apiUrl}/area/list`, params));
  }

  public getAreaById(id:number) {
    return firstValueFrom(this.http.get<AreaBD>(`${environment.apiUrl}/area/find/${id}`));
  }

  public getSedes() {
    return firstValueFrom(this.http.get<Array<SedeBD>>(`${environment.apiUrl}/area/sedes`));
  }

  public getDependencias() {
    return firstValueFrom(this.http.get<Array<AreaBD>>(`${environment.apiUrl}/area/dependencias`));
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public registerArea(params: any) {
    return this.http.post<Response>(`${environment.apiUrl}/area/save`, params);
  }
}
