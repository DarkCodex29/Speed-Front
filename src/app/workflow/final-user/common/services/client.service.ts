import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICounterPartBD, ICounterPartTypeBD, IValidationClient } from '@speed/common/interfaces';
import { environment } from '@speed/env/environment';
import { first, firstValueFrom } from 'rxjs';

@Injectable()
export class ClientService {
  public constructor(private http: HttpClient) {}
  public getClientes(params: any) {
    return firstValueFrom(this.http.post<Array<ICounterPartBD>>(`${environment.apiUrl}/cliente/listarClientes`, params));
  }
  public getClientesAll() {
    return firstValueFrom(this.http.get<Array<ICounterPartBD>>(`${environment.apiUrl}/cliente/listar`));
  }
  public getTipos() {
    return firstValueFrom(this.http.get<Array<ICounterPartTypeBD>>(`${environment.apiUrl}/cliente/tiposActivosCliente`));
  }
  public getClienteById(params: any) {
    return firstValueFrom(this.http.get<ICounterPartBD>(`${environment.apiUrl}/cliente`, { params: params }));
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public registerCliente(params: any) {
    return this.http.post<Response>(`${environment.apiUrl}/cliente/guardarClienteModal`, params);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public validateClient(params: any) {
    return firstValueFrom(this.http.get<IValidationClient>(`${environment.apiUrl}/cliente/validar`, { params: params }));
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public validateClientCounterpart(params: any) {
    return firstValueFrom(this.http.get<IValidationClient>(`${environment.apiUrl}/cliente/validarContraparte`, { params: params }));
  }
}
