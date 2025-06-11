import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AreaBD } from '@speed/common/interfaces';
import { DocumentTypeBD } from '@speed/common/interfaces/document-type.interface';
import { NumerationBD } from '@speed/common/interfaces/numeration.interface';
import { environment } from '@speed/env/environment';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class NumerationService {
  public constructor(private http: HttpClient) {}

  public getNumeraciones(params: any) {
    return firstValueFrom(this.http.post<Array<NumerationBD>>(`${environment.apiUrl}/numeracion/list`, params));
  }

  public getAreas() {
    return firstValueFrom(this.http.get<Array<AreaBD>>(`${environment.apiUrl}/numeracion/areas`));
  }

  public getTipoDocumentos() {
    return firstValueFrom(this.http.get<Array<DocumentTypeBD>>(`${environment.apiUrl}/numeracion/tipoDocumentos`));
  }

  public getNumeracionById(id: number) {
    return firstValueFrom(this.http.get<NumerationBD>(`${environment.apiUrl}/numeracion/find/${id}`));
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public registerNumeracion(params: any) {
    return this.http.post<Response>(`${environment.apiUrl}/numeracion/save`, params);
  }
}
