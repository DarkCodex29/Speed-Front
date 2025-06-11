import { r as e, c as t, h as i, g as s } from './p-ac9b30d0.js';
import { g as o } from './p-23440397.js';
const n =
  '.hdc-select{min-width:125px;max-width:100%;font-family:sans-serif;font-size:0.8rem;-webkit-box-sizing:border-box;box-sizing:border-box;position:relative}.hdc-select *{-webkit-box-sizing:border-box;box-sizing:border-box}.hdc-select-value{display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between;-ms-flex-align:center;align-items:center;width:100%;padding:0.3rem 0.5rem;cursor:pointer;text-align:left;color:#8a92a6;min-height:29px;overflow:hidden;background-color:#fff;-webkit-background-clip:padding-box;background-clip:padding-box;border:1px solid #eee;-webkit-appearance:none;-moz-appearance:none;appearance:none;-webkit-border-radius:0.25rem;border-radius:0.25rem;-webkit-box-shadow:0 0 0 0;box-shadow:0 0 0 0;-webkit-transition:border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;transition:border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;-o-transition:border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;transition:border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;transition:border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out}.hdc-select-value.disabled{background-color:#e9ecef;cursor:auto;pointer-events:none}.hdc-select-value-text{text-overflow:ellipsis;display:block;overflow:hidden;white-space:nowrap}.hdc-select-value-icon{display:-ms-inline-flexbox;display:inline-flex;-webkit-transition:0.3s;transition:0.3s}.hdc-select-value.show .hdc-select-value-icon{-webkit-transform:rotate(-180deg);transform:rotate(-180deg)}.hdc-select-container{width:100%;display:none;position:absolute;z-index:10;color:#333;overflow:auto;padding:0px;background:rgb(255, 255, 255);border-width:1px;border-style:solid;border-color:rgb(170, 170, 170);-o-border-image:initial;border-image:initial;border-radius:4px}.hdc-select-container::-webkit-scrollbar{width:0.5em}.hdc-select-container::-webkit-scrollbar-track{border-left:1px solid #ccc}.hdc-select-container::-webkit-scrollbar-thumb{background-color:#c49227}.hdc-select-container.show{display:block}.hdc-select-container--top .hdc-input-autocomplete-item{border-top:1px solid #ced4da;border-bottom:unset}.hdc-select-search{width:100%;padding:4px;position:-webkit-sticky;position:sticky;top:0;background-color:#fff}.hdc-select-search-input{width:100%;min-height:24px;font-size:0.8rem;-webkit-box-shadow:none;box-shadow:none;height:auto !important;padding:0px 10px 0px 3px;margin:0px;outline:0px;border:1px solid rgb(170, 170, 170);border-radius:3px}.hdc-select-options{overflow:auto;margin:0px;padding:0;width:100%}.hdc-select-item{display:list-item;background-image:none;position:static;list-style:none;padding:5px 12px;background-color:#fff;cursor:pointer;border-bottom:1px solid #ced4da;font-size:0.9rem}.hdc-select-item:hover{background-color:#ced4da}';
const r = class {
  constructor(i) {
    e(this, i);
    this.changeBlur = t(this, 'changeBlur', 7);
    this.changeValue = t(this, 'changeValue', 7);
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
  onChangeValueFilterOptions(e) {
    var t, i;
    this.searchText = e;
    this.filteredItems =
      (i =
        (t = this.items) === null || t === void 0
          ? void 0
          : t.filter((e) => {
              const t = this.valueLabel && typeof e === 'object' ? e[this.valueLabel] : e;
              return t.toLowerCase().includes(this.searchText.toLowerCase());
            })) !== null && i !== void 0
        ? i
        : [];
  }
  onClickSelectOption(e) {
    this.value = this.valueKey && e && typeof e === 'object' ? e[this.valueKey] : e;
    this.filteredItems = [];
    this.toggleDrop();
    this.clearInputSearch();
    this.changeValue.emit(this.value);
    this.el.blur();
  }
  handleOnClick(e) {
    if (this.showDrop) {
      if (this.el.contains(e.target)) {
        return;
      }
      this.showDrop = false;
      this.clearInputSearch();
      this.changeBlur.emit(e);
    }
  }
  render() {
    return i(
      'div',
      { class: 'hdc-select' },
      i(
        'div',
        { class: this.getClassSelectValue(), onClick: () => this.toggleDrop() },
        i('span', { class: 'hdc-select-value-text' }, this.getValueKey()),
        i(
          'span',
          { class: 'hdc-select-value-icon' },
          i(
            'svg',
            { width: '25', height: '15', viewBox: '0 0 392 448', xmlns: 'http://www.w3.org/2000/svg' },
            i('path', { fill: 'currentColor', d: 'm192 284l186-162q15-17 2-30q-17-17-30-2L192 228L36 90Q23 75 6 92q-14 14 3 30z' }),
          ),
        ),
      ),
      i(
        'div',
        { class: this.getClassInputAutocompleteContainer(), style: { maxHeight: this.getMaxHeight() } },
        i('div', { class: 'hdc-select-search' }, i('input', { class: 'hdc-select-search-input', onInput: (e) => this.onInputText(e) })),
        i(
          'ul',
          { class: this.getClassInputAutocomplete() },
          i('li', { class: 'hdc-select-item', onClick: () => this.onClickSelectOption(null) }, this.placeholder),
          this.filteredItems.map((e, t) =>
            i(
              'li',
              { key: t, class: 'hdc-select-item', onClick: () => this.onClickSelectOption(e) },
              this.valueLabel && typeof e === 'object' ? e[this.valueLabel] : e,
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
  onInputText(e) {
    const t = e.target;
    this.onChangeValueFilterOptions(t.value);
  }
  clearInputSearch() {
    const e = this.el.querySelector('input.hdc-select-search-input');
    if (e) {
      e.value = '';
    }
  }
  getMaxHeight() {
    return this.viewItems > 0 ? `${this.maxHeight * this.viewItems + 40}px` : '';
  }
  getClassInputAutocompleteContainer() {
    return { 'hdc-select-container': true, 'hdc-select-container--top': true, 'show': this.showDrop };
  }
  getClassInputAutocomplete() {
    return { 'hdc-select-options': true };
  }
  getClassSelectValue() {
    return { 'hdc-select-value': true, 'disabled': this.disable || this.lock, 'show': this.showDrop };
  }
  getValueKey() {
    var e;
    if (this.value) {
      const t =
        (e = this.items) === null || e === void 0
          ? void 0
          : e.find((e) => (typeof e === 'object' ? e[this.valueKey] == this.value : e == this.value));
      return this.valueKey && typeof t === 'object' ? o(t, this.valueLabel.split('.')) : t;
    } else {
      return this.placeholder;
    }
  }
  get el() {
    return s(this);
  }
};
r.style = n;
export { r as hdc_select };
//# sourceMappingURL=p-64083c84.entry.js.map
