import { r as t, c as i, h as e, g as s } from './p-ac9b30d0.js';
const l =
  '.hdc-multiselect{min-width:125px;max-width:100%;font-family:sans-serif;font-size:1em;-webkit-box-sizing:border-box;box-sizing:border-box;position:relative}.hdc-multiselect *{-webkit-box-sizing:border-box;box-sizing:border-box}.hdc-multiselect-value{display:block;width:100%;padding:0.3rem 0.5rem;cursor:pointer;text-align:left;color:#8a92a6;min-height:29px;overflow:hidden;background-color:#fff;-webkit-background-clip:padding-box;background-clip:padding-box;border:1px solid #eee;-webkit-appearance:none;-moz-appearance:none;appearance:none;-webkit-border-radius:0.25rem;border-radius:0.25rem;-webkit-box-shadow:0 0 0 0;box-shadow:0 0 0 0;-webkit-transition:border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;transition:border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;-o-transition:border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;transition:border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;transition:border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out}.hdc-multiselect-value[disabled],.hdc-multiselect-value:disabled{background-color:#e9ecef;cursor:auto}.hdc-multiselect-value>span{text-overflow:ellipsis;display:block;overflow:hidden;white-space:nowrap}.hdc-multiselect-container{width:100%;display:none;position:absolute;z-index:10;color:#333;overflow:auto;padding:0px;background:rgb(255, 255, 255);border-width:1px;border-style:solid;border-color:rgb(170, 170, 170);-o-border-image:initial;border-image:initial;border-radius:4px}.hdc-multiselect-container::-webkit-scrollbar{width:0.5em}.hdc-multiselect-container::-webkit-scrollbar-track{border-left:1px solid #ccc}.hdc-multiselect-container::-webkit-scrollbar-thumb{background-color:#c49227}.hdc-multiselect-container.show{display:block}.hdc-multiselect-container--top .hdc-input-autocomplete-item{border-top:1px solid #ced4da;border-bottom:unset}.hdc-multiselect-search{width:100%;padding:4px}.hdc-multiselect-search-input{width:100%;min-height:24px;font-size:0.8rem;-webkit-box-shadow:none;box-shadow:none;height:auto !important;padding:0px 10px 0px 3px;margin:0px;outline:0px;border:1px solid rgb(170, 170, 170);border-radius:3px}.hdc-multiselect-options{overflow:auto;margin:0px;padding:5px 8px;width:100%}.hdc-multiselect-item{display:list-item;background-image:none;position:static;list-style:none}.hdc-multiselect-item-label{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}.hdc-multiselect-item span{margin-left:3px;display:inline;white-space:nowrap}.hdc-multiselect-item>input{pointer-events:none}';
