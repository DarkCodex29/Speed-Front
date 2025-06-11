import { EventEmitter } from '../../../stencil-public-runtime';
export declare class HdcMultiselect {
  /**
   * Element of hdc multiselect
   */
  el: HTMLElement;
  /**
   * Prop value of hdc multiselect
   */
  value: Array<string | object> | null;
  /**
   * Prop disable of hdc multiselect
   */
  disable: boolean;
  /**
   * Prop lock of hdc multiselect
   */
  lock: boolean;
  /**
   * Prop items of hdc multiselect
   */
  items: Array<string | object> | undefined;
  /**
   * Prop view items of hdc multiselect
   */
  viewItems: number;
  /**
   * Prop key of hdc multiselect
   */
  valueKey: string;
  /**
   * Prop string of hdc multiselect
   */
  valueLabel: string;
  /**
   * State filtered items of hdc multiselect
   */
  filteredItems: Array<string | object>;
  /**
   * State search text of hdc multiselect
   */
  searchText: string;
  /**
   * State search text of hdc multiselect
   */
  valueOptions: Array<string | object> | null;
  /**
   * State search text of hdc multiselect
   */
  showDrop: boolean;
  /**
   * State search text of hdc multiselect
   */
  isSelectAll: boolean;
  /**
   * Event change value of hdc multiselect
   */
  changeValue: EventEmitter<string | object | null>;
  /**
   * Max height of hdc multiselect
   */
  maxHeight: number;
  /**
   * Determines whether change value filter options on
   * @param event CustomEvent
   */
  componentWillUpdate(): void;
  onChangeValueFilterOptions(event: string): void;
  /**
   * Determines whether click select option on
   * @param option string
   */
  onClickSelectOption(option: string | object): void;
  handleOnClick(ev: any): void;
  render(): any;
  toggleDrop(): void;
  selectAllOptions(): void;
  /**
   * Determines whether input text on
   * @param input Event
   */
  onInputText(input: InputEvent): Promise<void>;
  /**
   * Gets value text
   * @returns string
   */
  getValueText(): string;
  /**
   * Gets max height
   * @returns { [key: string]: boolean }
   */
  getMaxHeight(): string;
  /**
   * Gets class multiselect container
   * @returns { [key: string]: boolean }
   */
  getClassInputAutocompleteContainer(): {
    'hdc-multiselect-container': boolean;
    'hdc-multiselect-container--top': boolean;
    'show': boolean;
  };
  /**
   * Gets class multiselect
   * @returns { [key: string]: boolean }
   */
  getClassInputAutocomplete(): {
    'hdc-multiselect-options': boolean;
  };
}
