import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@speed/env/environment';

@Injectable()
export class DatosContratoService {
  public constructor(private http: HttpClient) {}

  public guardarDocumentoLegal(params: unknown) {
    return this.http.post<Response>(`${environment.apiUrl}/datosContrato/guardarDocumentoLegal`, params);
  }

  public savePenalidades(params: unknown) {
    return this.http.post<Response>(`${environment.apiUrl}/registrarSolicitud/guardarPenalidades`, params);
  }
}
