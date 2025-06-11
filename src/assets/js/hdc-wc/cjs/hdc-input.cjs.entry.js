'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-3b10f428.js');
const inputRoleType = require('./input-role-type-c397d891.js');
const utils = require('./utils-ef5b10d0.js');

const hdcInputCss =
  '.hdc-input-wrapper{width:100%;-webkit-box-sizing:border-box;box-sizing:border-box;font-family:sans-serif;font-weight:500;line-height:22px;font-size:0.875rem;letter-spacing:0.02em;position:relative}.hdc-input-wrapper--success .hdc-input__input{border-color:rgb(1, 180, 1)}.hdc-input-wrapper--danger .hdc-input__input{border-color:rgb(214, 30, 30)}.hdc-input-wrapper--warning .hdc-input__input{border-color:rgb(209, 209, 20)}.hdc-input-wrapper--icon-right .hdc-input__input,.hdc-input-wrapper--icon-left .hdc-input__input{padding-left:1.65rem}.hdc-input-icon-left,.hdc-input-icon-right{position:absolute;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;bottom:0;top:0;font-size:14px;padding:10px}.hdc-input-icon-left--pointer,.hdc-input-icon-right--pointer{cursor:pointer}.hdc-input-icon-left{left:0}.hdc-input-icon-right{right:0}.hdc-input__input{display:block;-webkit-box-sizing:border-box;box-sizing:border-box;width:100%;padding:0.3rem 1.5rem 0.3rem 0.5rem;font-size:0.8rem;font-weight:400;line-height:1.5;color:#8a92a6;background-color:#fff;-webkit-background-clip:padding-box;background-clip:padding-box;border:1px solid #eee;-webkit-appearance:none;-moz-appearance:none;appearance:none;-webkit-border-radius:0.25rem;border-radius:0.25rem;-webkit-box-shadow:0 0 0 0;box-shadow:0 0 0 0;-webkit-transition:border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;transition:border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;-o-transition:border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;transition:border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;transition:border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out}.hdc-input__input:disabled{background-color:#e9ecef;cursor:auto}';

const HdcInput = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.changeValue = index.createEvent(this, 'changeValue', 7);
    this.changeBlur = index.createEvent(this, 'changeBlur', 7);
    this.changeKeydown = index.createEvent(this, 'changeKeydown', 7);
    this.changeKeyup = index.createEvent(this, 'changeKeyup', 7);
    this.changeFocus = index.createEvent(this, 'changeFocus', 7);
    this.changeEnter = index.createEvent(this, 'changeEnter', 7);
    this.clickedIcon = index.createEvent(this, 'clickedIcon', 7);
    /**
     * Regex only letters of hdc input
     */
    this.regexLetters = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/;
    /**
     * Regex alphanumeric of hdc input
     */
    this.regexAlphanumeric = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s\d]+$/;
    this.type = inputRoleType.InputType.DEFAULT;
    this.roleType = inputRoleType.InputRoleType.TEXT;
    this.placeholder = '';
    this.value = undefined;
    this.disable = false;
    this.lock = false;
    this.lowercase = false;
    this.uppercase = true;
    this.iconLeft = undefined;
    this.colorIconLeft = 'dark-charcoal';
    this.isClickedIconLeft = undefined;
    this.isLetters = undefined;
    this.isAlphanumeric = undefined;
    this.name = undefined;
  }
  render() {
    return index.h(
      'div',
      { class: this.getClassWrapper() },
      this.iconLeft &&
        index.h(
          'div',
          { class: this.getClassInputIconLeft(), onClick: () => this.clickedIcon.emit('LEFT') },
          index.h('i', { class: this.getClassIconLeft() }),
        ),
      index.h('input', {
        type: this.roleType,
        class: 'hdc-input__input',
        placeholder: this.placeholder,
        name: this.name,
        id: this.name,
        value: this.value,
        onInput: (ev) => this.onInputText(ev),
        onBlur: (ev) => this.onBlurInput(ev),
        onFocus: (ev) => this.onFocusInput(ev),
        onKeyDown: (ev) => this.onKeydownInput(ev),
        onKeyUp: (ev) => this.onKeyupInput(ev),
        disabled: this.disable || this.lock,
      }),
    );
  }
  /**
   * Determines whether input text on
   * @param input Event
   */
  onInputText(input) {
    const element = input.target;
    let value = element.value;
    if (this.lowercase || this.uppercase) {
      value = utils.removeDoubleSpaces(!this.lowercase ? value.toUpperCase() : value.toLowerCase());
    }
    if (input.data === '. ') {
      value = value.replace(/\. /g, ' ');
    }
    element.value = value;
    this.changeValue.emit(utils.removeDoubleSpaces(element.value));
  }
  /**
   * Determines whether blur input on
   * @param event FocusEvent
   */
  onBlurInput(event) {
    this.changeBlur.emit(event);
  }
  /**
   * Determines whether focus input on
   * @param event FocusEvent
   */
  onFocusInput(event) {
    this.changeFocus.emit(event);
  }
  /**
   * Determines whether keydown input on
   * @param event KeyboardEvent
   */
  onKeydownInput(event) {
    if (this.isValidateKey(event)) {
      this.changeKeydown.emit(event);
    } else {
      return;
    }
  }
  /**
   * Determines whether keyup input on
   * @param evemt KeyboardEvent
   */
  onKeyupInput(event) {
    if (this.isValidateKey(event)) {
      this.changeKeyup.emit(event);
    } else {
      return;
    }
  }
  isValidateKey(event) {
    const updateValue = utils.getPresentValue(event);
    if (this.isLetters && !this.regexLetters.test(updateValue)) {
      this.preventDefault(event);
      return false;
    }
    if (this.isAlphanumeric && !this.regexAlphanumeric.test(updateValue)) {
      this.preventDefault(event);
      return false;
    }
    return true;
  }
  preventDefault(event) {
    event.preventDefault();
    return false;
  }
  /**
   * Gets class wrapper
   * @returns { [key: string]: boolean }
   */
  getClassWrapper() {
    return {
      'hdc-input-wrapper': true,
      [`hdc-input-wrapper--${this.type}`]: true,
      [`hdc-input-wrapper--icon-left`]: !!this.iconLeft,
    };
  }
  /**
   * Gets class icon left
   * @returns { [key: string]: boolean }
   */
  getClassIconLeft() {
    return {
      'hdc-icon': true,
      [`hdc-icon-${this.iconLeft}`]: !!this.iconLeft,
      [`color-${this.colorIconLeft}`]: !!this.colorIconLeft,
    };
  }
  /**
   * Gets class input icon left
   * @returns { [key: string]: boolean }
   */
  getClassInputIconLeft() {
    return {
      'hdc-input-icon-left': true,
      'hdc-input-icon-left--pointer': this.isClickedIconLeft,
    };
  }
  get el() {
    return index.getElement(this);
  }
};
HdcInput.style = hdcInputCss;

exports.hdc_input = HdcInput;

//# sourceMappingURL=hdc-input.cjs.entry.js.map
