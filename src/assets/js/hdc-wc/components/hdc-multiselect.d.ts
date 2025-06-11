import type { Components, JSX } from '../types/components';

interface HdcMultiselect extends Components.HdcMultiselect, HTMLElement {}
export const HdcMultiselect: {
  prototype: HdcMultiselect;
  new (): HdcMultiselect;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
