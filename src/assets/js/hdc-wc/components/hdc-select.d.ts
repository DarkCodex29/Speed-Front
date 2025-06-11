import type { Components, JSX } from '../types/components';

interface HdcSelect extends Components.HdcSelect, HTMLElement {}
export const HdcSelect: {
  prototype: HdcSelect;
  new (): HdcSelect;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
