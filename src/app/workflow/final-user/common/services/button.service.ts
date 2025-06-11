import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PerfilesBD } from '@speed/common/interfaces';
import { ButtonBD } from '@speed/common/interfaces/button.interface';
import { environment } from '@speed/env/environment';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ButtonService {
  public constructor(private http: HttpClient) {}

  public getBotones(params: any) {
    return firstValueFrom(this.http.post<Array<ButtonBD>>(`${environment.apiUrl}/boton/list`, params));
  }

  public getBotonById(id: number) {
    return firstValueFrom(this.http.get<ButtonBD>(`${environment.apiUrl}/boton/find/${id}`));
  }

  public getPerfilesDisponibles(id: number) {
    return firstValueFrom(this.http.get<Array<PerfilesBD>>(`${environment.apiUrl}/boton/perfilesDisponibles/${id}`));
  }

  public registerBoton(params: any) {
    return this.http.post<Response>(`${environment.apiUrl}/boton/save`, params);
  }
}
