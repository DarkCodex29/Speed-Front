import { IProject } from './data-combo.interface';

export interface IRepresentativeType {
  id: 2;
  codigo: string;
  nombre: string;
  documento: string;
  verContraparte: string;
  verRepresentante: string;
  estado: string;
  label: string;
}

export interface IRepresentative {
  id: number;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  razonSocial: string;
  tipo: IRepresentativeType;
  numeroIdentificacion: string;
  telefono: string;
  fechaCreacion: string;
  estado: string;
  direccion: string;
  direcciones: string;
  distancia: string;
  correo: string;
  esContraparte: boolean;
  esRepresentante: boolean;
  situacionSunat: string;
  direccionSunat: string;
  mensajeSR: string;
  labelCompleto: string;
  label: string;
  nombres: string;
  identificacion: string;
  contacto: string;
}

export interface IContractInfo {
  numeroAdenda: number;
  idArea: number;
  area: string;
  idCompania: number;
  compania: string;
  pais: string;
  idContraparte: number;
  cntNombre: string;
  cntSituacion: string;
  cntDomicilio: string;
  cntNumeroIdentificacion: string;
  cntNombreContacto: string;
  cntTelefono: string;
  cntEmail: string;
  representantes: Array<IRepresentative>;
  ubicaciones: Array<IProject>;
}

export interface IContractFilter {
  idDocumentoLegal: number;
  sumilla: string;
}

export interface IContract {
  id: number;
  code: string;
  isVerContratoButton?: boolean;
}
