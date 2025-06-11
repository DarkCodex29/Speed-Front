import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RolBD } from '@speed/common/interfaces/role.interface';
import { environment } from '@speed/env/environment';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class RoleService {
  public constructor(private http: HttpClient) {}

  public getRoles(params: any) {
    return firstValueFrom(this.http.post<Array<RolBD>>(`${environment.apiUrl}/rol/list`, params));
  }

  public getRolById(id:number) {
    return firstValueFrom(this.http.get<RolBD>(`${environment.apiUrl}/rol/find/${id}`));
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public registerRol(params: any) {
    return this.http.post<Response>(`${environment.apiUrl}/rol/save`, params);
  }
}
