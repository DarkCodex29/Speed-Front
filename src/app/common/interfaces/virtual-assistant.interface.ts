export interface IAreaPregunta{
    codigoArea?: number;
    descripcionArea?: string;
}
export interface IParametro{
    id?: number;
    descripcion?: string;
    tipo?: string;
    valor?: string;
}
export interface IPreguntaId{
    aplicacion?: number;
    codigo?: number;
}

export interface IGrupoAsistenteVirtual{
    id?: number;
    tema?: IParametro;
    area?: IParametro;
    vigente?: string;
}

export interface IPregunta{
    id?: IPreguntaId;
    grupo?: IGrupoAsistenteVirtual;
    codigoPregunta?: string;
    descripcionPregunta?: string;
    codigoRespuesta?: string;
    descripcionRespuesta?: string;
    vigente?: string;

}

export interface IEstadoDocumento {
    id?: number;
    codigoEstado?: string;
    estado?: string;
    fecha?: Date;
    situacion?: number;
    flujo?: string;
  }
