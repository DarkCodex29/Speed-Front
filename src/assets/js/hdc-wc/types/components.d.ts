/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from './stencil-public-runtime';
import { InputRoleType, InputType } from './globals/enums/index';
export { InputRoleType, InputType } from './globals/enums/index';
export namespace Components {
  interface HdcAutocomplete {
    /**
     * Prop disable of hdc input autocomplete
     */
    disable: boolean;
    /**
     * Prop items of hdc input autocomplete
     */
    items: Array<string | object> | undefined;
    /**
     * Prop lock of hdc input autocomplete
     */
    lock: boolean;
    /**
     * Prop placeholder of hdc input autocomplete
     */
    placeholder: string;
    /**
     * Prop type of hdc input autocomplete
     */
    type: InputType;
    /**
     * Prop value of hdc input autocomplete
     */
    value: string | object | null;
    /**
     * Prop key of hdc input autocomplete
     */
    valueKey: string;
    /**
     * Prop string of hdc input autocomplete
     */
    valueLabel: string;
    /**
     * Prop view items of hdc input autocomplete
     */
    viewItems: number;
  }
  interface HdcInput {
    /**
     * Prop color icon left of hdc input
     */
    colorIconLeft: string;
    /**
     * Prop disable of hdc input
     */
    disable: boolean;
    /**
     * Prop icon left of hdc input
     */
    iconLeft: string;
    /**
     * Prop is alpha numeric of hdc input
     */
    isAlphanumeric: boolean;
    /**
     * Prop is clicked icon left of hdc input
     */
    isClickedIconLeft: boolean;
    /**
     * Prop is letters of hdc input
     */
    isLetters: boolean;
    /**
     * Prop lock of hdc input
     */
    lock: boolean;
    /**
     * Prop lowercase of hdc input
     */
    lowercase: boolean;
    /**
     * Prop name of hdc input
     */
    name: string;
    /**
     * Prop placeholder of hdc input
     */
    placeholder: string;
    /**
     * Prop roleType of hdc input
     */
    roleType: InputRoleType;
    /**
     * Prop type of hdc input
     */
    type: InputType;
    /**
     * Prop uppercase of hdc input
     */
    uppercase: boolean;
    /**
     * Prop value of hdc input
     */
    value: string;
  }
  interface HdcMultiselect {
    /**
     * Prop disable of hdc multiselect
     */
    disable: boolean;
    /**
     * Prop items of hdc multiselect
     */
    items: Array<string | object> | undefined;
    /**
     * Prop lock of hdc multiselect
     */
    lock: boolean;
    /**
     * Determines whether input text on
     * @param input Event
     */
    onInputText: (input: InputEvent) => Promise<void>;
    /**
     * Prop value of hdc multiselect
     */
    value: Array<string | object> | null;
    /**
     * Prop key of hdc multiselect
     */
    valueKey: string;
    /**
     * Prop string of hdc multiselect
     */
    valueLabel: string;
    /**
     * Prop view items of hdc multiselect
     */
    viewItems: number;
  }
  interface HdcSelect {
    /**
     * Prop disable of hdc select
     */
    disable: boolean;
    /**
     * Prop items of hdc select
     */
    items: Array<string | object> | undefined;
    /**
     * Prop lock of hdc select
     */
    lock: boolean;
    /**
     * Prop placeholder of hdc select
     */
    placeholder: string;
    /**
     * Prop value of hdc select
     */
    value: string | number | object | null;
    /**
     * Prop key of hdc select
     */
    valueKey: string;
    /**
     * Prop string of hdc select
     */
    valueLabel: string;
    /**
     * Prop view items of hdc select
     */
    viewItems: number;
  }
  interface MyComponent {
    /**
     * The first name
     */
    first: string;
    /**
     * The last name
     */
    last: string;
    /**
     * The middle name
     */
    middle: string;
  }
}
export interface HdcAutocompleteCustomEvent<T> extends CustomEvent<T> {
  detail: T;
  target: HTMLHdcAutocompleteElement;
}
export interface HdcInputCustomEvent<T> extends CustomEvent<T> {
  detail: T;
  target: HTMLHdcInputElement;
}
export interface HdcMultiselectCustomEvent<T> extends CustomEvent<T> {
  detail: T;
  target: HTMLHdcMultiselectElement;
}
export interface HdcSelectCustomEvent<T> extends CustomEvent<T> {
  detail: T;
  target: HTMLHdcSelectElement;
}
declare global {
  interface HTMLHdcAutocompleteElement extends Components.HdcAutocomplete, HTMLStencilElement {}
  var HTMLHdcAutocompleteElement: {
    prototype: HTMLHdcAutocompleteElement;
    new (): HTMLHdcAutocompleteElement;
  };
  interface HTMLHdcInputElement extends Components.HdcInput, HTMLStencilElement {}
  var HTMLHdcInputElement: {
    prototype: HTMLHdcInputElement;
    new (): HTMLHdcInputElement;
  };
  interface HTMLHdcMultiselectElement extends Components.HdcMultiselect, HTMLStencilElement {}
  var HTMLHdcMultiselectElement: {
    prototype: HTMLHdcMultiselectElement;
    new (): HTMLHdcMultiselectElement;
  };
  interface HTMLHdcSelectElement extends Components.HdcSelect, HTMLStencilElement {}
  var HTMLHdcSelectElement: {
    prototype: HTMLHdcSelectElement;
    new (): HTMLHdcSelectElement;
  };
  interface HTMLMyComponentElement extends Components.MyComponent, HTMLStencilElement {}
  var HTMLMyComponentElement: {
    prototype: HTMLMyComponentElement;
    new (): HTMLMyComponentElement;
  };
  interface HTMLElementTagNameMap {
    'hdc-autocomplete': HTMLHdcAutocompleteElement;
    'hdc-input': HTMLHdcInputElement;
    'hdc-multiselect': HTMLHdcMultiselectElement;
    'hdc-select': HTMLHdcSelectElement;
    'my-component': HTMLMyComponentElement;
  }
}
declare namespace LocalJSX {
  interface HdcAutocomplete {
    /**
     * Prop disable of hdc input autocomplete
     */
    disable?: boolean;
    /**
     * Prop items of hdc input autocomplete
     */
    items?: Array<string | object> | undefined;
    /**
     * Prop lock of hdc input autocomplete
     */
    lock?: boolean;
    /**
     * Event change value of hdc input autocomplete
     */
    onSelectedValue?: (event: HdcAutocompleteCustomEvent<string | object | null>) => void;
    /**
     * Prop placeholder of hdc input autocomplete
     */
    placeholder?: string;
    /**
     * Prop type of hdc input autocomplete
     */
    type?: InputType;
    /**
     * Prop value of hdc input autocomplete
     */
    value?: string | object | null;
    /**
     * Prop key of hdc input autocomplete
     */
    valueKey?: string;
    /**
     * Prop string of hdc input autocomplete
     */
    valueLabel?: string;
    /**
     * Prop view items of hdc input autocomplete
     */
    viewItems?: number;
  }
  interface HdcInput {
    /**
     * Prop color icon left of hdc input
     */
    colorIconLeft?: string;
    /**
     * Prop disable of hdc input
     */
    disable?: boolean;
    /**
     * Prop icon left of hdc input
     */
    iconLeft?: string;
    /**
     * Prop is alpha numeric of hdc input
     */
    isAlphanumeric?: boolean;
    /**
     * Prop is clicked icon left of hdc input
     */
    isClickedIconLeft?: boolean;
    /**
     * Prop is letters of hdc input
     */
    isLetters?: boolean;
    /**
     * Prop lock of hdc input
     */
    lock?: boolean;
    /**
     * Prop lowercase of hdc input
     */
    lowercase?: boolean;
    /**
     * Prop name of hdc input
     */
    name?: string;
    /**
     * Event change blur of ibk input
     */
    onChangeBlur?: (event: HdcInputCustomEvent<FocusEvent>) => void;
    /**
     * Event change keyenter of ibk input
     */
    onChangeEnter?: (event: HdcInputCustomEvent<any>) => void;
    /**
     * Event change focus of ibk input
     */
    onChangeFocus?: (event: HdcInputCustomEvent<FocusEvent>) => void;
    /**
     * Event change keydown of ibk input
     */
    onChangeKeydown?: (event: HdcInputCustomEvent<KeyboardEvent>) => void;
    /**
     * Event change keyup of ibk input
     */
    onChangeKeyup?: (event: HdcInputCustomEvent<KeyboardEvent>) => void;
    /**
     * Event change value of ibk input
     */
    onChangeValue?: (event: HdcInputCustomEvent<string>) => void;
    /**
     * Event clicked icon of hdc input
     */
    onClickedIcon?: (event: HdcInputCustomEvent<'LEFT' | 'RIGHT'>) => void;
    /**
     * Prop placeholder of hdc input
     */
    placeholder?: string;
    /**
     * Prop roleType of hdc input
     */
    roleType?: InputRoleType;
    /**
     * Prop type of hdc input
     */
    type?: InputType;
    /**
     * Prop uppercase of hdc input
     */
    uppercase?: boolean;
    /**
     * Prop value of hdc input
     */
    value?: string;
  }
  interface HdcMultiselect {
    /**
     * Prop disable of hdc multiselect
     */
    disable?: boolean;
    /**
     * Prop items of hdc multiselect
     */
    items?: Array<string | object> | undefined;
    /**
     * Prop lock of hdc multiselect
     */
    lock?: boolean;
    /**
     * Event change value of hdc multiselect
     */
    onChangeValue?: (event: HdcMultiselectCustomEvent<string | object | null>) => void;
    /**
     * Prop value of hdc multiselect
     */
    value?: Array<string | object> | null;
    /**
     * Prop key of hdc multiselect
     */
    valueKey?: string;
    /**
     * Prop string of hdc multiselect
     */
    valueLabel?: string;
    /**
     * Prop view items of hdc multiselect
     */
    viewItems?: number;
  }
  interface HdcSelect {
    /**
     * Prop disable of hdc select
     */
    disable?: boolean;
    /**
     * Prop items of hdc select
     */
    items?: Array<string | object> | undefined;
    /**
     * Prop lock of hdc select
     */
    lock?: boolean;
    onChangeBlur?: (event: HdcSelectCustomEvent<any>) => void;
    onChangeValue?: (event: HdcSelectCustomEvent<any>) => void;
    /**
     * Prop placeholder of hdc select
     */
    placeholder?: string;
    /**
     * Prop value of hdc select
     */
    value?: string | number | object | null;
    /**
     * Prop key of hdc select
     */
    valueKey?: string;
    /**
     * Prop string of hdc select
     */
    valueLabel?: string;
    /**
     * Prop view items of hdc select
     */
    viewItems?: number;
  }
  interface MyComponent {
    /**
     * The first name
     */
    first?: string;
    /**
     * The last name
     */
    last?: string;
    /**
     * The middle name
     */
    middle?: string;
  }
  interface IntrinsicElements {
    'hdc-autocomplete': HdcAutocomplete;
    'hdc-input': HdcInput;
    'hdc-multiselect': HdcMultiselect;
    'hdc-select': HdcSelect;
    'my-component': MyComponent;
  }
}
export { LocalJSX as JSX };
declare module '@stencil/core' {
  export namespace JSX {
    interface IntrinsicElements {
      'hdc-autocomplete': LocalJSX.HdcAutocomplete & JSXBase.HTMLAttributes<HTMLHdcAutocompleteElement>;
      'hdc-input': LocalJSX.HdcInput & JSXBase.HTMLAttributes<HTMLHdcInputElement>;
      'hdc-multiselect': LocalJSX.HdcMultiselect & JSXBase.HTMLAttributes<HTMLHdcMultiselectElement>;
      'hdc-select': LocalJSX.HdcSelect & JSXBase.HTMLAttributes<HTMLHdcSelectElement>;
      'my-component': LocalJSX.MyComponent & JSXBase.HTMLAttributes<HTMLMyComponentElement>;
    }
  }
}
