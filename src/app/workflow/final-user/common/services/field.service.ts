import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FieldBD,FieldByIdBD, FieldTypeBD} from '@speed/common/interfaces/field.interface';
import { environment } from '@speed/env/environment';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class FieldService {
  public constructor(private http: HttpClient) {}

  public getCampos(params: any) {
    return firstValueFrom(this.http.post<Array<FieldBD>>(`${environment.apiUrl}/campo/list`, params));
  }

  public getTipoCampos() {
    return firstValueFrom(this.http.get<Array<FieldTypeBD>>(`${environment.apiUrl}/campo/fieldType`));
  }

  public getTipoParametros() {
    return firstValueFrom(this.http.get<Array<string>>(`${environment.apiUrl}/campo/parameterType`));
  }

  public getCampoById(id:number) {
    return firstValueFrom(this.http.get<FieldByIdBD>(`${environment.apiUrl}/campo/find/${id}`));
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public registerCampo(params: any) {
    return this.http.post<Response>(`${environment.apiUrl}/campo/save`, params);
  }
}
