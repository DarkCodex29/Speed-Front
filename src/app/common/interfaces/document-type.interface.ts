export interface DocumentTypeBD {
  id: number;
  nombre: string;
  descripcion: string;
  estado: string;
  firmable: string;
  campos: FieldDocumentBD[];
  cantidad: number;
}

export interface FieldDocumentBD {
  id: number;
  nombre: string;
  descripcion: string;
}
