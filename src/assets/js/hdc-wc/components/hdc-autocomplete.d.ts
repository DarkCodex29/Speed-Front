import type { Components, JSX } from '../types/components';

interface HdcAutocomplete extends Components.HdcAutocomplete, HTMLElement {}
export const HdcAutocomplete: {
  prototype: HdcAutocomplete;
  new (): HdcAutocomplete;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
