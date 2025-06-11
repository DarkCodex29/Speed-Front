import { h } from '@stencil/core';
import { InputType } from '../../../../../src/globals/enums/index';
import { getValueByPath } from '../../../../../src/utils/index';
export class HdcAutocomplete {
  constructor() {
    /**
     * Max height of hdc input autocomplete
     */
    this.maxHeight = 26;
    this.type = InputType.DEFAULT;
    this.value = undefined;
    this.disable = undefined;
    this.lock = undefined;
    this.placeholder = undefined;
    this.items = undefined;
    this.viewItems = 5;
    this.valueKey = 'name';
    this.valueLabel = 'name';
    this.filteredItems = [];
    this.searchText = '';
    this.isToggleDropdown = false;
    this.indexSelected = 0;
  }
  /**
   * Determines whether change value filter options on
   * @param event CustomEvent
   */
  onChangeValueFilterOptions(event) {
    var _a, _b;
    this.searchText = event.detail;
    this.indexSelected = 0;
    if (this.searchText.length > 2) {
      this.filteredItems =
        (_b =
          (_a = this.items) === null || _a === void 0
            ? void 0
            : _a.filter((option) => {
                const label = this.valueLabel && typeof option === 'object' ? option[this.valueLabel] : option;
                return label.toLowerCase().includes(this.searchText.toLowerCase());
              })) !== null && _b !== void 0
          ? _b
          : [];
      this.setToggleDropdown();
    } else {
      this.filteredItems = [];
    }
  }
  /**
   * Determines whether click select option on
   * @param option string
   */
  onClickSelectOption(option) {
    this.value = option;
    this.filteredItems = [];
    this.selectedValue.emit(this.value);
  }
  /**
   * Determines whether clicked icon close on
   */
  onClickedIconClose() {
    this.value = null;
    this.selectedValue.emit(this.value);
    this.indexSelected = 0;
  }
  /**
   * Renders hdc input autocomplete
   * @returns any
   */
  render() {
    return h(
      'div',
      { class: 'hdc-input-autocomplete' },
      h('hdc-input', {
        type: this.type,
        placeholder: this.placeholder,
        disable: this.disable,
        lock: this.lock,
        uppercase: false,
        value: this.getValueKey(),
        onChangeFocus: () => this.setToggleDropdown(),
        onChangeValue: (event) => this.onChangeValueFilterOptions(event),
      }),
      this.value &&
        typeof this.value === 'object' &&
        !this.disable &&
        h(
          'button',
          { class: 'hdc-input-autocomplete-close', onClick: () => this.onClickedIconClose() },
          h(
            'svg',
            { width: '20', height: '20', viewBox: '0 0 24 24', xmlns: 'http://www.w3.org/2000/svg' },
            h('path', {
              'fill': 'none',
              'stroke': 'currentColor',
              'stroke-linecap': 'round',
              'stroke-linejoin': 'round',
              'stroke-width': '1.5',
              'd': 'M6.758 17.243L12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243',
            }),
          ),
        ),
      h(
        'div',
        { class: this.getClassInputAutocompleteContainr() },
        h(
          'ul',
          { class: this.getClassInputAutocomplete(), style: { maxHeight: this.getMaxHeight() } },
          this.filteredItems.map((option, index) =>
            h(
              'li',
              { key: index, class: this.getClassItemFilter(index), onClick: () => this.onClickSelectOption(option) },
              this.getStartTyping(option),
            ),
          ),
        ),
      ),
    );
  }
  handlesBodyClick(ev) {
    if (!ev.composedPath().includes(this.el)) {
      this.isToggleDropdown = false;
      this.indexSelected = 0;
    }
  }
  handleKeyDown(ev) {
    const allowedKeys = ['ArrowDown', 'ArrowUp', 'Enter'];
    if (allowedKeys.includes(ev.key)) {
      let active =
        this.el.querySelector('li.hdc-input-autocomplete-item-active') || this.el.querySelector('ul.hdc-input-autocomplete-options li');
      active === null || active === void 0 ? void 0 : active.classList.remove('hdc-input-autocomplete-item-active');
      if (ev.key === 'ArrowDown') {
        if (this.filteredItems.length > 0 && this.indexSelected < this.filteredItems.length - 1) {
          this.indexSelected = this.indexSelected + 1;
        }
        active = (active === null || active === void 0 ? void 0 : active.nextElementSibling) || active;
      } else if (ev.key === 'ArrowUp') {
        if (this.filteredItems.length > 0 && this.indexSelected > 0) {
          this.indexSelected = this.indexSelected - 1;
        }
        active = (active === null || active === void 0 ? void 0 : active.previousElementSibling) || active;
      } else {
        active = ev.target;
      }
      active === null || active === void 0 ? void 0 : active.classList.add('hdc-input-autocomplete-item-active');
      const container = this.el.querySelector('ul.hdc-input-autocomplete-options');
      const currentOffset =
        this.getOffset(container).top + ((container === null || container === void 0 ? void 0 : container.clientHeight) || 0);
      const nextElement = (active === null || active === void 0 ? void 0 : active.nextElementSibling) || active;
      const nextBottom =
        this.getOffset(nextElement).top + ((nextElement === null || nextElement === void 0 ? void 0 : nextElement.clientHeight) || 0);
      var nextOffset = ((container === null || container === void 0 ? void 0 : container.scrollTop) || 0) + nextBottom - currentOffset;
      container === null || container === void 0 ? void 0 : container.scrollTo({ top: nextOffset });
      if (ev.key === 'Enter') {
        this.onClickSelectOption(this.filteredItems[this.indexSelected]);
      }
    }
  }
  setToggleDropdown() {
    this.isToggleDropdown = this.filteredItems.length > 0;
  }
  /**
   * Gets start typing
   * @param value string | object
   * @returns any
   */
  getStartTyping(value) {
    const label = this.valueLabel && typeof value === 'object' ? value[this.valueLabel] : value;
    return label;
  }
  getStyleKeyboard(index) {
    return {
      'hdc-input-autocomplete-item': true,
      'hdc-input-autocomplete-item-active': index == this.indexSelected,
    };
  }
  /**
   * Gets max height
   * @returns { [key: string]: boolean }
   */
  getMaxHeight() {
    return this.viewItems > 0 ? `${this.maxHeight * this.viewItems}px` : '';
  }
  /**
   * Gets class input autocomplete containr
   * @returns { [key: string]: boolean }
   */
  getClassInputAutocompleteContainr() {
    return {
      'hdc-input-autocomplete-container': true,
      'hdc-input-autocomplete-container--top': false,
      'hdc-input-autocomplete-container--show': this.filteredItems.length > 0,
    };
  }
  /**
   * Gets class input autocomplete
   * @returns { [key: string]: boolean }
   */
  getClassInputAutocomplete() {
    return {
      'hdc-input-autocomplete-options': true,
    };
  }
  getClassItemFilter(index) {
    return {
      'hdc-input-autocomplete-item': true,
      'hdc-input-autocomplete-item-active': index === 0,
    };
  }
  /**
   * Gets value key
   * @returns string
   */
  getValueKey() {
    return this.valueKey && this.value && typeof this.value === 'object'
      ? getValueByPath(this.value, this.valueLabel.split('.'))
      : this.value;
  }
  getOffset(element) {
    if (!element.getClientRects().length) {
      return { top: 0, left: 0 };
    }
    let rect = element.getBoundingClientRect();
    let win = element.ownerDocument.defaultView;
    return {
      top: rect.top + ((win === null || win === void 0 ? void 0 : win.scrollY) || 0),
      left: rect.left + ((win === null || win === void 0 ? void 0 : win.scrollX) || 0),
    };
  }
  static get is() {
    return 'hdc-autocomplete';
  }
  static get originalStyleUrls() {
    return {
      $: ['hdc-autocomplete.scss'],
    };
  }
  static get styleUrls() {
    return {
      $: ['hdc-autocomplete.css'],
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
          text: 'Prop type of hdc input autocomplete',
        },
        attribute: 'type',
        reflect: false,
        defaultValue: 'InputType.DEFAULT',
      },
      value: {
        type: 'string',
        mutable: true,
        complexType: {
          original: 'string | object | null',
          resolved: 'null | object | string',
          references: {},
        },
        required: false,
        optional: false,
        docs: {
          tags: [],
          text: 'Prop value of hdc input autocomplete',
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
          text: 'Prop disable of hdc input autocomplete',
        },
        attribute: 'disable',
        reflect: false,
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
          text: 'Prop lock of hdc input autocomplete',
        },
        attribute: 'lock',
        reflect: false,
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
          text: 'Prop placeholder of hdc input autocomplete',
        },
        attribute: 'placeholder',
        reflect: false,
      },
      items: {
        type: 'unknown',
        mutable: true,
        complexType: {
          original: 'Array<string | object> | undefined',
          resolved: '(string | object)[] | undefined',
          references: {
            Array: {
              location: 'global',
              id: 'global::Array',
            },
          },
        },
        required: false,
        optional: false,
        docs: {
          tags: [],
          text: 'Prop items of hdc input autocomplete',
        },
      },
      viewItems: {
        type: 'number',
        mutable: true,
        complexType: {
          original: 'number',
          resolved: 'number',
          references: {},
        },
        required: false,
        optional: false,
        docs: {
          tags: [],
          text: 'Prop view items of hdc input autocomplete',
        },
        attribute: 'view-items',
        reflect: false,
        defaultValue: '5',
      },
      valueKey: {
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
          text: 'Prop key of hdc input autocomplete',
        },
        attribute: 'value-key',
        reflect: false,
        defaultValue: "'name'",
      },
      valueLabel: {
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
          text: 'Prop string of hdc input autocomplete',
        },
        attribute: 'value-label',
        reflect: false,
        defaultValue: "'name'",
      },
    };
  }
  static get states() {
    return {
      filteredItems: {},
      searchText: {},
      isToggleDropdown: {},
      indexSelected: {},
    };
  }
  static get events() {
    return [
      {
        method: 'selectedValue',
        name: 'selectedValue',
        bubbles: true,
        cancelable: true,
        composed: true,
        docs: {
          tags: [],
          text: 'Event change value of hdc input autocomplete',
        },
        complexType: {
          original: 'string | object | null',
          resolved: 'null | object | string',
          references: {},
        },
      },
    ];
  }
  static get elementRef() {
    return 'el';
  }
  static get listeners() {
    return [
      {
        name: 'click',
        method: 'handlesBodyClick',
        target: 'window',
        capture: false,
        passive: false,
      },
      {
        name: 'keydown',
        method: 'handleKeyDown',
        target: undefined,
        capture: false,
        passive: false,
      },
    ];
  }
}
//# sourceMappingURL=hdc-autocomplete.js.map
