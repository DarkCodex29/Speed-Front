export interface ISolicitudesGenerales {
  proceso: string;
  estado: string;
  cantidad: number;
  porcentaje: number;
  color?: string;
}

export interface ISolicitudesGeneralesElaborado {
  estado: string;
  cantidad: number;
  porcentaje: number;
  color?: string;
  ubicacion: string;
  idUbicacion: number;
}
