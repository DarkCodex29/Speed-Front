import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IAreaPregunta, IEstadoDocumento, IPregunta } from "@speed/common/interfaces";
import { environment } from "@speed/env/environment";
import { firstValueFrom } from "rxjs";

@Injectable()
export class VirtualAssistantMaintenanceService {
  public constructor(private http: HttpClient) {}

  public getAreas() {
    return firstValueFrom(this.http.get<Array<IAreaPregunta>>(`${environment.apiUrl}/mantenimientoPregunta/areas`));
  }
  public getTemasByArea(params: any) {
    return firstValueFrom(this.http.get<Array<IAreaPregunta>>(`${environment.apiUrl}/mantenimientoPregunta/temasByArea`, { params: params }));
  }
  public getPreguntasByArea(params: any) {
    return firstValueFrom(this.http.get<Array<IPregunta>>(`${environment.apiUrl}/mantenimientoPregunta/listarPreguntas`, {params: params} ));
  }

  public registrarPregunta(params: any){
    return firstValueFrom(this.http.post<Response>(`${environment.apiUrl}/mantenimientoPregunta/guardarPreguntaModal`, params ));
  }
  public modificarPregunta  (params: any){
    return firstValueFrom(this.http.post<Response>(`${environment.apiUrl}/mantenimientoPregunta/modificarPreguntaModal`, params ));
  }

  public getPreguntaRespuesta(params: any){
    return firstValueFrom(this.http.get<IPregunta>(`${environment.apiUrl}/mantenimientoPregunta/pregunta`, { params: params }));
  }

  public getListaPreguntas(){
    return firstValueFrom(this.http.get<IPregunta[]>(`${environment.apiUrl}/asistenteVirtual`));

  }
  public registrarPreguntaAsistente(params: {pregunta: string}){
    return firstValueFrom(this.http.post<Response>(`${environment.apiUrl}/asistenteVirtual/registrarPregunta`, params ));

  }

  public registrarUsabilidad(params: {idOpcionAsistente: number, esOpcionAsistente: string}){
    return firstValueFrom(this.http.post<Response>(`${environment.apiUrl}/asistenteVirtual/registrarUsabilidad`, params ));

  }
  public getEstadoDocumento(params: {codigo: string}){
    return firstValueFrom(this.http.get<IEstadoDocumento[]>(`${environment.apiUrl}/revisarDocumento/estadoDocumento`, {params: params}));

  }
}
