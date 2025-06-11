import { EventEmitter } from '../../../stencil-public-runtime';
import { InputRoleType, InputType } from '../../../globals/enums/index';
export declare class HdcInput {
  /**
   * Element of hdc input
   */
  el: HTMLElement;
  /**
   * Prop type of hdc input
   */
  type: InputType;
  /**
   * Prop roleType of hdc input
   */
  roleType: InputRoleType;
  /**
   * Prop placeholder of hdc input
   */
  placeholder: string;
  /**
   * Prop value of hdc input
   */
  value: string;
  /**
   * Prop disable of hdc input
   */
  disable: boolean;
  /**
   * Prop lock of hdc input
   */
  lock: boolean;
  /**
   * Prop lowercase of hdc input
   */
  lowercase: boolean;
  /**
   * Prop uppercase of hdc input
   */
  uppercase: boolean;
  /**
   * Prop icon left of hdc input
   */
  iconLeft: string;
  /**
   * Prop color icon left of hdc input
   */
  colorIconLeft: string;
  /**
   * Prop is clicked icon left of hdc input
   */
  isClickedIconLeft: boolean;
  /**
   * Prop is letters of hdc input
   */
  isLetters: boolean;
  /**
   * Prop is alpha numeric of hdc input
   */
  isAlphanumeric: boolean;
  /**
   * Prop name of hdc input
   */
  name: string;
  /**
   * Event change value of ibk input
   */
  changeValue: EventEmitter<string>;
  /**
   * Event change blur of ibk input
   */
  changeBlur: EventEmitter<FocusEvent>;
  /**
   * Event change keydown of ibk input
   */
  changeKeydown: EventEmitter<KeyboardEvent>;
  /**
   * Event change keyup of ibk input
   */
  changeKeyup: EventEmitter<KeyboardEvent>;
  /**
   * Event change focus of ibk input
   */
  changeFocus: EventEmitter<FocusEvent>;
  /**
   * Event change keyenter of ibk input
   */
  changeEnter: EventEmitter;
  /**
   * Event clicked icon of hdc input
   */
  clickedIcon: EventEmitter<'LEFT' | 'RIGHT'>;
  /**
   * Regex only letters of hdc input
   */
  private regexLetters;
  /**
   * Regex alphanumeric of hdc input
   */
  private regexAlphanumeric;
  render(): any;
  /**
   * Determines whether input text on
   * @param input Event
   */
  onInputText(input: InputEvent): void;
  /**
   * Determines whether blur input on
   * @param event FocusEvent
   */
  onBlurInput(event: FocusEvent): void;
  /**
   * Determines whether focus input on
   * @param event FocusEvent
   */
  onFocusInput(event: FocusEvent): void;
  /**
   * Determines whether keydown input on
   * @param event KeyboardEvent
   */
  onKeydownInput(event: KeyboardEvent): void;
  /**
   * Determines whether keyup input on
   * @param evemt KeyboardEvent
   */
  onKeyupInput(event: KeyboardEvent): void;
  isValidateKey(event: KeyboardEvent): boolean;
  preventDefault(event: KeyboardEvent): boolean;
  /**
   * Gets class wrapper
   * @returns { [key: string]: boolean }
   */
  getClassWrapper(): {
    [x: string]: boolean;
    'hdc-input-wrapper': boolean;
    'hdc-input-wrapper--icon-left': boolean;
  };
  /**
   * Gets class icon left
   * @returns { [key: string]: boolean }
   */
  getClassIconLeft(): {
    [x: string]: boolean;
    'hdc-icon': boolean;
  };
  /**
   * Gets class input icon left
   * @returns { [key: string]: boolean }
   */
  getClassInputIconLeft(): {
    'hdc-input-icon-left': boolean;
    'hdc-input-icon-left--pointer': boolean;
  };
}
