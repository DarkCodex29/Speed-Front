import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlantillaBD,TipoContratoBD } from '@speed/common/interfaces/template.interface';
import { environment } from '@speed/env/environment';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class TemplateService {
  public constructor(private http: HttpClient) {}

  public getPlantillas(params: any) {
    return firstValueFrom(this.http.post<Array<PlantillaBD>>(`${environment.apiUrl}/plantilla/list`, params));
  }

  public getTipoContratos() {
    return firstValueFrom(this.http.get<Array<TipoContratoBD>>(`${environment.apiUrl}/plantilla/tipoContratos`));
  }

  public getPlantillaById(id:number) {
    return firstValueFrom(this.http.get<PlantillaBD>(`${environment.apiUrl}/plantilla/find/${id}`));
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public registerPlantilla(params: any) {
    return this.http.post<Response>(`${environment.apiUrl}/plantilla/save`, params);
  }
}
