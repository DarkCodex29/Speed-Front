import { ILocation } from './data-combo.interface';

export interface IElaborationDocumentContract {
  country: string;
  company: string;
  area: string;
  location: ILocation[];
  observations: string;
  startDate: string;
  endDate: string;
  currency: string;
  paymentMethod: string;
  fixedAmount: number;
  paymentMethodApplies: boolean;
  advancement: boolean;
  advanceAmount: number;
  paymentFrequency: number;
  automaticRenewal: boolean;
  periodToRenew: number;
  periodicityApplies: boolean;
  lease: boolean;
}

export interface ContratoDTS {
  idExpediente?: number;
  idDocumentoLegal?: number;
  idContratoAdenda?: number;
  numero?: string;
  tipo?: string;
  tipoContrato?: string;
  contraparte?: string;
  cnt_tipo?: string;
  cnt_nombre?: string;
  cnt_razon?: string;
  ubicacion?: string;
  est_codigo?: string;
  estado?: string;
  voPais?: string;
  voCompania?: string;
  voArea?: string;
  sumilla?: string;
  compania?: string;
  solicitante?: string;
  responsable?: string;
  moneda?: string;
  flMonto?: number;
  monto?: string;
  fechaInicio?: string;
  fechaVencimiento?: string;
  pais?: string;
  area?: string;
  puedeVisualizar?: boolean;
  docHijos?: FilaBusquedaDTS[];
}

export interface FilaBusquedaDTS {
  idExpediente?: number;
  idDocumentoLegal?: number;
  idContratoAdenda?: number;
  numero?: string;
  tipo?: string;
  tipoContrato?: string;
  contraparte?: string;
  cnt_tipo?: string;
  cnt_nombre?: string;
  cnt_razon?: string;
  ubicacion?: string;
  est_codigo?: string;
  estado?: string;
  voPais?: string;
  voCompania?: string;
  voArea?: string;
  sumilla?: string;
  compania?: string;
  solicitante?: string;
  responsable?: string;
  moneda?: string;
  flMonto?: number;
  monto?: string;
  fechaInicio?: string;
  fechaVencimiento?: string;
  pais?: string;
  area?: string;
  puedeVisualizar?: boolean;
  docHijos?: FilaBusquedaDTS[];
}

export interface FilaSeguimientoSolicitudDTS {
  idExpediente?: number;
  idDocumentoLegal?: number;
  numeroDocumento?: string;
  abogado?: string;
  sumilla?: string;
  contraparte?: string;
  solicitante?: string;
  ultimoMovimiento?: string;
  idUbicacion?: number;
  ubicacionDocumento?: string;
  estado?: string;
}
