export interface IAbogadoResponsable {
  id: number;
  usuario: string;
  clave: string;
  nombres: string;
  apellidos: string;
  correo: string;
  area: IAreaUser;
  estado: string;
  fechaCreacion: number;
  jefe: string;
  roles: IRol[];
  requiereAprobacion: boolean;
  label: string;
  nombreCompleto: string;
}

export interface IRequestingUser {
  id: number;
  usuario: string;
  clave: string;
  nombres: string;
  apellidos: string;
  correo: string;
  area: IAreaUser;
  estado: string;
  fechaCreacion: number;
  jefe: string;
  roles: IRol[];
  requiereAprobacion: boolean;
  label: string;
  nombreCompleto: string;
  perfilSesion: string;
}

export interface IRol {
  id: number;
  nombre: string;
  codigo: string;
  descripcion: string;
  estado: string;
  fechaCreacion: number;
  codigoSCA: string;
  label: string;
}

export interface IAreaUser {
  id: number;
  sede: ISede;
  nombre: string;
  fechaCreacion: string;
  horaIngreso: string;
  horaSalida: string;
  hijos: string;
  label: string;
}

export interface ISede {
  id: number;
  nombre: string;
  fechaCreacion: number;
  ubigeo: IUbigeo;
  estado: string;
  label: string;
}

export interface IUbigeo {
  id: number;
  codigo: string;
  nombre: string;
  padre: IPadre;
  label: string;
}

export interface IPadre {
  id: number;
  codigo: string;
  nombre: string;
  padre: IPadre;
  label: string;
}

export interface IRepresentanteLegalBD {
  id: {
    rol: IRol;
    usuario: IAbogadoResponsable;
  };
}
