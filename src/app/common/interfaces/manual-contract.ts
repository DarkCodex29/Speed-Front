import { ICounterPart } from './counterpart';
import { IElaborationDocumentContract } from './elaborationDocument';

export interface IManualContract {
  counterpart: ICounterPart;
  elaborationDocument: IElaborationDocumentContract;
}
