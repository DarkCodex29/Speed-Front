import { SedeBD } from './campus.interface';

export interface HolidayBD {
  id: number;
  fecha: string;
  fechaCreacion: string;
  estado: string;
  sede: SedeBD;
}
