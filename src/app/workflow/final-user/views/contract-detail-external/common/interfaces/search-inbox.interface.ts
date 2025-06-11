export interface ISearchInbox {
  numero: string | null | undefined;
  // pais: number,
  compania: string | number | null;
  contraparte: string | number | null;
  sumilla: string | null | undefined;
  estado: string | null | undefined;
  proceso: string | number | null;
  usuario: string | number | null;
  pais?: string | number | null;
}
