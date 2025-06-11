import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRepBD, UserRepByIdBD } from '@speed/common/interfaces/user-rep.interface';
import { environment } from '@speed/env/environment';
import { firstValueFrom, map } from 'rxjs';

@Injectable()
export class UserRepService {
  public constructor(private http: HttpClient) {}

  public getUsersCompany(params: any) {
    return firstValueFrom(this.http.post<Array<UserRepBD>>(`${environment.apiUrl}/representanteCompania/list`, params));
  }

  public getUserCompanyById(id:number) {
    return firstValueFrom(this.http.get<UserRepByIdBD>(`${environment.apiUrl}/representanteCompania/find/${id}`));
  }

  public getUsuarios() {
    return firstValueFrom(this.http.get<Array<UserRepBD>>(`${environment.apiUrl}/representanteCompania/usuarios`));
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public registerUserCompany(params: any) {
    return this.http.post<Response>(`${environment.apiUrl}/representanteCompania/save`, params);
  }
}
