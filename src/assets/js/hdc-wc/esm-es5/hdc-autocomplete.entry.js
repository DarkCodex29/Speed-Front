import { r as registerInstance, c as createEvent, h, g as getElement } from './index-c60ff716.js';
import { I as InputType } from './input-role-type-60e53954.js';
import { g as getValueByPath } from './utils-d44f9774.js';
var hdcAutocompleteCss =
  '.hdc-input-autocomplete{position:relative}.hdc-input-autocomplete .hdc-input__input{padding-right:25px}.hdc-input-autocomplete-close{border:0;padding:0;line-height:1;height:20px;background:transparent;position:absolute;right:4px;top:4px;cursor:pointer}.hdc-input-autocomplete-container{position:absolute;min-width:100%;z-index:10;border-radius:3px}.hdc-input-autocomplete-container--show{border-top:1px solid #ced4da}.hdc-input-autocomplete-container--top{bottom:45px}.hdc-input-autocomplete-container--top .hdc-input-autocomplete-item{border-top:1px solid #ced4da;border-bottom:unset}.hdc-input-autocomplete-options{margin:0;padding:0;width:100%;overflow:auto}.hdc-input-autocomplete-options::-webkit-scrollbar{width:0.5em;border-width:0 1px 1px 0;border-style:solid;border-color:#ced4da;border-collapse:collapse}.hdc-input-autocomplete-options::-webkit-scrollbar-track{border:1px solid #ccc}.hdc-input-autocomplete-options::-webkit-scrollbar-thumb{background-color:#c49227}.hdc-input-autocomplete-item{-webkit-box-sizing:border-box;box-sizing:border-box;font-family:sans-serif;font-weight:500;font-size:0.8rem;border:1px solid #ced4da;background-color:#fff;border-top:unset;list-style-position:outside;text-overflow:ellipsis;overflow:hidden;cursor:pointer;padding:0px 0.8rem;height:26px;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;white-space:nowrap}.hdc-input-autocomplete-item:hover,.hdc-input-autocomplete-item-active{background-color:#ced4da}';
