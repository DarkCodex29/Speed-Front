import { proxyCustomElement, HTMLElement, createEvent, h } from '@stencil/core/internal/client';
import { g as getValueByPath } from './utils.js';

const hdcSelectCss =
  '.hdc-select{min-width:125px;max-width:100%;font-family:sans-serif;font-size:0.8rem;-webkit-box-sizing:border-box;box-sizing:border-box;position:relative}.hdc-select *{-webkit-box-sizing:border-box;box-sizing:border-box}.hdc-select-value{display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between;-ms-flex-align:center;align-items:center;width:100%;padding:0.3rem 0.5rem;cursor:pointer;text-align:left;color:#8a92a6;min-height:29px;overflow:hidden;background-color:#fff;-webkit-background-clip:padding-box;background-clip:padding-box;border:1px solid #eee;-webkit-appearance:none;-moz-appearance:none;appearance:none;-webkit-border-radius:0.25rem;border-radius:0.25rem;-webkit-box-shadow:0 0 0 0;box-shadow:0 0 0 0;-webkit-transition:border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;transition:border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;-o-transition:border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;transition:border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;transition:border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out}.hdc-select-value.disabled{background-color:#e9ecef;cursor:auto;pointer-events:none}.hdc-select-value-text{text-overflow:ellipsis;display:block;overflow:hidden;white-space:nowrap}.hdc-select-value-icon{display:-ms-inline-flexbox;display:inline-flex;-webkit-transition:0.3s;transition:0.3s}.hdc-select-value.show .hdc-select-value-icon{-webkit-transform:rotate(-180deg);transform:rotate(-180deg)}.hdc-select-container{width:100%;display:none;position:absolute;z-index:10;color:#333;overflow:auto;padding:0px;background:rgb(255, 255, 255);border-width:1px;border-style:solid;border-color:rgb(170, 170, 170);-o-border-image:initial;border-image:initial;border-radius:4px}.hdc-select-container::-webkit-scrollbar{width:0.5em}.hdc-select-container::-webkit-scrollbar-track{border-left:1px solid #ccc}.hdc-select-container::-webkit-scrollbar-thumb{background-color:#c49227}.hdc-select-container.show{display:block}.hdc-select-container--top .hdc-input-autocomplete-item{border-top:1px solid #ced4da;border-bottom:unset}.hdc-select-search{width:100%;padding:4px;position:-webkit-sticky;position:sticky;top:0;background-color:#fff}.hdc-select-search-input{width:100%;min-height:24px;font-size:0.8rem;-webkit-box-shadow:none;box-shadow:none;height:auto !important;padding:0px 10px 0px 3px;margin:0px;outline:0px;border:1px solid rgb(170, 170, 170);border-radius:3px}.hdc-select-options{overflow:auto;margin:0px;padding:0;width:100%}.hdc-select-item{display:list-item;background-image:none;position:static;list-style:none;padding:5px 12px;background-color:#fff;cursor:pointer;border-bottom:1px solid #ced4da;font-size:0.9rem}.hdc-select-item:hover{background-color:#ced4da}';

const HdcSelect$1 = /*@__PURE__*/ proxyCustomElement(
  class HdcSelect extends HTMLElement {
    constructor() {
      super();
      this.__registerHost();
      this.changeBlur = createEvent(this, 'changeBlur', 7);
      this.changeValue = createEvent(this, 'changeValue', 7);
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
    get el() {
      return this;
    }
    static get style() {
      return hdcSelectCss;
    }
  },
  [
    0,
    'hdc-select',
    {
      value: [1032],
      disable: [1028],
      lock: [1028],
      items: [1040],
      viewItems: [1026, 'view-items'],
      placeholder: [1],
      valueKey: [1, 'value-key'],
      valueLabel: [1, 'value-label'],
      filteredItems: [32],
      searchText: [32],
      showDrop: [32],
    },
    [[8, 'click', 'handleOnClick']],
  ],
);
function defineCustomElement$1() {
  if (typeof customElements === 'undefined') {
    return;
  }
  const components = ['hdc-select'];
  components.forEach((tagName) => {
    switch (tagName) {
      case 'hdc-select':
        if (!customElements.get(tagName)) {
          customElements.define(tagName, HdcSelect$1);
        }
        break;
    }
  });
}

const HdcSelect = HdcSelect$1;
const defineCustomElement = defineCustomElement$1;

export { HdcSelect, defineCustomElement };

//# sourceMappingURL=hdc-select.js.map
