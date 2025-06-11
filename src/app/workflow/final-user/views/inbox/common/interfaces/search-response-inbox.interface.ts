export interface ISearchResponseInbox {
  id: number;
  alerta: IAlerta;
  idtraza?: number;
  numero: string;
  nombreCompania: string;
  // contraparte: string;
  razonSocial: string;
  sumilla: string;
  estadoDocumentoLegal: string;
  estado?: string;
  fechaSolicitud: string;
  fechaBorrador: string;
  nombreProceso: string;
  estadoTraza: string;
  leido: boolean;
}

export interface IAlerta {
  grid: null;
  id: number;
  label: string | null;
  tipoAlerta: ITipoAlerta;
}

export interface ITipoAlerta {
  defecto: boolean;
  id: number;
  imagen: string;
  nombre: string;
}
