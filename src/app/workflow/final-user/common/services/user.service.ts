import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserBD, UsuarioBeanBD, AreaBD, RolesBD, PerfilesBD, JefeBD } from '@speed/common/interfaces/user.interface';
import { environment } from '@speed/env/environment';
import { firstValueFrom, map } from 'rxjs';

@Injectable()
export class UserService {
  public constructor(private http: HttpClient) {}

  public getUsers(params: any) {
    return firstValueFrom(this.http.post<Array<UsuarioBeanBD>>(`${environment.apiUrl}/usuario/list`, params));
  }

  public getJefes() {
    return firstValueFrom(this.http.get<Array<JefeBD>>(`${environment.apiUrl}/usuario/jefes`));
  }

  public getUserById(id: number) {
    return firstValueFrom(this.http.get<UserBD>(`${environment.apiUrl}/usuario/find/${id}`));
  }

  public getAreas() {
    return firstValueFrom(this.http.get<Array<AreaBD>>(`${environment.apiUrl}/usuario/areas`));
  }

  public getRoles() {
    return firstValueFrom(this.http.get<Array<RolesBD>>(`${environment.apiUrl}/usuario/roles`));
  }

  public getRolesDisponibles(id: number) {
    return firstValueFrom(this.http.get<Array<RolesBD>>(`${environment.apiUrl}/usuario/rolesDisponibles/${id}`));
  }

  public getPerfiles() {
    return firstValueFrom(this.http.get<Array<PerfilesBD>>(`${environment.apiUrl}/usuario/perfiles`));
  }

  public getPerfilesDisponibles(id: number) {
    return firstValueFrom(this.http.get<Array<PerfilesBD>>(`${environment.apiUrl}/usuario/perfilesDisponibles/${id}`));
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public registerUser(params: any) {
    return this.http.post<Response>(`${environment.apiUrl}/usuario/save`, params);
  }
}
