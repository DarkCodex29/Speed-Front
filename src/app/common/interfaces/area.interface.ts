export interface AreaBD {
  id: number;
  nombre: string;
  sede: SedeBD;
  dependencia: DependenciaBD;
}

export interface SedeBD {
  id: number;
  nombre: string;
}

export interface DependenciaBD {
  id: number;
  nombre: string;
}
