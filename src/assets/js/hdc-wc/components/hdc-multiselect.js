import { proxyCustomElement, HTMLElement, createEvent, h } from '@stencil/core/internal/client';

const hdcMultiselectCss =
  '.hdc-multiselect{min-width:125px;max-width:100%;font-family:sans-serif;font-size:1em;-webkit-box-sizing:border-box;box-sizing:border-box;position:relative}.hdc-multiselect *{-webkit-box-sizing:border-box;box-sizing:border-box}.hdc-multiselect-value{display:block;width:100%;padding:0.3rem 0.5rem;cursor:pointer;text-align:left;color:#8a92a6;min-height:29px;overflow:hidden;background-color:#fff;-webkit-background-clip:padding-box;background-clip:padding-box;border:1px solid #eee;-webkit-appearance:none;-moz-appearance:none;appearance:none;-webkit-border-radius:0.25rem;border-radius:0.25rem;-webkit-box-shadow:0 0 0 0;box-shadow:0 0 0 0;-webkit-transition:border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;transition:border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;-o-transition:border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;transition:border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;transition:border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out}.hdc-multiselect-value[disabled],.hdc-multiselect-value:disabled{background-color:#e9ecef;cursor:auto}.hdc-multiselect-value>span{text-overflow:ellipsis;display:block;overflow:hidden;white-space:nowrap}.hdc-multiselect-container{width:100%;display:none;position:absolute;z-index:10;color:#333;overflow:auto;padding:0px;background:rgb(255, 255, 255);border-width:1px;border-style:solid;border-color:rgb(170, 170, 170);-o-border-image:initial;border-image:initial;border-radius:4px}.hdc-multiselect-container::-webkit-scrollbar{width:0.5em}.hdc-multiselect-container::-webkit-scrollbar-track{border-left:1px solid #ccc}.hdc-multiselect-container::-webkit-scrollbar-thumb{background-color:#c49227}.hdc-multiselect-container.show{display:block}.hdc-multiselect-container--top .hdc-input-autocomplete-item{border-top:1px solid #ced4da;border-bottom:unset}.hdc-multiselect-search{width:100%;padding:4px}.hdc-multiselect-search-input{width:100%;min-height:24px;font-size:0.8rem;-webkit-box-shadow:none;box-shadow:none;height:auto !important;padding:0px 10px 0px 3px;margin:0px;outline:0px;border:1px solid rgb(170, 170, 170);border-radius:3px}.hdc-multiselect-options{overflow:auto;margin:0px;padding:5px 8px;width:100%}.hdc-multiselect-item{display:list-item;background-image:none;position:static;list-style:none}.hdc-multiselect-item-label{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}.hdc-multiselect-item span{margin-left:3px;display:inline;white-space:nowrap}.hdc-multiselect-item>input{pointer-events:none}';

const HdcMultiselect$1 = /*@__PURE__*/ proxyCustomElement(
  class HdcMultiselect extends HTMLElement {
    constructor() {
      super();
      this.__registerHost();
      this.changeValue = createEvent(this, 'changeValue', 7);
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
    get el() {
      return this;
    }
    static get style() {
      return hdcMultiselectCss;
    }
  },
  [
    0,
    'hdc-multiselect',
    {
      value: [1040],
      disable: [1028],
      lock: [1028],
      items: [1040],
      viewItems: [1026, 'view-items'],
      valueKey: [1025, 'value-key'],
      valueLabel: [1, 'value-label'],
      filteredItems: [32],
      searchText: [32],
      valueOptions: [32],
      showDrop: [32],
      isSelectAll: [32],
      onInputText: [64],
    },
    [[8, 'click', 'handleOnClick']],
  ],
);
function defineCustomElement$1() {
  if (typeof customElements === 'undefined') {
    return;
  }
  const components = ['hdc-multiselect'];
  components.forEach((tagName) => {
    switch (tagName) {
      case 'hdc-multiselect':
        if (!customElements.get(tagName)) {
          customElements.define(tagName, HdcMultiselect$1);
        }
        break;
    }
  });
}

const HdcMultiselect = HdcMultiselect$1;
const defineCustomElement = defineCustomElement$1;

export { HdcMultiselect, defineCustomElement };

//# sourceMappingURL=hdc-multiselect.js.map
