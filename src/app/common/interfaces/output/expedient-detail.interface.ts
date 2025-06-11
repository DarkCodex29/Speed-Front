import { IContractDetail } from './contract-detail.interface';

export interface IExpedientDetail {
  botones: [];
  campos: [];
  contrato: IContractDetail;
  envioPendiente: unknown;
}
