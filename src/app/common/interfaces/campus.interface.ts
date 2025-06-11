export interface SedeBD {
    id: number;
    nombre: string;
    fechaCreacionLabel: string;
    ubigeo: UbigeoBD;
    estado: string;
}

export interface UbigeoBD {
  id: number;
  codigo: string;
  nombre: string;
  padre: provinciaBD;
}

export interface provinciaBD {
  id: number;
  codigo: string;
  nombre: string;
  padre: departamentoBD;
}

export interface departamentoBD {
  id: number;
  codigo: string;
  nombre: string;
  padre: string;
}
