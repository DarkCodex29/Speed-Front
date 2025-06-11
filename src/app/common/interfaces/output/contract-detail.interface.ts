export interface IParameter {
  id: number;
  descripcion: string;
  tipo: string;
  valor: string;
  label?: string;
}

export interface IContractType {
  id: number;
  nombre: string;
  codigo: string;
}

export interface IContractDetail {
  adelanto: boolean;
  aplicaModalidadPago: number;
  aplicaPeriodicidad: number;
  arrendamiento: boolean;
  descripcion: string;
  documentoLegal: unknown;
  fechaFin: string;
  fechaFinFormat: string;
  fechaInicio: string;
  fechaInicioFormat: string;
  id: number;
  indefinido: boolean;
  label: string;
  modalidad_pago: string;
  moneda: IParameter;
  monto: number;
  montoTransient: string;
  monto_adelanto: number;
  monto_adelantoTransient: string;
  periodicidad: string;
  periodo_renovar: number;
  precioUnitario: number;
  renovacion_auto: boolean;
  tipo_contrato?: IContractType;
}

export interface IDestinatario {
  nombreDestinatario: string;
}
