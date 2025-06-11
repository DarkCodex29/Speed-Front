export interface PlantillaBD {
    id: number;
    tipoContrato: TipoContratoBD;
    nombre: string;
    ruta: string;
    estado: string;
}

export interface TipoContratoBD {
  id: number;
  nombre: string;
  codigo: string;
}
