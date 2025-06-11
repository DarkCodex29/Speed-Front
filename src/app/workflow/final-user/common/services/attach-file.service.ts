import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@speed/env/environment';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AttachFileService {
  public constructor(private http: HttpClient) {}

  public verificarArchivo(params: any) {
    return firstValueFrom(this.http.post<any>(`${environment.apiUrl}/adjuntarArchivo/verificarArchivo`, params));
  }
  public adjuntarArchivo(params: any) {
    return this.http.post<any>(`${environment.apiUrl}/adjuntarArchivo`, params);
  }
  public subirArchivoAlfresco(params: any) {
    return this.http.post<any>(`${environment.apiUrl}/adjuntarArchivo/subirArchivoAlfresco`, params);
  }

  public eliminarArchivo(idArchivos: number[]) {
    return this.http.post<any>(`${environment.apiUrl}/adjuntarArchivo/eliminarArchivo`, idArchivos);
  }
}
