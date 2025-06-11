import { h } from '@stencil/core';
import { InputRoleType, InputType } from '../../../../../src/globals/enums/index';
import { getPresentValue, removeDoubleSpaces } from '../../../../../src/utils/index';
export class HdcInput {
  constructor() {
    /**
     * Regex only letters of hdc input
     */
    this.regexLetters = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/;
    /**
     * Regex alphanumeric of hdc input
     */
    this.regexAlphanumeric = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s\d]+$/;
    this.type = InputType.DEFAULT;
    this.roleType = InputRoleType.TEXT;
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
    return h(
      'div',
      { class: this.getClassWrapper() },
      this.iconLeft &&
        h(
          'div',
          { class: this.getClassInputIconLeft(), onClick: () => this.clickedIcon.emit('LEFT') },
          h('i', { class: this.getClassIconLeft() }),
        ),
      h('input', {
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
      value = removeDoubleSpaces(!this.lowercase ? value.toUpperCase() : value.toLowerCase());
    }
    if (input.data === '. ') {
      value = value.replace(/\. /g, ' ');
    }
    element.value = value;
    this.changeValue.emit(removeDoubleSpaces(element.value));
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
    const updateValue = getPresentValue(event);
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
  static get is() {
    return 'hdc-input';
  }
  static get originalStyleUrls() {
    return {
      $: ['hdc-input.scss'],
    };
  }
  static get styleUrls() {
    return {
      $: ['hdc-input.css'],
    };
  }
  static get properties() {
    return {
      type: {
        type: 'string',
        mutable: false,
        complexType: {
          original: 'InputType',
          resolved: 'InputType.DANGER | InputType.DEFAULT | InputType.SUCCESS | InputType.WARNING',
          references: {
            InputType: {
              location: 'import',
              path: '@globals/enums',
              id: 'src/globals/enums/index.ts::InputType',
            },
          },
        },
        required: false,
        optional: false,
        docs: {
          tags: [],
          text: 'Prop type of hdc input',
        },
        attribute: 'type',
        reflect: false,
        defaultValue: 'InputType.DEFAULT',
      },
      roleType: {
        type: 'string',
        mutable: false,
        complexType: {
          original: 'InputRoleType',
          resolved: 'InputRoleType.PASSWORD | InputRoleType.TEXT',
          references: {
            InputRoleType: {
              location: 'import',
              path: '@globals/enums',
              id: 'src/globals/enums/index.ts::InputRoleType',
            },
          },
        },
        required: false,
        optional: false,
        docs: {
          tags: [],
          text: 'Prop roleType of hdc input',
        },
        attribute: 'role-type',
        reflect: false,
        defaultValue: 'InputRoleType.TEXT',
      },
      placeholder: {
        type: 'string',
        mutable: false,
        complexType: {
          original: 'string',
          resolved: 'string',
          references: {},
        },
        required: false,
        optional: false,
        docs: {
          tags: [],
          text: 'Prop placeholder of hdc input',
        },
        attribute: 'placeholder',
        reflect: false,
        defaultValue: "''",
      },
      value: {
        type: 'string',
        mutable: true,
        complexType: {
          original: 'string',
          resolved: 'string',
          references: {},
        },
        required: false,
        optional: false,
        docs: {
          tags: [],
          text: 'Prop value of hdc input',
        },
        attribute: 'value',
        reflect: false,
      },
      disable: {
        type: 'boolean',
        mutable: true,
        complexType: {
          original: 'boolean',
          resolved: 'boolean',
          references: {},
        },
        required: false,
        optional: false,
        docs: {
          tags: [],
          text: 'Prop disable of hdc input',
        },
        attribute: 'disable',
        reflect: false,
        defaultValue: 'false',
      },
      lock: {
        type: 'boolean',
        mutable: true,
        complexType: {
          original: 'boolean',
          resolved: 'boolean',
          references: {},
        },
        required: false,
        optional: false,
        docs: {
          tags: [],
          text: 'Prop lock of hdc input',
        },
        attribute: 'lock',
        reflect: false,
        defaultValue: 'false',
      },
      lowercase: {
        type: 'boolean',
        mutable: true,
        complexType: {
          original: 'boolean',
          resolved: 'boolean',
          references: {},
        },
        required: false,
        optional: false,
        docs: {
          tags: [],
          text: 'Prop lowercase of hdc input',
        },
        attribute: 'lowercase',
        reflect: false,
        defaultValue: 'false',
      },
      uppercase: {
        type: 'boolean',
        mutable: true,
        complexType: {
          original: 'boolean',
          resolved: 'boolean',
          references: {},
        },
        required: false,
        optional: false,
        docs: {
          tags: [],
          text: 'Prop uppercase of hdc input',
        },
        attribute: 'uppercase',
        reflect: false,
        defaultValue: 'true',
      },
      iconLeft: {
        type: 'string',
        mutable: true,
        complexType: {
          original: 'string',
          resolved: 'string',
          references: {},
        },
        required: false,
        optional: false,
        docs: {
          tags: [],
          text: 'Prop icon left of hdc input',
        },
        attribute: 'icon-left',
        reflect: false,
      },
      colorIconLeft: {
        type: 'string',
        mutable: true,
        complexType: {
          original: 'string',
          resolved: 'string',
          references: {},
        },
        required: false,
        optional: false,
        docs: {
          tags: [],
          text: 'Prop color icon left of hdc input',
        },
        attribute: 'color-icon-left',
        reflect: false,
        defaultValue: "'dark-charcoal'",
      },
      isClickedIconLeft: {
        type: 'boolean',
        mutable: true,
        complexType: {
          original: 'boolean',
          resolved: 'boolean',
          references: {},
        },
        required: false,
        optional: false,
        docs: {
          tags: [],
          text: 'Prop is clicked icon left of hdc input',
        },
        attribute: 'is-clicked-icon-left',
        reflect: false,
      },
      isLetters: {
        type: 'boolean',
        mutable: false,
        complexType: {
          original: 'boolean',
          resolved: 'boolean',
          references: {},
        },
        required: false,
        optional: false,
        docs: {
          tags: [],
          text: 'Prop is letters of hdc input',
        },
        attribute: 'is-letters',
        reflect: false,
      },
      isAlphanumeric: {
        type: 'boolean',
        mutable: false,
        complexType: {
          original: 'boolean',
          resolved: 'boolean',
          references: {},
        },
        required: false,
        optional: false,
        docs: {
          tags: [],
          text: 'Prop is alpha numeric of hdc input',
        },
        attribute: 'is-alphanumeric',
        reflect: false,
      },
      name: {
        type: 'string',
        mutable: false,
        complexType: {
          original: 'string',
          resolved: 'string',
          references: {},
        },
        required: false,
        optional: false,
        docs: {
          tags: [],
          text: 'Prop name of hdc input',
        },
        attribute: 'name',
        reflect: false,
      },
    };
  }
  static get events() {
    return [
      {
        method: 'changeValue',
        name: 'changeValue',
        bubbles: true,
        cancelable: true,
        composed: true,
        docs: {
          tags: [],
          text: 'Event change value of ibk input',
        },
        complexType: {
          original: 'string',
          resolved: 'string',
          references: {},
        },
      },
      {
        method: 'changeBlur',
        name: 'changeBlur',
        bubbles: true,
        cancelable: true,
        composed: true,
        docs: {
          tags: [],
          text: 'Event change blur of ibk input',
        },
        complexType: {
          original: 'FocusEvent',
          resolved: 'FocusEvent',
          references: {
            FocusEvent: {
              location: 'global',
              id: 'global::FocusEvent',
            },
          },
        },
      },
      {
        method: 'changeKeydown',
        name: 'changeKeydown',
        bubbles: true,
        cancelable: true,
        composed: true,
        docs: {
          tags: [],
          text: 'Event change keydown of ibk input',
        },
        complexType: {
          original: 'KeyboardEvent',
          resolved: 'KeyboardEvent',
          references: {
            KeyboardEvent: {
              location: 'global',
              id: 'global::KeyboardEvent',
            },
          },
        },
      },
      {
        method: 'changeKeyup',
        name: 'changeKeyup',
        bubbles: true,
        cancelable: true,
        composed: true,
        docs: {
          tags: [],
          text: 'Event change keyup of ibk input',
        },
        complexType: {
          original: 'KeyboardEvent',
          resolved: 'KeyboardEvent',
          references: {
            KeyboardEvent: {
              location: 'global',
              id: 'global::KeyboardEvent',
            },
          },
        },
      },
      {
        method: 'changeFocus',
        name: 'changeFocus',
        bubbles: true,
        cancelable: true,
        composed: true,
        docs: {
          tags: [],
          text: 'Event change focus of ibk input',
        },
        complexType: {
          original: 'FocusEvent',
          resolved: 'FocusEvent',
          references: {
            FocusEvent: {
              location: 'global',
              id: 'global::FocusEvent',
            },
          },
        },
      },
      {
        method: 'changeEnter',
        name: 'changeEnter',
        bubbles: true,
        cancelable: true,
        composed: true,
        docs: {
          tags: [],
          text: 'Event change keyenter of ibk input',
        },
        complexType: {
          original: 'any',
          resolved: 'any',
          references: {},
        },
      },
      {
        method: 'clickedIcon',
        name: 'clickedIcon',
        bubbles: true,
        cancelable: true,
        composed: true,
        docs: {
          tags: [],
          text: 'Event clicked icon of hdc input',
        },
        complexType: {
          original: "'LEFT' | 'RIGHT'",
          resolved: '"LEFT" | "RIGHT"',
          references: {},
        },
      },
    ];
  }
  static get elementRef() {
    return 'el';
  }
}
//# sourceMappingURL=hdc-input.js.map
