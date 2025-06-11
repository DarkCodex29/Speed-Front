export interface LoginResponse {
  token?: string;
  usuario?: string;
  nombre?: string;
  correo?: string;
  area?: string;
  puesto?: string;
  rolesUsuario?: string[];
  listaOpciones?: Opciones[];
  busquedasGuardada?: string[];
}

export interface Opciones {
  id?: number;
  nombre?: string;
  linkOpcion?: string;
  subOpciones?: SubOpciones[];
  expanded?: boolean;
}

export interface SubOpciones {
  id?: number;
  nombre?: string;
  linkOpcion?: string;
  subOpciones?: SubOpciones[];
  expanded?: boolean;
}
