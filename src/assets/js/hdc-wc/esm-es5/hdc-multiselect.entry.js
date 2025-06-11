var __awaiter =
  (this && this.__awaiter) ||
  function (e, t, i, n) {
    function l(e) {
      return e instanceof i
        ? e
        : new i(function (t) {
            t(e);
          });
    }
    return new (i || (i = Promise))(function (i, o) {
      function s(e) {
        try {
          a(n.next(e));
        } catch (e) {
          o(e);
        }
      }
      function r(e) {
        try {
          a(n['throw'](e));
        } catch (e) {
          o(e);
        }
      }
      function a(e) {
        e.done ? i(e.value) : l(e.value).then(s, r);
      }
      a((n = n.apply(e, t || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (e, t) {
    var i = {
        label: 0,
        sent: function () {
          if (o[0] & 1) throw o[1];
          return o[1];
        },
        trys: [],
        ops: [],
      },
      n,
      l,
      o,
      s;
    return (
      (s = { next: r(0), throw: r(1), return: r(2) }),
      typeof Symbol === 'function' &&
        (s[Symbol.iterator] = function () {
          return this;
        }),
      s
    );
    function r(e) {
      return function (t) {
        return a([e, t]);
      };
    }
    function a(r) {
      if (n) throw new TypeError('Generator is already executing.');
      while ((s && ((s = 0), r[0] && (i = 0)), i))
        try {
          if (
            ((n = 1),
            l &&
              (o = r[0] & 2 ? l['return'] : r[0] ? l['throw'] || ((o = l['return']) && o.call(l), 0) : l.next) &&
              !(o = o.call(l, r[1])).done)
          )
            return o;
          if (((l = 0), o)) r = [r[0] & 2, o.value];
          switch (r[0]) {
            case 0:
            case 1:
              o = r;
              break;
            case 4:
              i.label++;
              return { value: r[1], done: false };
            case 5:
              i.label++;
              l = r[1];
              r = [0];
              continue;
            case 7:
              r = i.ops.pop();
              i.trys.pop();
              continue;
            default:
              if (!((o = i.trys), (o = o.length > 0 && o[o.length - 1])) && (r[0] === 6 || r[0] === 2)) {
                i = 0;
                continue;
              }
              if (r[0] === 3 && (!o || (r[1] > o[0] && r[1] < o[3]))) {
                i.label = r[1];
                break;
              }
              if (r[0] === 6 && i.label < o[1]) {
                i.label = o[1];
                o = r;
                break;
              }
              if (o && i.label < o[2]) {
                i.label = o[2];
                i.ops.push(r);
                break;
              }
              if (o[2]) i.ops.pop();
              i.trys.pop();
              continue;
          }
          r = t.call(e, i);
        } catch (e) {
          r = [6, e];
          l = 0;
        } finally {
          n = o = 0;
        }
      if (r[0] & 5) throw r[1];
      return { value: r[0] ? r[1] : void 0, done: true };
    }
  };
var __spreadArray =
  (this && this.__spreadArray) ||
  function (e, t, i) {
    if (i || arguments.length === 2)
      for (var n = 0, l = t.length, o; n < l; n++) {
        if (o || !(n in t)) {
          if (!o) o = Array.prototype.slice.call(t, 0, n);
          o[n] = t[n];
        }
      }
    return e.concat(o || Array.prototype.slice.call(t));
  };
import { r as registerInstance, c as createEvent, h, g as getElement } from './index-c60ff716.js';
var hdcMultiselectCss =
  '.hdc-multiselect{min-width:125px;max-width:100%;font-family:sans-serif;font-size:1em;-webkit-box-sizing:border-box;box-sizing:border-box;position:relative}.hdc-multiselect *{-webkit-box-sizing:border-box;box-sizing:border-box}.hdc-multiselect-value{display:block;width:100%;padding:0.3rem 0.5rem;cursor:pointer;text-align:left;color:#8a92a6;min-height:29px;overflow:hidden;background-color:#fff;-webkit-background-clip:padding-box;background-clip:padding-box;border:1px solid #eee;-webkit-appearance:none;-moz-appearance:none;appearance:none;-webkit-border-radius:0.25rem;border-radius:0.25rem;-webkit-box-shadow:0 0 0 0;box-shadow:0 0 0 0;-webkit-transition:border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;transition:border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;-o-transition:border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;transition:border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;transition:border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out}.hdc-multiselect-value[disabled],.hdc-multiselect-value:disabled{background-color:#e9ecef;cursor:auto}.hdc-multiselect-value>span{text-overflow:ellipsis;display:block;overflow:hidden;white-space:nowrap}.hdc-multiselect-container{width:100%;display:none;position:absolute;z-index:10;color:#333;overflow:auto;padding:0px;background:rgb(255, 255, 255);border-width:1px;border-style:solid;border-color:rgb(170, 170, 170);-o-border-image:initial;border-image:initial;border-radius:4px}.hdc-multiselect-container::-webkit-scrollbar{width:0.5em}.hdc-multiselect-container::-webkit-scrollbar-track{border-left:1px solid #ccc}.hdc-multiselect-container::-webkit-scrollbar-thumb{background-color:#c49227}.hdc-multiselect-container.show{display:block}.hdc-multiselect-container--top .hdc-input-autocomplete-item{border-top:1px solid #ced4da;border-bottom:unset}.hdc-multiselect-search{width:100%;padding:4px}.hdc-multiselect-search-input{width:100%;min-height:24px;font-size:0.8rem;-webkit-box-shadow:none;box-shadow:none;height:auto !important;padding:0px 10px 0px 3px;margin:0px;outline:0px;border:1px solid rgb(170, 170, 170);border-radius:3px}.hdc-multiselect-options{overflow:auto;margin:0px;padding:5px 8px;width:100%}.hdc-multiselect-item{display:list-item;background-image:none;position:static;list-style:none}.hdc-multiselect-item-label{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}.hdc-multiselect-item span{margin-left:3px;display:inline;white-space:nowrap}.hdc-multiselect-item>input{pointer-events:none}';
var HdcMultiselect = (function () {
  function e(e) {
    registerInstance(this, e);
    this.changeValue = createEvent(this, 'changeValue', 7);
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
  e.prototype.componentWillUpdate = function () {
    if (!this.value) {
      this.valueOptions = null;
      this.value = null;
    }
  };
  e.prototype.onChangeValueFilterOptions = function (e) {
    var t = this;
    var i, n;
    this.searchText = e;
    this.filteredItems =
      (n =
        (i = this.items) === null || i === void 0
          ? void 0
          : i.filter(function (e) {
              var i = t.valueLabel && typeof e === 'object' ? e[t.valueLabel] : e;
              return i.toLowerCase().includes(t.searchText.toLowerCase());
            })) !== null && n !== void 0
        ? n
        : [];
    requestAnimationFrame(function () {
      var e = t.el.querySelectorAll('input[data-name="selectItems"]');
      if (e) {
        e.forEach(function (e) {
          var i;
          var n = e;
          var l =
            (i = t.valueOptions) === null || i === void 0
              ? void 0
              : i
                  .map(function (e) {
                    return String(e[t.valueKey]);
                  })
                  .includes(String(n.value));
          if (l) {
            n.checked = true;
          } else {
            n.checked = false;
          }
        });
      }
    });
  };
  e.prototype.onClickSelectOption = function (e) {
    var t = this;
    var i, n, l;
    if (this.valueOptions) {
      var o = this.valueOptions.findIndex(function (i) {
        return String(i[t.valueKey]) === String(e[t.valueKey]);
      });
      if (o === -1) {
        this.valueOptions.push(e);
      } else {
        this.valueOptions.splice(o, 1);
      }
      if (this.valueOptions.length === 0) {
        this.valueOptions = null;
      }
    } else {
      this.valueOptions = [e];
    }
    var s = this.el.querySelectorAll('input[data-name="selectAll"]');
    if (s) {
      this.isSelectAll =
        ((i = this.valueOptions) === null || i === void 0 ? void 0 : i.length) ===
        ((n = this.items) === null || n === void 0 ? void 0 : n.length);
      s.forEach(function (e) {
        e.checked = t.isSelectAll;
      });
    }
    this.value =
      ((l = this.valueOptions) === null || l === void 0
        ? void 0
        : l.map(function (e) {
            return e[t.valueKey];
          })) || null;
    this.changeValue.emit(this.value);
  };
  e.prototype.handleOnClick = function (e) {
    if (this.showDrop) {
      if (this.el.contains(e.target)) {
        return;
      }
      this.showDrop = false;
    }
  };
  e.prototype.render = function () {
    var e = this;
    return h(
      'div',
      { class: 'hdc-multiselect' },
      h(
        'button',
        {
          class: 'hdc-multiselect-value',
          disabled: this.disable || this.lock,
          onClick: function () {
            return e.toggleDrop();
          },
        },
        h('span', null, this.getValueText()),
      ),
      h(
        'div',
        { class: this.getClassInputAutocompleteContainer() },
        h(
          'div',
          { class: 'hdc-multiselect-search' },
          h('input', {
            class: 'hdc-multiselect-search-input',
            onInput: function (t) {
              return e.onInputText(t);
            },
          }),
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
              h('input', {
                'type': 'checkbox',
                'data-name': 'selectAll',
                'onClick': function () {
                  return e.selectAllOptions();
                },
              }),
              h('span', null, '[Seleccionar Todo]'),
            ),
          ),
          this.filteredItems.map(function (t, i) {
            return h(
              'li',
              { key: i, class: 'hdc-multiselect-item' },
              h(
                'label',
                { class: 'hdc-multiselect-item-label' },
                h('input', {
                  'type': 'checkbox',
                  'data-name': 'selectItems',
                  'value': t[e.valueKey],
                  'onClick': function () {
                    return e.onClickSelectOption(t);
                  },
                }),
                h('span', null, typeof t === 'object' ? t[e.valueLabel] : t),
              ),
            );
          }),
        ),
      ),
    );
  };
  e.prototype.toggleDrop = function () {
    if (!this.showDrop) {
      this.onChangeValueFilterOptions('');
    }
    this.showDrop = !this.showDrop;
  };
  e.prototype.selectAllOptions = function () {
    var e = this;
    var t;
    var i = this.el.querySelectorAll('input[data-name="selectItems"]');
    if (i) {
      i.forEach(function (t) {
        var i = t;
        if (!e.isSelectAll) {
          i.checked = true;
        } else {
          i.checked = false;
        }
      });
      if (!this.isSelectAll) {
        this.valueOptions = this.items ? __spreadArray([], this.items, true) : null;
      } else {
        this.valueOptions = null;
      }
      this.value =
        ((t = this.valueOptions) === null || t === void 0
          ? void 0
          : t.map(function (t) {
              return t[e.valueKey];
            })) || null;
      this.changeValue.emit(this.value);
    }
    this.isSelectAll = !this.isSelectAll;
  };
  e.prototype.onInputText = function (e) {
    return __awaiter(this, void 0, void 0, function () {
      var t;
      return __generator(this, function (i) {
        t = e.target;
        this.onChangeValueFilterOptions(t.value);
        return [2];
      });
    });
  };
  e.prototype.getValueText = function () {
    var e = this;
    var t, i, n;
    if (this.value) {
      if (this.isSelectAll) {
        return 'Todos';
      } else if (this.value.length > 4) {
        return ''
          .concat((t = this.valueOptions) === null || t === void 0 ? void 0 : t.length, ' de ')
          .concat((i = this.items) === null || i === void 0 ? void 0 : i.length, ' seleccionados');
      }
      return (
        ((n = this.valueOptions) === null || n === void 0
          ? void 0
          : n
              .map(function (t) {
                return t[e.valueLabel];
              })
              .join(', ')) || ''
      );
    }
    return '-- Seleccione --';
  };
  e.prototype.getMaxHeight = function () {
    return this.viewItems > 0 ? ''.concat(this.maxHeight * this.viewItems + 40, 'px') : '';
  };
  e.prototype.getClassInputAutocompleteContainer = function () {
    return { 'hdc-multiselect-container': true, 'hdc-multiselect-container--top': true, 'show': this.showDrop };
  };
  e.prototype.getClassInputAutocomplete = function () {
    return { 'hdc-multiselect-options': true };
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
HdcMultiselect.style = hdcMultiselectCss;
export { HdcMultiselect as hdc_multiselect };
//# sourceMappingURL=hdc-multiselect.entry.js.map
