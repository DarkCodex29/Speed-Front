import { PerfilesBD } from './user.interface';

export interface ButtonBD {
  id: number;
  nombre: string;
  codigo: string;
  descripcion: string;
  url: string;
  tipo: string;
  icono: string;
  parametro: string;
  bloqueable: boolean;
  bloqueableParalelo: boolean;
  eventoSubmit: string;
  eventoComplete: string;
  orden: string;
  iconoNuevo: string;
  botonClaseNuevo: string;
  urlNuevo: string;
  bloqueado: boolean;
  estado: string;
  movil: string;
  perfiles: PerfilesBD[];
}
