import { ProcessBD } from './process.interface';

export interface WorkflowBD {
  id: number;
  nombre: string;
  descripcion: string;
  version: string;
  proceso: ProcessBD;
}
