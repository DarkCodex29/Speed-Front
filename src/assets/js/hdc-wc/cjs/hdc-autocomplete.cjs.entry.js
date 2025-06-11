'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-3b10f428.js');
const inputRoleType = require('./input-role-type-c397d891.js');
const utils = require('./utils-ef5b10d0.js');

const hdcAutocompleteCss =
  '.hdc-input-autocomplete{position:relative}.hdc-input-autocomplete .hdc-input__input{padding-right:25px}.hdc-input-autocomplete-close{border:0;padding:0;line-height:1;height:20px;background:transparent;position:absolute;right:4px;top:4px;cursor:pointer}.hdc-input-autocomplete-container{position:absolute;min-width:100%;z-index:10;border-radius:3px}.hdc-input-autocomplete-container--show{border-top:1px solid #ced4da}.hdc-input-autocomplete-container--top{bottom:45px}.hdc-input-autocomplete-container--top .hdc-input-autocomplete-item{border-top:1px solid #ced4da;border-bottom:unset}.hdc-input-autocomplete-options{margin:0;padding:0;width:100%;overflow:auto}.hdc-input-autocomplete-options::-webkit-scrollbar{width:0.5em;border-width:0 1px 1px 0;border-style:solid;border-color:#ced4da;border-collapse:collapse}.hdc-input-autocomplete-options::-webkit-scrollbar-track{border:1px solid #ccc}.hdc-input-autocomplete-options::-webkit-scrollbar-thumb{background-color:#c49227}.hdc-input-autocomplete-item{-webkit-box-sizing:border-box;box-sizing:border-box;font-family:sans-serif;font-weight:500;font-size:0.8rem;border:1px solid #ced4da;background-color:#fff;border-top:unset;list-style-position:outside;text-overflow:ellipsis;overflow:hidden;cursor:pointer;padding:0px 0.8rem;height:26px;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;white-space:nowrap}.hdc-input-autocomplete-item:hover,.hdc-input-autocomplete-item-active{background-color:#ced4da}';

const HdcAutocomplete = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.selectedValue = index.createEvent(this, 'selectedValue', 7);
    /**
     * Max height of hdc input autocomplete
     */
    this.maxHeight = 26;
    this.type = inputRoleType.InputType.DEFAULT;
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
    return index.h(
      'div',
      { class: 'hdc-input-autocomplete' },
      index.h('hdc-input', {
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
        index.h(
          'button',
          { class: 'hdc-input-autocomplete-close', onClick: () => this.onClickedIconClose() },
          index.h(
            'svg',
            { width: '20', height: '20', viewBox: '0 0 24 24', xmlns: 'http://www.w3.org/2000/svg' },
            index.h('path', {
              'fill': 'none',
              'stroke': 'currentColor',
              'stroke-linecap': 'round',
              'stroke-linejoin': 'round',
              'stroke-width': '1.5',
              'd': 'M6.758 17.243L12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243',
            }),
          ),
        ),
      index.h(
        'div',
        { class: this.getClassInputAutocompleteContainr() },
        index.h(
          'ul',
          { class: this.getClassInputAutocomplete(), style: { maxHeight: this.getMaxHeight() } },
          this.filteredItems.map((option, index$1) =>
            index.h(
              'li',
              { key: index$1, class: this.getClassItemFilter(index$1), onClick: () => this.onClickSelectOption(option) },
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
      ? utils.getValueByPath(this.value, this.valueLabel.split('.'))
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
    return index.getElement(this);
  }
};
HdcAutocomplete.style = hdcAutocompleteCss;

exports.hdc_autocomplete = HdcAutocomplete;

//# sourceMappingURL=hdc-autocomplete.cjs.entry.js.map
