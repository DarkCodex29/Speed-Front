export interface UserBD {
  id: number;
  usuario: string;
  clave: string;
  nombres: string;
  apellidos: string;
  area: AreaBD;
  jefe: string;
  correo: string;
  estado: string;
  requiereAprobacion: string;
  roles: RolesBD[];
  perfiles: PerfilesBD[];
}

export interface UsuarioBeanBD {
  id: number;
  usuario: string;
  nombres: string;
  apellidos: string;
  area: string;
}

export interface AreaBD {
  id: number;
  nombre: string;
}

export interface RolesBD {
  id: number;
  nombre: string;
}

export interface PerfilesBD {
  id: number;
  nombre: string;
}

export interface JefeBD {
  id: number;
  nombreCompleto: string;
}
