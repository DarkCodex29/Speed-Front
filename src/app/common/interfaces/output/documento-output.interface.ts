export interface IDocumentoOutput {
  contraparte: string;
  estado: string;
  idDocumentoLegal: number;
  idExpediente: number;
  numeroDocumento: string;
  sumilla: string;
  tipoContrato: string;
  tipoSolicitud: string;
  ubicacion: string;

  compania?: string;
  area?: string;
  pais?: string;
  solicitante?: string;
  responsable?: string;
  moneda?: string;
  monto?: number;
  fechaInicio?: string;
  fechaVencimiento?: string;

  adendas?: Array<IDocumentoOutput>;
}

export interface IDocumentoSearchDashOutput {
  idDocumentoLegal: number;
  numeroDocumento: string;
  area?: string;
  ubicacion?: string;
  contraparte: string;
  fechaSolicitud: string;
  proceso: string;
}
