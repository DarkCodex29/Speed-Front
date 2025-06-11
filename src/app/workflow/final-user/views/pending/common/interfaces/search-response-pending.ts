export interface ISearchResponsePending {
  idExpediente: number;
  numero: string;
  nombreCompania: string;
  contraparte: string;
  sumilla: string;
  estado?: string;
  fechaSolicitud: string;
  fechaBorrador: string;
  nombreProceso: string;
}
