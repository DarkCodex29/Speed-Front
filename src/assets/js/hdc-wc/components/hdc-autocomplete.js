import { proxyCustomElement, HTMLElement, createEvent, h } from '@stencil/core/internal/client';
import { I as InputType, d as defineCustomElement$2 } from './hdc-input2.js';
import { g as getValueByPath } from './utils.js';

const hdcAutocompleteCss =
  '.hdc-input-autocomplete{position:relative}.hdc-input-autocomplete .hdc-input__input{padding-right:25px}.hdc-input-autocomplete-close{border:0;padding:0;line-height:1;height:20px;background:transparent;position:absolute;right:4px;top:4px;cursor:pointer}.hdc-input-autocomplete-container{position:absolute;min-width:100%;z-index:10;border-radius:3px}.hdc-input-autocomplete-container--show{border-top:1px solid #ced4da}.hdc-input-autocomplete-container--top{bottom:45px}.hdc-input-autocomplete-container--top .hdc-input-autocomplete-item{border-top:1px solid #ced4da;border-bottom:unset}.hdc-input-autocomplete-options{margin:0;padding:0;width:100%;overflow:auto}.hdc-input-autocomplete-options::-webkit-scrollbar{width:0.5em;border-width:0 1px 1px 0;border-style:solid;border-color:#ced4da;border-collapse:collapse}.hdc-input-autocomplete-options::-webkit-scrollbar-track{border:1px solid #ccc}.hdc-input-autocomplete-options::-webkit-scrollbar-thumb{background-color:#c49227}.hdc-input-autocomplete-item{-webkit-box-sizing:border-box;box-sizing:border-box;font-family:sans-serif;font-weight:500;font-size:0.8rem;border:1px solid #ced4da;background-color:#fff;border-top:unset;list-style-position:outside;text-overflow:ellipsis;overflow:hidden;cursor:pointer;padding:0px 0.8rem;height:26px;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;white-space:nowrap}.hdc-input-autocomplete-item:hover,.hdc-input-autocomplete-item-active{background-color:#ced4da}';

const HdcAutocomplete$1 = /*@__PURE__*/ proxyCustomElement(
  class HdcAutocomplete extends HTMLElement {
    constructor() {
      super();
      this.__registerHost();
      this.selectedValue = createEvent(this, 'selectedValue', 7);
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
    get el() {
      return this;
    }
    static get style() {
      return hdcAutocompleteCss;
    }
  },
  [
    0,
    'hdc-autocomplete',
    {
      type: [1],
      value: [1025],
      disable: [1028],
      lock: [1028],
      placeholder: [1],
      items: [1040],
      viewItems: [1026, 'view-items'],
      valueKey: [1, 'value-key'],
      valueLabel: [1, 'value-label'],
      filteredItems: [32],
      searchText: [32],
      isToggleDropdown: [32],
      indexSelected: [32],
    },
    [
      [8, 'click', 'handlesBodyClick'],
      [0, 'keydown', 'handleKeyDown'],
    ],
  ],
);
function defineCustomElement$1() {
  if (typeof customElements === 'undefined') {
    return;
  }
  const components = ['hdc-autocomplete', 'hdc-input'];
  components.forEach((tagName) => {
    switch (tagName) {
      case 'hdc-autocomplete':
        if (!customElements.get(tagName)) {
          customElements.define(tagName, HdcAutocomplete$1);
        }
        break;
      case 'hdc-input':
        if (!customElements.get(tagName)) {
          defineCustomElement$2();
        }
        break;
    }
  });
}

const HdcAutocomplete = HdcAutocomplete$1;
const defineCustomElement = defineCustomElement$1;

export { HdcAutocomplete, defineCustomElement };

//# sourceMappingURL=hdc-autocomplete.js.map
