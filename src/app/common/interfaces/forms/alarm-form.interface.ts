export interface IAlarmModel {
  idDocumentoLegal: number;
  nombreGrupo: string;
  idVisadores: Array<number>;
  esGrupo: Array<number>;
  fechaAlarma: string;
  anual: boolean;
  activacion: number;
  intervalo: number;
  titulo: string;
  mensaje: string;
  id?: number;
  estado: string;
  namesIdGrupo:Array<{nombre:string,id:number}>;
  namesIdVisadores:Array<{nombre:string,id:number}>;
}
