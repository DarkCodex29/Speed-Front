export interface IFile {
  name: string;
  size: string;
  path: string;
}

export interface IDocumentUpload {
  name: string;
  required: boolean;
  files: Array<IFile>;
}

export interface ITabDocuments {
  code: number;
  documentType: string;
  subject: string;
  requiredFiles: Array<IDocumentUpload>;
}

export interface ITabDocumentsForm {
  id?: number;
  idExpediente?: number;
  idTipoDocumento: number;
  titulo: string;
  archivo?: Array<string>;
}
