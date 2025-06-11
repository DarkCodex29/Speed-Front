import { DocumentTypeBD } from './document-type.interface';
import { AreaBD } from '@speed/common/interfaces';

export interface NumerationBD {
  id: number;
  tipoDocumento: DocumentTypeBD;
  area: AreaBD;
  nombre: string;
  valor: string;
  preformato: string;
  postFormato: string;
  longitud: string;
  tipo: string;
}
