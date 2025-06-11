import { EventEmitter } from '../../stencil-public-runtime';
export interface Modelable {
  value: unknown;
  valueChange?: EventEmitter;
}
export interface ItemModel {
  id: string | number | undefined;
  name: string;
}
