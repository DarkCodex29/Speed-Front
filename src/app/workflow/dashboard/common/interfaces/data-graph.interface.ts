export interface IDataGraph {
  value: number;
  name: string;
  itemStyle?: {
    color: string;
  };
}

export interface IDocumentGraph {
  [key: string]: {
    cantidad: Array<number>;
    color: string;
  };
}
