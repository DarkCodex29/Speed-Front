export interface PenalidadBD {
    id: number;
    descripcion: string;
    reiterancia: number;
    aplicaPenalidad: boolean;
    estado: boolean;
    etiqueta: string;
    aplicaPorDefecto: boolean;
    numeroReiterancia: number;
    tipoValor: string;
    valor: string;
}

export interface ReiteranciaBD {
  id: number;
  valor: string;
}

export interface TipoValorBD {
  id: number;
  valor: string;
}
