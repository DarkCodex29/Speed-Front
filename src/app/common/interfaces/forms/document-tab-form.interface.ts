export interface IDocumentFileModel {
  name: string;
  files: Array<string>;
}

export interface IDocumentsTabModel {
  id: string;
  idExpediente: number;
  idTipoDocumento: number;
  titulo: string;
  documentos: Array<IDocumentFileModel>;
}
