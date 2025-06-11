import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GroupBD, GroupByIdBD, ParametroBD, UsuariosBD } from '@speed/common/interfaces/group.interface';
import { environment } from '@speed/env/environment';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GroupService {
  public constructor(private http: HttpClient) {}

  public getGroups(params: any) {
    return firstValueFrom(this.http.post<Array<GroupBD>>(`${environment.apiUrl}/grupo/list`, params));
  }

  public getGroupById(id:number) {
    return firstValueFrom(this.http.get<GroupByIdBD>(`${environment.apiUrl}/grupo/find/${id}`));
  }

  public getTipoGrupos() {
    return firstValueFrom(this.http.get<Array<ParametroBD>>(`${environment.apiUrl}/grupo/tipoGrupos`));
  }

  public getUsuarios() {
    return firstValueFrom(this.http.get<Array<UsuariosBD>>(`${environment.apiUrl}/grupo/usuarios`));
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public registerGroup(params: any) {
    return this.http.post<Response>(`${environment.apiUrl}/grupo/save`, params);
  }
}
