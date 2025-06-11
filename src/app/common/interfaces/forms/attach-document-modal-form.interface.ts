export interface IAttachDocumentModalModel {
  idExpediente: number;
  idTipoDocumento: number;
  numero: string;
  titulo: string;
  archivo: string;
}
export interface IAttachDraftModalModel {
  id: number;
  idDestinatarios: number[];
  archivo: string;
}

export interface IAttachFileModalModel {
  idDocumento: number;
  nombreArchivoDisco: string;
}
