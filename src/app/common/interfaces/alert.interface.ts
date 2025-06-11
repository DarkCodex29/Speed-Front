export interface AlertBD {
  id: number;
  grid: GridBD;
  tipoAlerta: AlertTypeBD;
}

export interface GridBD {
  id: number;
  codigo: string;
  titulo: string;
  nombre: string;
}

export interface AlertTypeBD {
  id: number;
  imagen: string;
  nombre: string;
  porcentaje: string;
  defecto: boolean;
}
