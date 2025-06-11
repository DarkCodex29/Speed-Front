export interface ITrace {
  accionSeleccionada: string;
  actividad: string;
  destinatarios: string;
  fechaRecepcion: string;
  fechaLimite: string;
  observaciones: string;
  proceso: string;
  remitente: string;
  accion: string;
  id: number;
  multiple: boolean;
}

export interface IHistorialOutput {
  message: string;
  numero: string;
  fechaLimite: string;
  historial: Array<ITrace>;
}
