export interface ICounterPart {
  counterPart: string;
  situation: string;
  address: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  legalRepresentatives: ILegalRepresentative[];
}

export interface ILegalRepresentative {
  idRepresentanteLegal: number;
  tipoCliente: number;
  numeroIdentificacion: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  correo: string;
  esRepresentante: boolean;
  esContraparte: boolean;
  eliminado: boolean;
}

export interface ICounterPartBD {
  id: number;
  nombre?: string;
  apellidoPaterno?: string;
  apellidoMaterno?: string;
  razonSocial?: string;
  tipo?: ICounterPartTypeBD;
  numeroIdentificacion?: string;
  telefono?: string;
  fechaCreacion?: string;
  estado?: string;
  direccion?: string;
  direcciones?: string;
  distancia?: string;
  correo?: string;
  esContraparte?: boolean;
  esRepresentante?: boolean;
  situacionSunat?: string;
  direccionSunat?: string;
  mensajeSR?: string;
  labelCompleto?: string;
  nombres?: string;
  identificacion?: string;
  contacto?: string;
  label?: string;
}

export interface ICounterPartTypeBD {
  id: number;
  codigo: string;
  nombre: string;
  documento: string;
  verContraparte: string;
  verRepresentante: string;
  estado: string;
  label: string;
}

export interface IValidationClient {
  existe: boolean;
  cliente?: ICounterPartBD;
  mesage: string;
}
