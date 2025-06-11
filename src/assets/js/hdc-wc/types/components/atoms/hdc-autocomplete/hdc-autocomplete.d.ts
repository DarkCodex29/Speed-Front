import { EventEmitter } from '../../../stencil-public-runtime';
import { InputType } from '../../../globals/enums/index';
export declare class HdcAutocomplete {
  /**
   * Element of hdc multiselect
   */
  el: HTMLElement;
  /**
   * Prop type of hdc input autocomplete
   */
  type: InputType;
  /**
   * Prop value of hdc input autocomplete
   */
  value: string | object | null;
  /**
   * Prop disable of hdc input autocomplete
   */
  disable: boolean;
  /**
   * Prop lock of hdc input autocomplete
   */
  lock: boolean;
  /**
   * Prop placeholder of hdc input autocomplete
   */
  placeholder: string;
  /**
   * Prop items of hdc input autocomplete
   */
  items: Array<string | object> | undefined;
  /**
   * Prop view items of hdc input autocomplete
   */
  viewItems: number;
  /**
   * Prop key of hdc input autocomplete
   */
  valueKey: string;
  /**
   * Prop string of hdc input autocomplete
   */
  valueLabel: string;
  /**
   * Event change value of hdc input autocomplete
   */
  selectedValue: EventEmitter<string | object | null>;
  /**
   * State filtered items of hdc input autocomplete
   */
  filteredItems: Array<string | object>;
  /**
   * State search text of hdc input autocomplete
   */
  searchText: string;
  /**
   * State is toggle dropdown of ibk input autocomplete
   */
  isToggleDropdown: boolean;
  /**
   * State is index selected
   */
  indexSelected: number;
  /**
   * Max height of hdc input autocomplete
   */
  maxHeight: number;
  /**
   * Determines whether change value filter options on
   * @param event CustomEvent
   */
  onChangeValueFilterOptions(event: CustomEvent): void;
  /**
   * Determines whether click select option on
   * @param option string
   */
  onClickSelectOption(option: string | object): void;
  /**
   * Determines whether clicked icon close on
   */
  onClickedIconClose(): void;
  /**
   * Renders hdc input autocomplete
   * @returns any
   */
  render(): any;
  handlesBodyClick(ev: Event): void;
  handleKeyDown(ev: KeyboardEvent): void;
  setToggleDropdown(): void;
  /**
   * Gets start typing
   * @param value string | object
   * @returns any
   */
  getStartTyping(value: string | object): any;
  getStyleKeyboard(index: number): {
    'hdc-input-autocomplete-item': boolean;
    'hdc-input-autocomplete-item-active': boolean;
  };
  /**
   * Gets max height
   * @returns { [key: string]: boolean }
   */
  getMaxHeight(): string;
  /**
   * Gets class input autocomplete containr
   * @returns { [key: string]: boolean }
   */
  getClassInputAutocompleteContainr(): {
    'hdc-input-autocomplete-container': boolean;
    'hdc-input-autocomplete-container--top': boolean;
    'hdc-input-autocomplete-container--show': boolean;
  };
  /**
   * Gets class input autocomplete
   * @returns { [key: string]: boolean }
   */
  getClassInputAutocomplete(): {
    'hdc-input-autocomplete-options': boolean;
  };
  getClassItemFilter(index: number): {
    'hdc-input-autocomplete-item': boolean;
    'hdc-input-autocomplete-item-active': boolean;
  };
  /**
   * Gets value key
   * @returns string
   */
  getValueKey(): string;
  private getOffset;
}
