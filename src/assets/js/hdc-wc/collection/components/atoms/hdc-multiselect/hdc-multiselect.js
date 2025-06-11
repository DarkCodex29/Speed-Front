import { h } from '@stencil/core';
export class HdcMultiselect {
  constructor() {
    /**
     * Max height of hdc multiselect
     */
    this.maxHeight = 20;
    this.value = undefined;
    this.disable = undefined;
    this.lock = undefined;
    this.items = undefined;
    this.viewItems = 8;
    this.valueKey = 'name';
    this.valueLabel = 'name';
    this.filteredItems = [];
    this.searchText = '';
    this.valueOptions = undefined;
    this.showDrop = false;
    this.isSelectAll = false;
  }
  /**
   * Determines whether change value filter options on
   * @param event CustomEvent
   */
  componentWillUpdate() {
    if (!this.value) {
      this.valueOptions = null;
      this.value = null;
    }
  }
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
    requestAnimationFrame(() => {
      const list = this.el.querySelectorAll('input[data-name="selectItems"]');
      if (list) {
        list.forEach((item) => {
          var _a;
          const checkbox = item;
          let flag =
            (_a = this.valueOptions) === null || _a === void 0
              ? void 0
              : _a.map((item) => String(item[this.valueKey])).includes(String(checkbox.value));
          if (flag) {
            checkbox.checked = true;
          } else {
            checkbox.checked = false;
          }
        });
      } // Do something with liElements
    });
  }
  /**
   * Determines whether click select option on
   * @param option string
   */
  onClickSelectOption(option) {
    var _a, _b, _c;
    //Verificamos si ya existen valores seleccionados
    if (this.valueOptions) {
      const indexOf = this.valueOptions.findIndex((item) => String(item[this.valueKey]) === String(option[this.valueKey]));
      if (indexOf === -1) {
        this.valueOptions.push(option);
      } else {
        this.valueOptions.splice(indexOf, 1);
      }
      if (this.valueOptions.length === 0) {
        this.valueOptions = null;
      }
    } else {
      this.valueOptions = [option];
    }
    //Desactivamos el check selectAll
    const list = this.el.querySelectorAll('input[data-name="selectAll"]');
    if (list) {
      this.isSelectAll =
        ((_a = this.valueOptions) === null || _a === void 0 ? void 0 : _a.length) ===
        ((_b = this.items) === null || _b === void 0 ? void 0 : _b.length);
      list.forEach((item) => {
        item.checked = this.isSelectAll;
      });
    }
    this.value = ((_c = this.valueOptions) === null || _c === void 0 ? void 0 : _c.map((item) => item[this.valueKey])) || null;
    this.changeValue.emit(this.value);
  }
  handleOnClick(ev) {
    if (this.showDrop) {
      if (this.el.contains(ev.target)) {
        // If click was inside, stop here
        return;
      }
      this.showDrop = false;
    }
  }
  render() {
    return h(
      'div',
      { class: 'hdc-multiselect' },
      h(
        'button',
        { class: 'hdc-multiselect-value', disabled: this.disable || this.lock, onClick: () => this.toggleDrop() },
        h('span', null, this.getValueText()),
      ),
      h(
        'div',
        { class: this.getClassInputAutocompleteContainer() },
        h(
          'div',
          { class: 'hdc-multiselect-search' },
          h('input', { class: 'hdc-multiselect-search-input', onInput: (ev) => this.onInputText(ev) }),
        ),
        h(
          'ul',
          { class: this.getClassInputAutocomplete(), style: { maxHeight: this.getMaxHeight() } },
          h(
            'li',
            { class: 'hdc-multiselect-item' },
            h(
              'label',
              { class: 'hdc-multiselect-item-label' },
              h('input', { 'type': 'checkbox', 'data-name': 'selectAll', 'onClick': () => this.selectAllOptions() }),
              h('span', null, '[Seleccionar Todo]'),
            ),
          ),
          this.filteredItems.map((option, index) =>
            h(
              'li',
              { key: index, class: 'hdc-multiselect-item' },
              h(
                'label',
                { class: 'hdc-multiselect-item-label' },
                h('input', {
                  'type': 'checkbox',
                  'data-name': 'selectItems',
                  'value': option[this.valueKey],
                  'onClick': () => this.onClickSelectOption(option),
                }),
                h('span', null, typeof option === 'object' ? option[this.valueLabel] : option),
              ),
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
  selectAllOptions() {
    var _a;
    const list = this.el.querySelectorAll('input[data-name="selectItems"]');
    if (list) {
      list.forEach((item) => {
        const checkbox = item;
        if (!this.isSelectAll) {
          checkbox.checked = true;
        } else {
          checkbox.checked = false;
        }
      });
      if (!this.isSelectAll) {
        this.valueOptions = this.items ? [...this.items] : null;
      } else {
        this.valueOptions = null;
      }
      this.value = ((_a = this.valueOptions) === null || _a === void 0 ? void 0 : _a.map((item) => item[this.valueKey])) || null;
      this.changeValue.emit(this.value);
    }
    this.isSelectAll = !this.isSelectAll;
  }
  /**
   * Determines whether input text on
   * @param input Event
   */
  async onInputText(input) {
    const element = input.target;
    this.onChangeValueFilterOptions(element.value);
  }
  /**
   * Gets value text
   * @returns string
   */
  getValueText() {
    var _a, _b, _c;
    if (this.value) {
      if (this.isSelectAll) {
        return 'Todos';
      } else if (this.value.length > 4) {
        return `${(_a = this.valueOptions) === null || _a === void 0 ? void 0 : _a.length} de ${
          (_b = this.items) === null || _b === void 0 ? void 0 : _b.length
        } seleccionados`;
      }
      return ((_c = this.valueOptions) === null || _c === void 0 ? void 0 : _c.map((item) => item[this.valueLabel]).join(', ')) || '';
    }
    /*
        this.valueOptions = null;
    this.value = null;
    
    */
    return '-- Seleccione --';
  }
  /**
   * Gets max height
   * @returns { [key: string]: boolean }
   */
  getMaxHeight() {
    return this.viewItems > 0 ? `${this.maxHeight * this.viewItems + 40}px` : '';
  }
  /**
   * Gets class multiselect container
   * @returns { [key: string]: boolean }
   */
  getClassInputAutocompleteContainer() {
    return {
      'hdc-multiselect-container': true,
      'hdc-multiselect-container--top': true,
      'show': this.showDrop,
    };
  }
  /**
   * Gets class multiselect
   * @returns { [key: string]: boolean }
   */
  getClassInputAutocomplete() {
    return {
      'hdc-multiselect-options': true,
    };
  }
  static get is() {
    return 'hdc-multiselect';
  }
  static get originalStyleUrls() {
    return {
      $: ['hdc-multiselect.scss'],
    };
  }
  static get styleUrls() {
    return {
      $: ['hdc-multiselect.css'],
    };
  }
  static get properties() {
    return {
      value: {
        type: 'unknown',
        mutable: true,
        complexType: {
          original: 'Array<string | object> | null',
          resolved: '(string | object)[] | null',
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
          text: 'Prop value of hdc multiselect',
        },
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
          text: 'Prop disable of hdc multiselect',
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
          text: 'Prop lock of hdc multiselect',
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
          text: 'Prop items of hdc multiselect',
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
          text: 'Prop view items of hdc multiselect',
        },
        attribute: 'view-items',
        reflect: false,
        defaultValue: '8',
      },
      valueKey: {
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
          text: 'Prop key of hdc multiselect',
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
          text: 'Prop string of hdc multiselect',
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
      valueOptions: {},
      showDrop: {},
      isSelectAll: {},
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
          text: 'Event change value of hdc multiselect',
        },
        complexType: {
          original: 'string | object | null',
          resolved: 'null | object | string',
          references: {},
        },
      },
    ];
  }
  static get methods() {
    return {
      onInputText: {
        complexType: {
          signature: '(input: InputEvent) => Promise<void>',
          parameters: [
            {
              tags: [
                {
                  name: 'param',
                  text: 'input Event',
                },
              ],
              text: 'Event',
            },
          ],
          references: {
            Promise: {
              location: 'global',
              id: 'global::Promise',
            },
            InputEvent: {
              location: 'global',
              id: 'global::InputEvent',
            },
            HTMLInputElement: {
              location: 'global',
              id: 'global::HTMLInputElement',
            },
          },
          return: 'Promise<void>',
        },
        docs: {
          text: 'Determines whether input text on',
          tags: [
            {
              name: 'param',
              text: 'input Event',
            },
          ],
        },
      },
    };
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
//# sourceMappingURL=hdc-multiselect.js.map
