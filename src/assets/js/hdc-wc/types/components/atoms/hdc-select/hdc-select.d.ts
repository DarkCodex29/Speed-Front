import { Modelable } from '../../../globals/interfaces/index';
import { EventEmitter } from '../../../stencil-public-runtime';
export declare class HdcSelect implements Modelable {
  /**
   * Element of hdc select
   */
  el: HTMLElement;
  /**
   * Prop value of hdc select
   */
  value: string | number | object | null;
  /**
   * Prop disable of hdc select
   */
  disable: boolean;
  /**
   * Prop lock of hdc select
   */
  lock: boolean;
  /**
   * Prop items of hdc select
   */
  items: Array<string | object> | undefined;
  /**
   * Prop view items of hdc select
   */
  viewItems: number;
  /**
   * Prop placeholder of hdc select
   */
  placeholder: string;
  /**
   * Prop key of hdc select
   */
  valueKey: string;
  /**
   * Prop string of hdc select
   */
  valueLabel: string;
  /**
   * State filtered items of hdc select
   */
  filteredItems: Array<string | object>;
  /**
   * State search text of hdc select
   */
  searchText: string;
  /**
   * State search text of hdc select
   */
  showDrop: boolean;
  changeBlur: EventEmitter;
  changeValue: EventEmitter;
  /**
   * Max height of hdc select
   */
  maxHeight: number;
  /**
   * Determines whether change value filter options on
   * @param event CustomEvent
   */
  onChangeValueFilterOptions(event: string): void;
  /**
   * Determines whether click select option on
   * @param option string
   */
  onClickSelectOption(option: string | object | null): void;
  handleOnClick(ev: any): void;
  render(): any;
  toggleDrop(): void;
  /**
   * Determines whether input text on
   * @param input Event
   */
  onInputText(input: InputEvent): void;
  clearInputSearch(): void;
  /**
   * Gets max height
   * @returns { [key: string]: boolean }
   */
  getMaxHeight(): string;
  /**
   * Gets class select container
   * @returns { [key: string]: boolean }
   */
  getClassInputAutocompleteContainer(): {
    'hdc-select-container': boolean;
    'hdc-select-container--top': boolean;
    'show': boolean;
  };
  /**
   * Gets class select
   * @returns { [key: string]: boolean }
   */
  getClassInputAutocomplete(): {
    'hdc-select-options': boolean;
  };
  /**
   * Gets class select
   * @returns { [key: string]: boolean }
   */
  getClassSelectValue(): {
    'hdc-select-value': boolean;
    'disabled': boolean;
    'show': boolean;
  };
  /**
   * Gets value key
   * @returns string
   */
  getValueKey(): string;
}
