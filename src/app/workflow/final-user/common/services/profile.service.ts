import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProfileBD } from '@speed/common/interfaces/profile.interface';
import { environment } from '@speed/env/environment';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ProfileService {
  public constructor(private http: HttpClient) {}

  public getPerfiles(params: any) {
    return firstValueFrom(this.http.post<Array<ProfileBD>>(`${environment.apiUrl}/perfil/list`, params));
  }

  public getPerfilById(id:number) {
    return firstValueFrom(this.http.get<ProfileBD>(`${environment.apiUrl}/perfil/find/${id}`));
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public registerPerfil(params: any) {
    return this.http.post<Response>(`${environment.apiUrl}/perfil/save`, params);
  }
}
