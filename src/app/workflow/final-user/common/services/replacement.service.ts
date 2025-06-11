import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProcessBD } from '@speed/common/interfaces/process.interface';
import { ReplacementBD, UserReemplazoBD } from '@speed/common/interfaces/replacement.interface';
import { environment } from '@speed/env/environment';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ReplacementService {
  public constructor(private http: HttpClient) {}

  public getReemplazos(params: any) {
    return firstValueFrom(this.http.post<Array<ReplacementBD>>(`${environment.apiUrl}/reemplazo/list`, params));
  }

  public getReemplazoById(id: number) {
    return firstValueFrom(this.http.get<ReplacementBD>(`${environment.apiUrl}/reemplazo/find/${id}`));
  }

  public getReemplazados() {
    return firstValueFrom(this.http.get<Array<UserReemplazoBD>>(`${environment.apiUrl}/reemplazo/reemplazados`));
  }

  public getProcesos() {
    return firstValueFrom(this.http.get<Array<ProcessBD>>(`${environment.apiUrl}/reemplazo/procesos`));
  }

  public getProcesosDisponibles(id: number) {
    return firstValueFrom(this.http.get<Array<ProcessBD>>(`${environment.apiUrl}/reemplazo/procesosDisponibles/${id}`));
  }

  public getReemplazantes(id: number) {
    return firstValueFrom(this.http.get<Array<UserReemplazoBD>>(`${environment.apiUrl}/reemplazo/reemplazantes/${id}`));
  }

  public registerReemplazo(params: any) {
    return this.http.post<Response>(`${environment.apiUrl}/reemplazo/save`, params);
  }
}
