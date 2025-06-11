import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@speed/env/environment';
import { LoginResponse, SubOpciones } from '../interfaces';
import { WorkflowTabCacheService } from 'src/app/workflow/workflow-tab-cache-service';

@Injectable({ providedIn: 'root' })
export class LoginService {
  public constructor(private http: HttpClient, private cacheService: WorkflowTabCacheService) { }

  public login(params: any) {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/auth`, params);
  }

  public loginExternal(params: any) {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/auth/external`, params);
  }

  public saveUser(params: LoginResponse) {
    localStorage.setItem('token', params.token!);
    localStorage.setItem('userInfo', JSON.stringify(params));
  }

  public getUserInfo(): LoginResponse {
    return JSON.parse(localStorage.getItem('userInfo')!);
  }

  public get listaOpciones() {
    const list = JSON.parse(localStorage.getItem('userInfo') || '') as LoginResponse;
    if (list.listaOpciones) {
      return list.listaOpciones.map((item) => ({ ...item, expanded: false }));
    }
    return [];
  }

  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    this.cacheService.clearAll();
  }

  public isLoggedIn() {
    const token = localStorage.getItem('token'); // get token from local storage
    //const payload = atob(token!.split('.')[1]); // decode payload of token
    //const parsedPayload = JSON.parse(payload); // convert payload into an Object

    return token != null; // check if token is expired
  }

  public hasPermission(permission: string) {
    const user: LoginResponse = JSON.parse(localStorage.getItem('userInfo')!);
    //const permissions: SubOpciones[] = user.listaOpciones!.flatMap((opcion) => opcion.subOpciones!.flatMap((opcion) => opcion.subOpciones!));
    const permissions: SubOpciones[] = this.loopValues(user.listaOpciones ?? []);
    const index = permissions.findIndex((x) => x.linkOpcion == permission);
    if (index == -1 && !permission.startsWith('final-user/contract-detail-external/')) {
      return false;
    }
    return true;
  }

  public loopValues(val: SubOpciones[]) {
    let q: SubOpciones[] = [];
    val.forEach(elm => {
      if (elm == null) {
        return;
      }

      const { subOpciones, ...rest } = elm;
      q = [...q, rest, ...this.loopValues(subOpciones ?? [])];
    });
    return q;
  }
}
