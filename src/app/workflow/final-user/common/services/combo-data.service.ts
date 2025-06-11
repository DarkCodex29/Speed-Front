import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  IAbogadoResponsable,
  IArea,
  IAreaUser,
  ICompany,
  IContractFilter,
  IContractInfo,
  IContractType,
  ICounterPartBD,
  ICountry,
  ICustomerType,
  IExploration,
  IGroup,
  ILocation,
  ILocationType,
  IMoneda,
  IOffice,
  IOperation,
  IPenalidad,
  IProcess,
  IProject,
  IRequestingUser,
  ISede,
  IStatusReport,
  ITipoDocumento,
  IUsuarioCombo,
} from '@speed/common/interfaces';
import { environment } from '@speed/env/environment';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ComboDataService {
  public constructor(private http: HttpClient) {}

  public getCountries() {
    return firstValueFrom(this.http.get<ICountry[]>(`${environment.apiUrl}/hcPais`));
  }

  public getCompanies() {
    return firstValueFrom(this.http.get<ICompany[]>(`${environment.apiUrl}/hcCompania`));
  }

  public getAreas() {
    return firstValueFrom(this.http.get<IArea[]>(`${environment.apiUrl}/hcArea`));
  }

  public getAreasFilter(idCompania: number) {
    return firstValueFrom(this.http.get<IArea[]>(`${environment.apiUrl}/hcArea/?idCompania=${idCompania}`));
  }

  public getOperationsByCompany(idCompany: string) {
    return this.http.get<IOperation[]>(`${environment.apiUrl}/registrarSolicitud/obtenerUbicacionOperacionPorPorCompania/${idCompany}`);
  }

  public getOfficesByCompany(idCompany: string) {
    return this.http.get<IOffice[]>(`${environment.apiUrl}/registrarSolicitud/obtenerUbicacionOficinaPorPorCompania/${idCompany}`);
  }

  public getProjectsByCompany(idCompany: string) {
    return this.http.get<IProject[]>(`${environment.apiUrl}/registrarSolicitud/obtenerUbicacionProyectoPorPorCompania/${idCompany}`);
  }

  public getExplorationsByCompany(idCompany: string) {
    return firstValueFrom(
      this.http.get<IExploration[]>(`${environment.apiUrl}/registrarSolicitud/buscarUbicacionExploracionPorPorCompania/${idCompany}`),
    );
  }

  public getCounterParts() {
    return firstValueFrom(this.http.get<ICounterPartBD[]>(`${environment.apiUrl}/registrarSolicitud/buscarClienteContraparte`));
  }

  public getLegalRepresentatives() {
    return firstValueFrom(this.http.get<ICounterPartBD[]>(`${environment.apiUrl}/registrarSolicitud/buscarClienteRepresentante`));
  }

  public getRepresentativesByCounterpart(idCounterpart: number) {
    return firstValueFrom(this.http.get(`${environment.apiUrl}/registrarSolicitud/obtenerRepresentantes/${idCounterpart}`));
  }

  public getResponsibleLawyers() {
    return firstValueFrom(this.http.get<IAbogadoResponsable[]>(`${environment.apiUrl}/registrarSolicitud/buscarUsuarioResponsable`));
  }

  public getRequestingUsers() {
    return firstValueFrom(this.http.get<IRequestingUser[]>(`${environment.apiUrl}/registrarSolicitud/buscarUsuarioSolicitante`));
  }

  public getCustomerTypes() {
    return firstValueFrom(this.http.get<ICustomerType[]>(`${environment.apiUrl}/tipoCliente`));
  }

  public getPenaltiesByExpediente(idExpediente: number) {
    return this.http.get<IPenalidad[]>(`${environment.apiUrl}/registrarSolicitud/obtenerPenalidadesPorExpediente/${idExpediente}`);
  }

  public filterContract(sumilla: string) {
    return this.http.post<IContractFilter[]>(`${environment.apiUrl}/registrarSolicitud/autocompletarContrato`, {
      numeroSumilla: sumilla,
    });
  }

  public getInfoContract(contract: string) {
    return firstValueFrom(this.http.get<IContractInfo>(`${environment.apiUrl}/registrarSolicitud/datosContratoParaAdenda/${contract}`));
  }

  public getAreasReporte() {
    return firstValueFrom(this.http.get<IAreaUser[]>(`${environment.apiUrl}/reporte/getAreas`));
  }

  public getTiposDocumentos() {
    return firstValueFrom(this.http.get<ITipoDocumento[]>(`${environment.apiUrl}/reporte/getTiposDocumento`));
  }

  public getStates() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return firstValueFrom(this.http.get<any[]>(`${environment.apiUrl}/estado/obtenerEstados`));
  }

  public getProcesses() {
    return firstValueFrom(this.http.get<IProcess[]>(`${environment.apiUrl}/proceso`));
  }

  public getProcesos(params: number) {
    return firstValueFrom(this.http.get<IProcess[]>(`${environment.apiUrl}/proceso?tipoProceso=${params}`));
  }

  public getProcesosF(params: number) {
    let onlyParents = true;
    return firstValueFrom(this.http.get<IProcess[]>(`${environment.apiUrl}/proceso?idTipoProceso=${params}&onlyParents=${onlyParents}`));
  }

  public getSedes() {
    return firstValueFrom(this.http.get<ISede[]>(`${environment.apiUrl}/reporte/getSedes`));
  }

  public getProcesosActivos() {
    return firstValueFrom(this.http.get<IProcess[]>(`${environment.apiUrl}/reporte/getProcesosActivos`));
  }

  public getUsuariosActivos() {
    return firstValueFrom(this.http.get<IUsuarioCombo[]>(`${environment.apiUrl}/reporte/getUsuariosActivos`));
  }

  public getContractTypes() {
    return firstValueFrom(this.http.get<IContractType[]>(`${environment.apiUrl}/HcTipoContrato/listar`));
  }

  public getAnios() {
    return firstValueFrom(this.http.get<number[]>(`${environment.apiUrl}/estadoBandejaAbogados/getAnios`));
  }

  public getLocationTypes() {
    return firstValueFrom(this.http.get<Array<ILocationType>>(`${environment.apiUrl}/hcUbicacion/obtenerHcTipoUbicacion`));
  }

  public getLocations() {
    return firstValueFrom(this.http.get<Array<ILocation>>(`${environment.apiUrl}/hcUbicacion/listarUbicaciones`));
  }

  public getStatusReport() {
    return firstValueFrom(this.http.get<IStatusReport[]>(`${environment.apiUrl}/reporte/getEstadosDL`));
  }

  public getStatusProcessReport() {
    return firstValueFrom(this.http.get<IStatusReport[]>(`${environment.apiUrl}/reporte/getEstadosProcesos`));
  }

  public getActiveGroups() {
    return firstValueFrom(this.http.get<IGroup[]>(`${environment.apiUrl}/reporte/getGruposActivos`));
  }

  public getMonedas() {
    return firstValueFrom(this.http.get<IMoneda[]>(`${environment.apiUrl}/parametro?tipo=moneda`));
  }

  public filterContractById(id: number) {
    return firstValueFrom(this.http.get<IContractFilter>(`${environment.apiUrl}/registrarSolicitud/getContratoSumilla/${id}`));
  }
}