var HdcAutocomplete = (function () {
  function e(e) {
    registerInstance(this, e);
    this.selectedValue = createEvent(this, 'selectedValue', 7);
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
  e.prototype.onChangeValueFilterOptions = function (e) {
    var t = this;
    var o, i;
    this.searchText = e.detail;
    this.indexSelected = 0;
    if (this.searchText.length > 2) {
      this.filteredItems =
        (i =
          (o = this.items) === null || o === void 0
            ? void 0
            : o.filter(function (e) {
                var o = t.valueLabel && typeof e === 'object' ? e[t.valueLabel] : e;
                return o.toLowerCase().includes(t.searchText.toLowerCase());
              })) !== null && i !== void 0
          ? i
          : [];
      this.setToggleDropdown();
    } else {
      this.filteredItems = [];
    }
  };
  e.prototype.onClickSelectOption = function (e) {
    this.value = e;
    this.filteredItems = [];
    this.selectedValue.emit(this.value);
  };
  e.prototype.onClickedIconClose = function () {
    this.value = null;
    this.selectedValue.emit(this.value);
    this.indexSelected = 0;
  };
  e.prototype.render = function () {
    var e = this;
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
        onChangeFocus: function () {
          return e.setToggleDropdown();
        },
        onChangeValue: function (t) {
          return e.onChangeValueFilterOptions(t);
        },
      }),
      this.value &&
        typeof this.value === 'object' &&
        !this.disable &&
        h(
          'button',
          {
            class: 'hdc-input-autocomplete-close',
            onClick: function () {
              return e.onClickedIconClose();
            },
          },
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
          this.filteredItems.map(function (t, o) {
            return h(
              'li',
              {
                key: o,
                class: e.getClassItemFilter(o),
                onClick: function () {
                  return e.onClickSelectOption(t);
                },
              },
              e.getStartTyping(t),
            );
          }),
        ),
      ),
    );
  };
  e.prototype.handlesBodyClick = function (e) {
    if (!e.composedPath().includes(this.el)) {
      this.isToggleDropdown = false;
      this.indexSelected = 0;
    }
  };
  e.prototype.handleKeyDown = function (e) {
    var t = ['ArrowDown', 'ArrowUp', 'Enter'];
    if (t.includes(e.key)) {
      var o =
        this.el.querySelector('li.hdc-input-autocomplete-item-active') || this.el.querySelector('ul.hdc-input-autocomplete-options li');
      o === null || o === void 0 ? void 0 : o.classList.remove('hdc-input-autocomplete-item-active');
      if (e.key === 'ArrowDown') {
        if (this.filteredItems.length > 0 && this.indexSelected < this.filteredItems.length - 1) {
          this.indexSelected = this.indexSelected + 1;
        }
        o = (o === null || o === void 0 ? void 0 : o.nextElementSibling) || o;
      } else if (e.key === 'ArrowUp') {
        if (this.filteredItems.length > 0 && this.indexSelected > 0) {
          this.indexSelected = this.indexSelected - 1;
        }
        o = (o === null || o === void 0 ? void 0 : o.previousElementSibling) || o;
      } else {
        o = e.target;
      }
      o === null || o === void 0 ? void 0 : o.classList.add('hdc-input-autocomplete-item-active');
      var i = this.el.querySelector('ul.hdc-input-autocomplete-options');
      var l = this.getOffset(i).top + ((i === null || i === void 0 ? void 0 : i.clientHeight) || 0);
      var n = (o === null || o === void 0 ? void 0 : o.nextElementSibling) || o;
      var s = this.getOffset(n).top + ((n === null || n === void 0 ? void 0 : n.clientHeight) || 0);
      var r = ((i === null || i === void 0 ? void 0 : i.scrollTop) || 0) + s - l;
      i === null || i === void 0 ? void 0 : i.scrollTo({ top: r });
      if (e.key === 'Enter') {
        this.onClickSelectOption(this.filteredItems[this.indexSelected]);
      }
    }
  };
  e.prototype.setToggleDropdown = function () {
    this.isToggleDropdown = this.filteredItems.length > 0;
  };
  e.prototype.getStartTyping = function (e) {
    var t = this.valueLabel && typeof e === 'object' ? e[this.valueLabel] : e;
    return t;
  };
  e.prototype.getStyleKeyboard = function (e) {
    return { 'hdc-input-autocomplete-item': true, 'hdc-input-autocomplete-item-active': e == this.indexSelected };
  };
  e.prototype.getMaxHeight = function () {
    return this.viewItems > 0 ? ''.concat(this.maxHeight * this.viewItems, 'px') : '';
  };
  e.prototype.getClassInputAutocompleteContainr = function () {
    return {
      'hdc-input-autocomplete-container': true,
      'hdc-input-autocomplete-container--top': false,
      'hdc-input-autocomplete-container--show': this.filteredItems.length > 0,
    };
  };
  e.prototype.getClassInputAutocomplete = function () {
    return { 'hdc-input-autocomplete-options': true };
  };
  e.prototype.getClassItemFilter = function (e) {
    return { 'hdc-input-autocomplete-item': true, 'hdc-input-autocomplete-item-active': e === 0 };
  };
  e.prototype.getValueKey = function () {
    return this.valueKey && this.value && typeof this.value === 'object'
      ? getValueByPath(this.value, this.valueLabel.split('.'))
      : this.value;
  };
  e.prototype.getOffset = function (e) {
    if (!e.getClientRects().length) {
      return { top: 0, left: 0 };
    }
    var t = e.getBoundingClientRect();
    var o = e.ownerDocument.defaultView;
    return {
      top: t.top + ((o === null || o === void 0 ? void 0 : o.scrollY) || 0),
      left: t.left + ((o === null || o === void 0 ? void 0 : o.scrollX) || 0),
    };
  };
  Object.defineProperty(e.prototype, 'el', {
    get: function () {
      return getElement(this);
    },
    enumerable: false,
    configurable: true,
  });
  return e;
})();
HdcAutocomplete.style = hdcAutocompleteCss;
export { HdcAutocomplete as hdc_autocomplete };
//# sourceMappingURL=hdc-autocomplete.entry.js.map
