export interface GroupBD {
    id: number;
    nombre: string;
    estado: string;
    tipoGrupo: ParametroBD;
}

export interface GroupByIdBD {
  id: number;
  nombre: string;
  estado: string;
  tipoGrupo: ParametroBD;
  usuarios: UsuariosBD[];
}

export interface ParametroBD {
  id: number;
  descripcion: string;
}

export interface UsuariosBD{
  id: number;
  usuario: string;
  nombres: string;
  apellidos: string;
  correo: string;
  nombreCompleto: string;
}
