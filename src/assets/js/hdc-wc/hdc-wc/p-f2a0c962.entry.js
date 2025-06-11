import { r as t, c as i, h as e, g as o } from './p-ac9b30d0.js';
import { I as s } from './p-f7b56322.js';
import { g as n } from './p-23440397.js';
const l =
  '.hdc-input-autocomplete{position:relative}.hdc-input-autocomplete .hdc-input__input{padding-right:25px}.hdc-input-autocomplete-close{border:0;padding:0;line-height:1;height:20px;background:transparent;position:absolute;right:4px;top:4px;cursor:pointer}.hdc-input-autocomplete-container{position:absolute;min-width:100%;z-index:10;border-radius:3px}.hdc-input-autocomplete-container--show{border-top:1px solid #ced4da}.hdc-input-autocomplete-container--top{bottom:45px}.hdc-input-autocomplete-container--top .hdc-input-autocomplete-item{border-top:1px solid #ced4da;border-bottom:unset}.hdc-input-autocomplete-options{margin:0;padding:0;width:100%;overflow:auto}.hdc-input-autocomplete-options::-webkit-scrollbar{width:0.5em;border-width:0 1px 1px 0;border-style:solid;border-color:#ced4da;border-collapse:collapse}.hdc-input-autocomplete-options::-webkit-scrollbar-track{border:1px solid #ccc}.hdc-input-autocomplete-options::-webkit-scrollbar-thumb{background-color:#c49227}.hdc-input-autocomplete-item{-webkit-box-sizing:border-box;box-sizing:border-box;font-family:sans-serif;font-weight:500;font-size:0.8rem;border:1px solid #ced4da;background-color:#fff;border-top:unset;list-style-position:outside;text-overflow:ellipsis;overflow:hidden;cursor:pointer;padding:0px 0.8rem;height:26px;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;white-space:nowrap}.hdc-input-autocomplete-item:hover,.hdc-input-autocomplete-item-active{background-color:#ced4da}';
