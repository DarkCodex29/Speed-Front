import { DocumentTypeBD } from './document-type.interface';
import { ParametroBD } from './group.interface';
import { RolesBD } from './user.interface';
export interface ProcessBD {
  id: number;
  nombre: string;
  tipoProceso: DocumentTypeBD;
  confidencialidad: ParametroBD;
  descripcion: string;
  plazoDias: string;
  estado: string;
  conCliente: string;

  creadorResponsable: boolean;
  usuarioResponsable: UsuarioParticipanteBD;
  rolResponsable: RolesBD;

  usuariosParticipantes: UsuarioParticipanteBD[];
  rolesParticipantes: RolesBD[];
  rolesProcesos: RolesBD[];
  tipoDocumentos: DocumentTypeBD[];
}

export interface UsuarioParticipanteBD {
  id: number;
  nombres: string;
  apellidos: string;
  nombreCompleto: string;
}

export interface TipoProcesoBD {
  id: number;
  codigo: string;
  nombre: string;
  estado: string;
}
