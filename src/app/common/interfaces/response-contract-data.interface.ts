import { IAreaUser } from './abogado-responsable.interface';
import { ICompany, ICountry, IProcess } from './data-combo.interface';

export interface IResponseContractData {
  idTraza: number | null;
  usuario: IUser;
  documentoLegal: ILegalDocument;
  idPais: number;
  idCompania: number;
  paises: ICountry[];
  companias: ICompany[];
  areas: IHcArea[];
  ubicaciones: IHcUbicacion[];
  representantes: IClient[];
  ubicacionOperacion: IHcUbicacion[];
  ubicacionProyecto: IHcUbicacion[];
  ubicacionOficina: IHcUbicacion[];
  listaTipoContrato: HcTipoContrato[];
  listaMonedas: IParameter[] | null;
  botoneraActiva: boolean;
}

export interface IUser {
  id: number;
  usuario: string;
  clave: string;
  nombres: string;
  apellidos: string;
  correo: string;
  area: IAreaUser[];
  estado: string;
  fechaCreacion: number;
  jefe: IUser | null;
  roles: IRole[] | null;
  perfiles: IProfile[] | null;
  perfilSesion: IProfile | null;
  requiereAprobacion: boolean;
  label: string;
  nombreCompleto: string;
}

export interface IRole {
  id: number;
  nombre: string;
  codigo: string;
  descripcion: string;
  estado: string;
  fechaCreacion: number;
  codigoSCA: string;
  label: string | null;
}

export interface IProfile {
  id: number;
  nombre: string;
  descripcion: string;
  estado: string;
  codigo: string;
  fechaCreacion: number | null;
  label: string | null;
}

export interface IUbigeous {
  id: number;
  codigo: string;
  nombre: string;
  padre: IParent;
  label: string | null;
}

export interface IParent {
  id: number;
  codigo: string;
  nombre: string;
  padre: IParent | null;
  label: string | null;
}

export interface ILegalDocument {
  id: number;
  expediente: IExpediente | null;
  ubicacionDocumento: null;
  area: IHcArea;
  contraparte: IClient;
  responsable: IUser;
  solicitante: IUser;
  estado: string | null;
  sumilla: string | null;
  fechaBorrador: number | null;
  fechaBorradorFormat: string | null;
  fechaSolicitud: number;
  fechaMovimiento: number;
  cnt_domicilio: string | null;
  cnt_nombre_contacto: string | null;
  cnt_telefono_contacto: string | null;
  cnt_correo_contacto: string | null;
  numero: string | null;
  contrato: IContrato | null;
  adenda: IAdenda | null;
  label: string | null;
}

export interface IAdenda {
  id: number;
  contrato: IContrato;
  hcTipoContrato: null;
  inicioVigencia: number;
  modifica_fin: boolean;
  nuevaFechaFin: null;
  indefinido: boolean;
  descripcion: string;
  secuencia: number;
  documentoLegal: null;
  nuevaFechaFinFormat: string;
  inicioVigenciaFormat: string;
  label: null;
}

export interface IContrato {
  id: number;
  tipo_contrato: HcTipoContrato;
  fechaInicio: number;
  fechaFin: number;
  indefinido: boolean;
  moneda: IParameter;
  modalidad_pago: string;
  precioUnitario: null;
  monto: number;
  adelanto: boolean;
  monto_adelanto: number;
  montoTransient: null;
  monto_adelantoTransient: null;
  periodicidad: string;
  renovacion_auto: boolean;
  periodo_renovar: null;
  descripcion: string;
  documentoLegal: null;
  arrendamiento: boolean;
  aplicaPeriodicidad: number;
  aplicaModalidadPago: number;
  fechaFinFormat: string;
  fechaInicioFormat: string;
  label: null;
}

export interface IExpediente {
  id: number;
  numero: string;
  estado: string;
  titulo: string;
  fechaCreacion: number;
  observacionMp: string;
  proceso: IProcess;
  aplicaPenalidad: boolean;
}

export interface IHcArea {
  id: number;
  nombre: string;
  compania: ICompany;
  estado: string;
  codigo: string;
  label: string | null;
}

export interface IClient {
  id: number;
  nombre: string | null;
  apellidoPaterno: string | null;
  apellidoMaterno: string | null;
  razonSocial: string;
  tipo: IType;
  numeroIdentificacion: string | null;
  telefono: string | null;
  fechaCreacion: number;
  estado: string;
  direcciones: IAddress[] | null;
  distancia: number | null;
  correo: string | null;
  esContraparte: boolean;
  esRepresentante: boolean;
  situacionSunat: string;
  direccionSunat: string | null;
  mensajeSR: string | null;
  labelCompleto: boolean | null;
  nombres: string | null;
  label: string | null;
}

export interface IType {
  id: number;
  codigo: string;
  nombre: string;
  verContraparte: string;
  verRepresentante: string;
  estado: string;
  label: string | null;
}

export interface IAddress {
  id: number;
  direccion: string;
  referencia: string;
  cliente: IClient;
  distrito: IUbigeous;
  label: string | null;
}

export interface IHcArea {
  id: number;
  nombre: string;
  compania: ICompany;
  estado: string;
  codigo: string;
  label: string | null;
}

export interface IHcUbicacion {
  id: number;
  nombre: string;
  tipo_ubicacion: HcTipoUbicacion;
  compania: ICompany;
  estado: string;
  codigo: string;
  label: string | null;
}

export interface HcTipoUbicacion {
  id: number;
  nombre: string;
  codigo: string;
  label: string | null;
}

export interface HcTipoContrato {
  id: number;
  nombre: string;
  codigo: string;
  label: string | null;
}

export interface IParameter {
  id: number;
  descripcion: string;
  tipo: string;
  valor: string;
  label: string | null;
}

export interface IRepresentanteCompania {
  id: number;
  representante: IUser;
  correo: string;
  estado: string;
  nroDocumento: string | null;
  label: string;
}
