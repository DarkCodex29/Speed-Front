export interface ITabModel {
  id: number;
  code: string;
  idExpediente?: number;
  isVerContratoButton?: boolean;
}

export interface ITabSearchDocumentModel {
  id: number;
  code: string;
  idExpediente?: number;
  isVerContratoButton?: boolean;
  status?: string;
}
