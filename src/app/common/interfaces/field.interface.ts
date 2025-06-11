export interface FieldBD {
    nombre: string;
    descripcion: string;
    fechaCreacionFormat: string;
}

export interface FieldByIdBD {
    id: number;
    tipoCampo: FieldTypeBD;
    nombre: string;
    descripcion: string;
    etiqueta: string;
    contenido: string;
    buscable: boolean;
    obligatorio: boolean;
}

export interface FieldTypeBD {
  id: number;
  nombre: string;
  codigo: string;
  conContenidoodigo: boolean;
  estado: string;
}
