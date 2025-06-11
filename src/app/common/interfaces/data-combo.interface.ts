export interface ICountry {
  id: number;
  nombre: string;
  codigo: string;
  orden: number;
  estado: string;
  label: string;
}

export interface ICompany {
  id: number;
  nombre: string;
  pais: ICountry;
  estado: string;
  codigo: string;
  abreviatura: string;
  label: string;
}
export interface IYear {
  year: string;
}

export interface IArea {
  id: number;
  nombre: string;
  compania: ICompany;
  estado: string;
  codigo: string;
  label: string;
}

export interface ISimplifiedArea {
  id: number;
  nombre: string;
}

export interface ILocationType {
  id: number;
  nombre: string;
  codigo: string;
  label: string;
}

export interface ILocation {
  id: number;
  nombre: string;
  codigo: string;
  label: string;
  tipo_ubicacion: ILocationType;
  compania: ICompany;
}

export interface IOperation {
  id: number;
  nombre: string;
  tipo_ubicacion: ILocationType;
  compania: ICompany;
  estado: string;
  codigo: string;
  ubicacion: ILocation;
  label: string;
}

export interface IOffice {
  id: number;
  nombre: string;
  tipo_ubicacion: ILocationType;
  compania: ICompany;
  estado: string;
  codigo: string;
  ubicacion: ILocation;
  label: string;
}
export interface IExploration {
  id: number;
  nombre: string;
  tipo_ubicacion: ILocationType;
  compania: ICompany;
  estado: string;
  codigo: string;
  ubicacion: ILocation;
  label: string;
}
export interface IProject {
  id: number;
  nombre: string;
  tipo_ubicacion: ILocationType;
  compania: ICompany;
  estado: string;
  codigo: string;
  ubicacion: ILocation;
  label: string;
}

export interface IState {
  id: string;
  estado: string;
}

export interface IProcessType {
  id: number;
  codigo: string;
  nombre: string;
  estado: string;
  fechaCreacion: number | null;
  alerta: string;
  label: string;
}

export interface IProcess {
  id: number;
  tipoProceso: IProcessType;
  nombre: string;
  descripcion: string;
  fechaCreacion: number;
  estado: string;
  nombreIntalio: string;
  plazo: number;
  cliente: boolean;
  tipoConfidencialidad: string;
  creadorResponsable: boolean;
  label: string;
}

export interface IContractType {
  id: number;
  codigo: string;
  label: string;
  nombre: string;
}

export interface ITipoProceso {
  id: number;
  codigo: string;
  nombre: string;
  estado: string;
  fechaCreacion?: string;
  alerta: string;
  label: string;
}

//Interfaces for Reports
export interface ITipoDocumento {
  id: number;
  nombre: string;
  descripcion: string;
  estado: string;
  firmable: boolean;
  fechaCreacion: string;
  campos: [];
  label: string;
}

export interface IUsuarioCombo {
  id: number;
  usuario: string;
  nombres: string;
  apellidos: string;
  correo: string;
}

export interface IStatusReport {
  valor: string;
  nombre: string;
}

export interface IGroupType {
  id: number;
  descripcion: string;
  tipo: string;
  valor: string;
  label: string;
}

export interface IGroup {
  id: number;
  nombre: string;
  estado: string;
  tipoGrupo: IGroupType;
  flagUsuarioGrupoExiste: boolean;
  idUsuario: number;
  usuario: string;
  clave: string;
  nombres: string;
  apellidos: string;
  correo: string;
  label: string;
}

export interface IMoneda {
  id: number;
  descripcion: string;
  tipo: string;
  valor: string;
  label: string | null;
}

export interface ISelect {
  value: string | number;
  label: string;
}