const h = class {
  constructor(e) {
    t(this, e);
    this.selectedValue = i(this, 'selectedValue', 7);
    this.maxHeight = 26;
    this.type = s.DEFAULT;
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
  onChangeValueFilterOptions(t) {
    var i, e;
    this.searchText = t.detail;
    this.indexSelected = 0;
    if (this.searchText.length > 2) {
      this.filteredItems =
        (e =
          (i = this.items) === null || i === void 0
            ? void 0
            : i.filter((t) => {
                const i = this.valueLabel && typeof t === 'object' ? t[this.valueLabel] : t;
                return i.toLowerCase().includes(this.searchText.toLowerCase());
              })) !== null && e !== void 0
          ? e
          : [];
      this.setToggleDropdown();
    } else {
      this.filteredItems = [];
    }
  }
  onClickSelectOption(t) {
    this.value = t;
    this.filteredItems = [];
    this.selectedValue.emit(this.value);
  }
  onClickedIconClose() {
    this.value = null;
    this.selectedValue.emit(this.value);
    this.indexSelected = 0;
  }
  render() {
    return e(
      'div',
      { class: 'hdc-input-autocomplete' },
      e('hdc-input', {
        type: this.type,
        placeholder: this.placeholder,
        disable: this.disable,
        lock: this.lock,
        uppercase: false,
        value: this.getValueKey(),
        onChangeFocus: () => this.setToggleDropdown(),
        onChangeValue: (t) => this.onChangeValueFilterOptions(t),
      }),
      this.value &&
        typeof this.value === 'object' &&
        !this.disable &&
        e(
          'button',
          { class: 'hdc-input-autocomplete-close', onClick: () => this.onClickedIconClose() },
          e(
            'svg',
            { width: '20', height: '20', viewBox: '0 0 24 24', xmlns: 'http://www.w3.org/2000/svg' },
            e('path', {
              'fill': 'none',
              'stroke': 'currentColor',
              'stroke-linecap': 'round',
              'stroke-linejoin': 'round',
              'stroke-width': '1.5',
              'd': 'M6.758 17.243L12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243',
            }),
          ),
        ),
      e(
        'div',
        { class: this.getClassInputAutocompleteContainr() },
        e(
          'ul',
          { class: this.getClassInputAutocomplete(), style: { maxHeight: this.getMaxHeight() } },
          this.filteredItems.map((t, i) =>
            e('li', { key: i, class: this.getClassItemFilter(i), onClick: () => this.onClickSelectOption(t) }, this.getStartTyping(t)),
          ),
        ),
      ),
    );
  }
  handlesBodyClick(t) {
    if (!t.composedPath().includes(this.el)) {
      this.isToggleDropdown = false;
      this.indexSelected = 0;
    }
  }
  handleKeyDown(t) {
    const i = ['ArrowDown', 'ArrowUp', 'Enter'];
    if (i.includes(t.key)) {
      let i =
        this.el.querySelector('li.hdc-input-autocomplete-item-active') || this.el.querySelector('ul.hdc-input-autocomplete-options li');
      i === null || i === void 0 ? void 0 : i.classList.remove('hdc-input-autocomplete-item-active');
      if (t.key === 'ArrowDown') {
        if (this.filteredItems.length > 0 && this.indexSelected < this.filteredItems.length - 1) {
          this.indexSelected = this.indexSelected + 1;
        }
        i = (i === null || i === void 0 ? void 0 : i.nextElementSibling) || i;
      } else if (t.key === 'ArrowUp') {
        if (this.filteredItems.length > 0 && this.indexSelected > 0) {
          this.indexSelected = this.indexSelected - 1;
        }
        i = (i === null || i === void 0 ? void 0 : i.previousElementSibling) || i;
      } else {
        i = t.target;
      }
      i === null || i === void 0 ? void 0 : i.classList.add('hdc-input-autocomplete-item-active');
      const o = this.el.querySelector('ul.hdc-input-autocomplete-options');
      const s = this.getOffset(o).top + ((o === null || o === void 0 ? void 0 : o.clientHeight) || 0);
      const n = (i === null || i === void 0 ? void 0 : i.nextElementSibling) || i;
      const l = this.getOffset(n).top + ((n === null || n === void 0 ? void 0 : n.clientHeight) || 0);
      var e = ((o === null || o === void 0 ? void 0 : o.scrollTop) || 0) + l - s;
      o === null || o === void 0 ? void 0 : o.scrollTo({ top: e });
      if (t.key === 'Enter') {
        this.onClickSelectOption(this.filteredItems[this.indexSelected]);
      }
    }
  }
  setToggleDropdown() {
    this.isToggleDropdown = this.filteredItems.length > 0;
  }
  getStartTyping(t) {
    const i = this.valueLabel && typeof t === 'object' ? t[this.valueLabel] : t;
    return i;
  }
  getStyleKeyboard(t) {
    return { 'hdc-input-autocomplete-item': true, 'hdc-input-autocomplete-item-active': t == this.indexSelected };
  }
  getMaxHeight() {
    return this.viewItems > 0 ? `${this.maxHeight * this.viewItems}px` : '';
  }
  getClassInputAutocompleteContainr() {
    return {
      'hdc-input-autocomplete-container': true,
      'hdc-input-autocomplete-container--top': false,
      'hdc-input-autocomplete-container--show': this.filteredItems.length > 0,
    };
  }
  getClassInputAutocomplete() {
    return { 'hdc-input-autocomplete-options': true };
  }
  getClassItemFilter(t) {
    return { 'hdc-input-autocomplete-item': true, 'hdc-input-autocomplete-item-active': t === 0 };
  }
  getValueKey() {
    return this.valueKey && this.value && typeof this.value === 'object' ? n(this.value, this.valueLabel.split('.')) : this.value;
  }
  getOffset(t) {
    if (!t.getClientRects().length) {
      return { top: 0, left: 0 };
    }
    let i = t.getBoundingClientRect();
    let e = t.ownerDocument.defaultView;
    return {
      top: i.top + ((e === null || e === void 0 ? void 0 : e.scrollY) || 0),
      left: i.left + ((e === null || e === void 0 ? void 0 : e.scrollX) || 0),
    };
  }
  get el() {
    return o(this);
  }
};
h.style = l;
export { h as hdc_autocomplete };
//# sourceMappingURL=p-f2a0c962.entry.js.map