const o = class {
  constructor(e) {
    t(this, e);
    this.changeValue = i(this, 'changeValue', 7);
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
  componentWillUpdate() {
    if (!this.value) {
      this.valueOptions = null;
      this.value = null;
    }
  }
  onChangeValueFilterOptions(t) {
    var i, e;
    this.searchText = t;
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
    requestAnimationFrame(() => {
      const t = this.el.querySelectorAll('input[data-name="selectItems"]');
      if (t) {
        t.forEach((t) => {
          var i;
          const e = t;
          let s =
            (i = this.valueOptions) === null || i === void 0 ? void 0 : i.map((t) => String(t[this.valueKey])).includes(String(e.value));
          if (s) {
            e.checked = true;
          } else {
            e.checked = false;
          }
        });
      }
    });
  }
  onClickSelectOption(t) {
    var i, e, s;
    if (this.valueOptions) {
      const i = this.valueOptions.findIndex((i) => String(i[this.valueKey]) === String(t[this.valueKey]));
      if (i === -1) {
        this.valueOptions.push(t);
      } else {
        this.valueOptions.splice(i, 1);
      }
      if (this.valueOptions.length === 0) {
        this.valueOptions = null;
      }
    } else {
      this.valueOptions = [t];
    }
    const l = this.el.querySelectorAll('input[data-name="selectAll"]');
    if (l) {
      this.isSelectAll =
        ((i = this.valueOptions) === null || i === void 0 ? void 0 : i.length) ===
        ((e = this.items) === null || e === void 0 ? void 0 : e.length);
      l.forEach((t) => {
        t.checked = this.isSelectAll;
      });
    }
    this.value = ((s = this.valueOptions) === null || s === void 0 ? void 0 : s.map((t) => t[this.valueKey])) || null;
    this.changeValue.emit(this.value);
  }
  handleOnClick(t) {
    if (this.showDrop) {
      if (this.el.contains(t.target)) {
        return;
      }
      this.showDrop = false;
    }
  }
  render() {
    return e(
      'div',
      { class: 'hdc-multiselect' },
      e(
        'button',
        { class: 'hdc-multiselect-value', disabled: this.disable || this.lock, onClick: () => this.toggleDrop() },
        e('span', null, this.getValueText()),
      ),
      e(
        'div',
        { class: this.getClassInputAutocompleteContainer() },
        e(
          'div',
          { class: 'hdc-multiselect-search' },
          e('input', { class: 'hdc-multiselect-search-input', onInput: (t) => this.onInputText(t) }),
        ),
        e(
          'ul',
          { class: this.getClassInputAutocomplete(), style: { maxHeight: this.getMaxHeight() } },
          e(
            'li',
            { class: 'hdc-multiselect-item' },
            e(
              'label',
              { class: 'hdc-multiselect-item-label' },
              e('input', { 'type': 'checkbox', 'data-name': 'selectAll', 'onClick': () => this.selectAllOptions() }),
              e('span', null, '[Seleccionar Todo]'),
            ),
          ),
          this.filteredItems.map((t, i) =>
            e(
              'li',
              { key: i, class: 'hdc-multiselect-item' },
              e(
                'label',
                { class: 'hdc-multiselect-item-label' },
                e('input', {
                  'type': 'checkbox',
                  'data-name': 'selectItems',
                  'value': t[this.valueKey],
                  'onClick': () => this.onClickSelectOption(t),
                }),
                e('span', null, typeof t === 'object' ? t[this.valueLabel] : t),
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
    var t;
    const i = this.el.querySelectorAll('input[data-name="selectItems"]');
    if (i) {
      i.forEach((t) => {
        const i = t;
        if (!this.isSelectAll) {
          i.checked = true;
        } else {
          i.checked = false;
        }
      });
      if (!this.isSelectAll) {
        this.valueOptions = this.items ? [...this.items] : null;
      } else {
        this.valueOptions = null;
      }
      this.value = ((t = this.valueOptions) === null || t === void 0 ? void 0 : t.map((t) => t[this.valueKey])) || null;
      this.changeValue.emit(this.value);
    }
    this.isSelectAll = !this.isSelectAll;
  }
  async onInputText(t) {
    const i = t.target;
    this.onChangeValueFilterOptions(i.value);
  }
  getValueText() {
    var t, i, e;
    if (this.value) {
      if (this.isSelectAll) {
        return 'Todos';
      } else if (this.value.length > 4) {
        return `${(t = this.valueOptions) === null || t === void 0 ? void 0 : t.length} de ${
          (i = this.items) === null || i === void 0 ? void 0 : i.length
        } seleccionados`;
      }
      return ((e = this.valueOptions) === null || e === void 0 ? void 0 : e.map((t) => t[this.valueLabel]).join(', ')) || '';
    }
    return '-- Seleccione --';
  }
  getMaxHeight() {
    return this.viewItems > 0 ? `${this.maxHeight * this.viewItems + 40}px` : '';
  }
  getClassInputAutocompleteContainer() {
    return { 'hdc-multiselect-container': true, 'hdc-multiselect-container--top': true, 'show': this.showDrop };
  }
  getClassInputAutocomplete() {
    return { 'hdc-multiselect-options': true };
  }
  get el() {
    return s(this);
  }
};
o.style = l;
export { o as hdc_multiselect };
//# sourceMappingURL=p-ad94078c.entry.js.map
