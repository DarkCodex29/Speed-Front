import type { Components, JSX } from '../types/components';

interface HdcInput extends Components.HdcInput, HTMLElement {}
export const HdcInput: {
  prototype: HdcInput;
  new (): HdcInput;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
