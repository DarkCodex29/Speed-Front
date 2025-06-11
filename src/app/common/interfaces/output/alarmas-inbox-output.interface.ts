import { GroupModel } from "@speed/common/models/group.model";
import { UsuarioBeanBD } from "../user.interface";
import { IAlarmModel } from "../forms";

export interface IHcAlarma {
  id: number;
  documentoLegal: object;
  fechaAlarma: Date;
  anual: boolean;
  dias_activacion: number;
  dias_intervalo: number;
  titulo: string;
  mensaje: string;
  estado: string;
}

export interface IAlarmsInboxOutput {
  idDocumentoLegal: number;
  usuario: object;
  alarmas: Array<IAlarmModel>;
}
