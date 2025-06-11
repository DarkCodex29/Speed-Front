export interface DocumentoArea {
  area?: string;
  nombreDocumento?: string;
  numeroDocumento?: string;
  fechaCreacion?: string;
  asunto?: string;
  numeroExpediente?: string;
  estado?: string;
  areaActual?: string;
}

export interface DocumentoPorResponsable {
  id?: number;
  numero?: string;
  nombreCompania?: string;
  razonSocial?: string;
  fechaInicio?: Date;
  fechaSolicitud?: Date;
  fechaBorrador?: Date;
  nombreSolicitante?: string;
  estado?: string;
  nombreResponsable?: string;
  ubicaciones?: string;
}

export interface AlarmaContrato {
  numero?: string;
  compania?: string;
  nombreContraparte?: string;
  nombreResponsable?: string;
  nombreSolicitante?: string;
  fechaFinContrato?: Date;
  estado?: string;
  fechaAlarma?: Date;
  diasActivacion?: number;
  intervaloPorMes?: number;
  tituloAlarma?: string;
  estadoAlarma?: string;
}

export interface ReporteEstado {
  status?: string;
  strStatus?: string;
  enero?: string;
  febrero?: string;
  marzo?: string;
  abril?: string;
  mayo?: string;
  junio?: string;
  julio?: string;
  agosto?: string;
  setiembre?: string;
  octubre?: string;
  noviembre?: string;
  diciembre?: string;
}

export interface ReporteExpedienteArea {
  idExpediente?: number;
  numero?: string;
  titulo?: string;
  usuario?: string;
  fechaCreacion?: Date;
  cliente?: string;
  razonSocial?: string;
  proceso?: string;
  estado?: string;
  areaCreadora?: string;
  sedeOrigen?: string;
  areaDestino?: string;
  sedeDestino?: string;
  fechaUltimaTraza?: Date;
}
export interface ReporteServicio {
  fila?: number;
  expediente?: number;
  numero?: string;
  tipo_contrato?: string;
  servicio?: string;
  contraparte?: string;
  ubicacion?: string;
  tipo?: string;
  vencimiento?: Date;
  modalidad_pago?: string;
  monto?: string;
  estado?: string;
}

export interface ReporteArrendamiento {
  idExpediente?: number;
  idDocumentoLegal?: number;
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
  aplicaArrendamiento?: string;
}

export interface SeguimientoProcesosReporteBean {
  idDocumentoLegal?: number;
  ubicaciones?: string;
  numero?: string;
  tipoSolicitud?: string;
  nombreContraparte?: string;
  sumilla?: string;
  compania?: string;
  nombreSolicitante?: string;
  fechaSolicitud?: Date;
  estado?: string;
  nombreResponsable?: string;
  observacion?: string;
}
