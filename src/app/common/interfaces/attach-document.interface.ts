export interface IDocumentTypes {
  id: number;
  nombre: string;
  descripcion: string;
  estado: string;
  firmable: boolean;
  fechaCreacion: string;
  campos: [];
  label: string;
}

export interface IAttachDocumentModal {
  tamanioArchivoAdjunto: number;
  tamanioArchivo: string;
  tipos: Array<IDocumentTypes>;
}
