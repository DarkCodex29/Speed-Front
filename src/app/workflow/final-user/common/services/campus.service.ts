import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SedeBD, UbigeoBD} from '@speed/common/interfaces/campus.interface';
import { environment } from '@speed/env/environment';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CampusService {
  public constructor(private http: HttpClient) {}

  public getSedes(params: any) {
    return firstValueFrom(this.http.post<Array<SedeBD>>(`${environment.apiUrl}/sede/list`, params));
  }

  public getDepartamentos() {
    return firstValueFrom(this.http.get<Array<UbigeoBD>>(`${environment.apiUrl}/sede/departamentos`));
  }

  public getProvincias(id:number) {
    return firstValueFrom(this.http.get<Array<UbigeoBD>>(`${environment.apiUrl}/sede/provincias/${id}`));
  }

  public getDistritos(id:number) {
    return firstValueFrom(this.http.get<Array<UbigeoBD>>(`${environment.apiUrl}/sede/distritos/${id}`));
  }

  public getSedeById(id:number) {
    return firstValueFrom(this.http.get<SedeBD>(`${environment.apiUrl}/sede/find/${id}`));
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public registerSede(params: any) {
    return this.http.post<Response>(`${environment.apiUrl}/sede/save`, params);
  }
}
