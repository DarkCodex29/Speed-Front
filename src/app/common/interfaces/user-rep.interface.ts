export interface UserRepBD {
    id: number;
    nombres: string;
    apellidos: string;
    numeroDocumento: string;
    correo: string;
}

export interface UserRepByIdBD {
  id: number;
  representante: RepresentanteBD;
  nroDocumento: string;
  correo: string;
  estado: string;
}

export interface RepresentanteBD {
  id: number;
  nombres: string;
  apellidos: string;
  nombreCompleto: string;
}
