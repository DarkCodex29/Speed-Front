System.register(['./p-1b40de01.system.js', './p-20212391.system.js', './p-6302ffe9.system.js'], function (e) {
  'use strict';
  var t, i, o, n, l, s;
  return {
    setters: [
      function (e) {
        t = e.r;
        i = e.c;
        o = e.h;
        n = e.g;
      },
      function (e) {
        l = e.I;
      },
      function (e) {
        s = e.g;
      },
    ],
    execute: function () {
      var r =
        '.hdc-input-autocomplete{position:relative}.hdc-input-autocomplete .hdc-input__input{padding-right:25px}.hdc-input-autocomplete-close{border:0;padding:0;line-height:1;height:20px;background:transparent;position:absolute;right:4px;top:4px;cursor:pointer}.hdc-input-autocomplete-container{position:absolute;min-width:100%;z-index:10;border-radius:3px}.hdc-input-autocomplete-container--show{border-top:1px solid #ced4da}.hdc-input-autocomplete-container--top{bottom:45px}.hdc-input-autocomplete-container--top .hdc-input-autocomplete-item{border-top:1px solid #ced4da;border-bottom:unset}.hdc-input-autocomplete-options{margin:0;padding:0;width:100%;overflow:auto}.hdc-input-autocomplete-options::-webkit-scrollbar{width:0.5em;border-width:0 1px 1px 0;border-style:solid;border-color:#ced4da;border-collapse:collapse}.hdc-input-autocomplete-options::-webkit-scrollbar-track{border:1px solid #ccc}.hdc-input-autocomplete-options::-webkit-scrollbar-thumb{background-color:#c49227}.hdc-input-autocomplete-item{-webkit-box-sizing:border-box;box-sizing:border-box;font-family:sans-serif;font-weight:500;font-size:0.8rem;border:1px solid #ced4da;background-color:#fff;border-top:unset;list-style-position:outside;text-overflow:ellipsis;overflow:hidden;cursor:pointer;padding:0px 0.8rem;height:26px;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;white-space:nowrap}.hdc-input-autocomplete-item:hover,.hdc-input-autocomplete-item-active{background-color:#ced4da}';
      var c = e(
        'hdc_autocomplete',
        (function () {
          function e(e) {
            t(this, e);
            this.selectedValue = i(this, 'selectedValue', 7);
            this.maxHeight = 26;
            this.type = l.DEFAULT;
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
            var i, o;
            this.searchText = e.detail;
            this.indexSelected = 0;
            if (this.searchText.length > 2) {
              this.filteredItems =
                (o =
                  (i = this.items) === null || i === void 0
                    ? void 0
                    : i.filter(function (e) {
                        var i = t.valueLabel && typeof e === 'object' ? e[t.valueLabel] : e;
                        return i.toLowerCase().includes(t.searchText.toLowerCase());
                      })) !== null && o !== void 0
                  ? o
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
            return o(
              'div',
              { class: 'hdc-input-autocomplete' },
              o('hdc-input', {
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
                o(
                  'button',
                  {
                    class: 'hdc-input-autocomplete-close',
                    onClick: function () {
                      return e.onClickedIconClose();
                    },
                  },
                  o(
                    'svg',
                    { width: '20', height: '20', viewBox: '0 0 24 24', xmlns: 'http://www.w3.org/2000/svg' },
                    o('path', {
                      'fill': 'none',
                      'stroke': 'currentColor',
                      'stroke-linecap': 'round',
                      'stroke-linejoin': 'round',
                      'stroke-width': '1.5',
                      'd': 'M6.758 17.243L12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243',
                    }),
                  ),
                ),
              o(
                'div',
                { class: this.getClassInputAutocompleteContainr() },
                o(
                  'ul',
                  { class: this.getClassInputAutocomplete(), style: { maxHeight: this.getMaxHeight() } },
                  this.filteredItems.map(function (t, i) {
                    return o(
                      'li',
                      {
                        key: i,
                        class: e.getClassItemFilter(i),
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
              var i =
                this.el.querySelector('li.hdc-input-autocomplete-item-active') ||
                this.el.querySelector('ul.hdc-input-autocomplete-options li');
              i === null || i === void 0 ? void 0 : i.classList.remove('hdc-input-autocomplete-item-active');
              if (e.key === 'ArrowDown') {
                if (this.filteredItems.length > 0 && this.indexSelected < this.filteredItems.length - 1) {
                  this.indexSelected = this.indexSelected + 1;
                }
                i = (i === null || i === void 0 ? void 0 : i.nextElementSibling) || i;
              } else if (e.key === 'ArrowUp') {
                if (this.filteredItems.length > 0 && this.indexSelected > 0) {
                  this.indexSelected = this.indexSelected - 1;
                }
                i = (i === null || i === void 0 ? void 0 : i.previousElementSibling) || i;
              } else {
                i = e.target;
              }
              i === null || i === void 0 ? void 0 : i.classList.add('hdc-input-autocomplete-item-active');
              var o = this.el.querySelector('ul.hdc-input-autocomplete-options');
              var n = this.getOffset(o).top + ((o === null || o === void 0 ? void 0 : o.clientHeight) || 0);
              var l = (i === null || i === void 0 ? void 0 : i.nextElementSibling) || i;
              var s = this.getOffset(l).top + ((l === null || l === void 0 ? void 0 : l.clientHeight) || 0);
              var r = ((o === null || o === void 0 ? void 0 : o.scrollTop) || 0) + s - n;
              o === null || o === void 0 ? void 0 : o.scrollTo({ top: r });
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
            return this.valueKey && this.value && typeof this.value === 'object' ? s(this.value, this.valueLabel.split('.')) : this.value;
          };
          e.prototype.getOffset = function (e) {
            if (!e.getClientRects().length) {
              return { top: 0, left: 0 };
            }
            var t = e.getBoundingClientRect();
            var i = e.ownerDocument.defaultView;
            return {
              top: t.top + ((i === null || i === void 0 ? void 0 : i.scrollY) || 0),
              left: t.left + ((i === null || i === void 0 ? void 0 : i.scrollX) || 0),
            };
          };
          Object.defineProperty(e.prototype, 'el', {
            get: function () {
              return n(this);
            },
            enumerable: false,
            configurable: true,
          });
          return e;
        })(),
      );
      c.style = r;
    },
  };
});
//# sourceMappingURL=p-648ca68b.system.entry.js.map
