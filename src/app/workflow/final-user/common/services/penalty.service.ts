import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PenalidadBD, ReiteranciaBD, TipoValorBD } from '@speed/common/interfaces/penalty.interface';
import { environment } from '@speed/env/environment';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PenaltyService {
  public constructor(private http: HttpClient) {}

  public getPenalidades(params: any) {
    return firstValueFrom(this.http.post<Array<PenalidadBD>>(`${environment.apiUrl}/penalidad/list`, params));
  }

  public getPenalidadById(id:number) {
    return firstValueFrom(this.http.get<PenalidadBD>(`${environment.apiUrl}/penalidad/find/${id}`));
  }

  public getReiterancias() {
    return firstValueFrom(this.http.get<Array<ReiteranciaBD>>(`${environment.apiUrl}/penalidad/reiterancias`));
  }

  public getTipoValores() {
    return firstValueFrom(this.http.get<Array<TipoValorBD>>(`${environment.apiUrl}/penalidad/tipoValores`));
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public registerPenalidad(params: any) {
    return this.http.post<Response>(`${environment.apiUrl}/penalidad/save`, params);
  }
}
