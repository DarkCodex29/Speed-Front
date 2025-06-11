import { h } from '@stencil/core';
import { getValueByPath } from '../../../../../src/utils/index';
export class HdcSelect {
  constructor() {
    /**
     * Max height of hdc select
     */
    this.maxHeight = 20;
    this.value = undefined;
    this.disable = undefined;
    this.lock = undefined;
    this.items = undefined;
    this.viewItems = 8;
    this.placeholder = '-- Seleccione --';
    this.valueKey = 'id';
    this.valueLabel = 'name';
    this.filteredItems = [];
    this.searchText = '';
    this.showDrop = false;
  }
  /**
   * Determines whether change value filter options on
   * @param event CustomEvent
   */
  onChangeValueFilterOptions(event) {
    var _a, _b;
    this.searchText = event;
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
  }
  /**
   * Determines whether click select option on
   * @param option string
   */
  onClickSelectOption(option) {
    this.value = this.valueKey && option && typeof option === 'object' ? option[this.valueKey] : option;
    this.filteredItems = [];
    this.toggleDrop();
    this.clearInputSearch();
    this.changeValue.emit(this.value);
    this.el.blur();
  }
  handleOnClick(ev) {
    if (this.showDrop) {
      if (this.el.contains(ev.target)) {
        // If click was inside, stop here
        return;
      }
      this.showDrop = false;
      this.clearInputSearch();
      this.changeBlur.emit(ev);
    }
  }
  render() {
    return h(
      'div',
      { class: 'hdc-select' },
      h(
        'div',
        { class: this.getClassSelectValue(), onClick: () => this.toggleDrop() },
        h('span', { class: 'hdc-select-value-text' }, this.getValueKey()),
        h(
          'span',
          { class: 'hdc-select-value-icon' },
          h(
            'svg',
            { width: '25', height: '15', viewBox: '0 0 392 448', xmlns: 'http://www.w3.org/2000/svg' },
            h('path', { fill: 'currentColor', d: 'm192 284l186-162q15-17 2-30q-17-17-30-2L192 228L36 90Q23 75 6 92q-14 14 3 30z' }),
          ),
        ),
      ),
      h(
        'div',
        { class: this.getClassInputAutocompleteContainer(), style: { maxHeight: this.getMaxHeight() } },
        h('div', { class: 'hdc-select-search' }, h('input', { class: 'hdc-select-search-input', onInput: (ev) => this.onInputText(ev) })),
        h(
          'ul',
          { class: this.getClassInputAutocomplete() },
          h('li', { class: 'hdc-select-item', onClick: () => this.onClickSelectOption(null) }, this.placeholder),
          this.filteredItems.map((option, index) =>
            h(
              'li',
              { key: index, class: 'hdc-select-item', onClick: () => this.onClickSelectOption(option) },
              this.valueLabel && typeof option === 'object' ? option[this.valueLabel] : option,
            ),
          ),
        ),
      ),
    );
  }
  toggleDrop() {
    if (!this.showDrop) {
      this.onChangeValueFilterOptions('');
    }
    this.showDrop = !this.showDrop;
  }
  /**
   * Determines whether input text on
   * @param input Event
   */
  onInputText(input) {
    const element = input.target;
    this.onChangeValueFilterOptions(element.value);
  }
  clearInputSearch() {
    const element = this.el.querySelector('input.hdc-select-search-input');
    if (element) {
      element.value = '';
    }
  }
  /**
   * Gets max height
   * @returns { [key: string]: boolean }
   */
  getMaxHeight() {
    return this.viewItems > 0 ? `${this.maxHeight * this.viewItems + 40}px` : '';
  }
  /**
   * Gets class select container
   * @returns { [key: string]: boolean }
   */
  getClassInputAutocompleteContainer() {
    return {
      'hdc-select-container': true,
      'hdc-select-container--top': true,
      'show': this.showDrop,
    };
  }
  /**
   * Gets class select
   * @returns { [key: string]: boolean }
   */
  getClassInputAutocomplete() {
    return {
      'hdc-select-options': true,
    };
  }
  /**
   * Gets class select
   * @returns { [key: string]: boolean }
   */
  getClassSelectValue() {
    return {
      'hdc-select-value': true,
      'disabled': this.disable || this.lock,
      'show': this.showDrop,
    };
  }
  /**
   * Gets value key
   * @returns string
   */
  getValueKey() {
    var _a;
    if (this.value) {
      const itemSelected =
        (_a = this.items) === null || _a === void 0
          ? void 0
          : _a.find((item) => {
              return typeof item === 'object' ? item[this.valueKey] == this.value : item == this.value;
            });
      return this.valueKey && typeof itemSelected === 'object' ? getValueByPath(itemSelected, this.valueLabel.split('.')) : itemSelected;
    } else {
      return this.placeholder;
    }
  }
  static get is() {
    return 'hdc-select';
  }
  static get originalStyleUrls() {
    return {
      $: ['hdc-select.scss'],
    };
  }
  static get styleUrls() {
    return {
      $: ['hdc-select.css'],
    };
  }
  static get properties() {
    return {
      value: {
        type: 'any',
        mutable: true,
        complexType: {
          original: 'string | number | object | null',
          resolved: 'null | number | object | string',
          references: {},
        },
        required: false,
        optional: false,
        docs: {
          tags: [],
          text: 'Prop value of hdc select',
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
          text: 'Prop disable of hdc select',
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
          text: 'Prop lock of hdc select',
        },
        attribute: 'lock',
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
          text: 'Prop items of hdc select',
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
          text: 'Prop view items of hdc select',
        },
        attribute: 'view-items',
        reflect: false,
        defaultValue: '8',
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
          text: 'Prop placeholder of hdc select',
        },
        attribute: 'placeholder',
        reflect: false,
        defaultValue: "'-- Seleccione --'",
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
          text: 'Prop key of hdc select',
        },
        attribute: 'value-key',
        reflect: false,
        defaultValue: "'id'",
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
          text: 'Prop string of hdc select',
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
      showDrop: {},
    };
  }
  static get events() {
    return [
      {
        method: 'changeBlur',
        name: 'changeBlur',
        bubbles: true,
        cancelable: true,
        composed: true,
        docs: {
          tags: [],
          text: '',
        },
        complexType: {
          original: 'any',
          resolved: 'any',
          references: {},
        },
      },
      {
        method: 'changeValue',
        name: 'changeValue',
        bubbles: true,
        cancelable: true,
        composed: true,
        docs: {
          tags: [],
          text: '',
        },
        complexType: {
          original: 'any',
          resolved: 'any',
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
        method: 'handleOnClick',
        target: 'window',
        capture: false,
        passive: false,
      },
    ];
  }
}
//# sourceMappingURL=hdc-select.js.map
