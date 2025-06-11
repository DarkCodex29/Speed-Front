export interface IReiterancia {
  index: number;
  descripcion: string;
  valor: string;
  moneda: string;
}

export interface IPenalidad {
  idPenalidad: number;
  descripcion: string;
  aplica: boolean;
  reiterancias: Array<IReiterancia>;
  aplicaValorDefecto: boolean;
  numeroReiterancia: number;
  tipoValor: string;
  valor: string;
}
