import { ProcessBD } from './process.interface';

export interface ReplacementBD {
  id: number;
  reemplazado: UserReemplazoBD;
  reemplazante: UserReemplazoBD;
  procesos: ProcessBD[];
  desde: Date;
  hasta: Date;
  fechaDesde: string;
  fechaHasta: string;
}

export interface UserReemplazoBD {
  id: number;
  nombres: string;
  apellidos: string;
  numeroDocumento: string;
  correo: string;
}
