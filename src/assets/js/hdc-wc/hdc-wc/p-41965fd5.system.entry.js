System.register(['./p-1b40de01.system.js', './p-20212391.system.js', './p-6302ffe9.system.js'], function (e) {
  'use strict';
  var t, n, i, o, r, s, c, a;
  return {
    setters: [
      function (e) {
        t = e.r;
        n = e.c;
        i = e.h;
        o = e.g;
      },
      function (e) {
        r = e.I;
        s = e.a;
      },
      function (e) {
        c = e.r;
        a = e.a;
      },
    ],
    execute: function () {
      var u =
        '.hdc-input-wrapper{width:100%;-webkit-box-sizing:border-box;box-sizing:border-box;font-family:sans-serif;font-weight:500;line-height:22px;font-size:0.875rem;letter-spacing:0.02em;position:relative}.hdc-input-wrapper--success .hdc-input__input{border-color:rgb(1, 180, 1)}.hdc-input-wrapper--danger .hdc-input__input{border-color:rgb(214, 30, 30)}.hdc-input-wrapper--warning .hdc-input__input{border-color:rgb(209, 209, 20)}.hdc-input-wrapper--icon-right .hdc-input__input,.hdc-input-wrapper--icon-left .hdc-input__input{padding-left:1.65rem}.hdc-input-icon-left,.hdc-input-icon-right{position:absolute;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;bottom:0;top:0;font-size:14px;padding:10px}.hdc-input-icon-left--pointer,.hdc-input-icon-right--pointer{cursor:pointer}.hdc-input-icon-left{left:0}.hdc-input-icon-right{right:0}.hdc-input__input{display:block;-webkit-box-sizing:border-box;box-sizing:border-box;width:100%;padding:0.3rem 1.5rem 0.3rem 0.5rem;font-size:0.8rem;font-weight:400;line-height:1.5;color:#8a92a6;background-color:#fff;-webkit-background-clip:padding-box;background-clip:padding-box;border:1px solid #eee;-webkit-appearance:none;-moz-appearance:none;appearance:none;-webkit-border-radius:0.25rem;border-radius:0.25rem;-webkit-box-shadow:0 0 0 0;box-shadow:0 0 0 0;-webkit-transition:border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;transition:border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;-o-transition:border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;transition:border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;transition:border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out}.hdc-input__input:disabled{background-color:#e9ecef;cursor:auto}';
      var p = e(
        'hdc_input',
        (function () {
          function e(e) {
            t(this, e);
            this.changeValue = n(this, 'changeValue', 7);
            this.changeBlur = n(this, 'changeBlur', 7);
            this.changeKeydown = n(this, 'changeKeydown', 7);
            this.changeKeyup = n(this, 'changeKeyup', 7);
            this.changeFocus = n(this, 'changeFocus', 7);
            this.changeEnter = n(this, 'changeEnter', 7);
            this.clickedIcon = n(this, 'clickedIcon', 7);
            this.regexLetters = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/;
            this.regexAlphanumeric = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s\d]+$/;
            this.type = r.DEFAULT;
            this.roleType = s.TEXT;
            this.placeholder = '';
            this.value = undefined;
            this.disable = false;
            this.lock = false;
            this.lowercase = false;
            this.uppercase = true;
            this.iconLeft = undefined;
            this.colorIconLeft = 'dark-charcoal';
            this.isClickedIconLeft = undefined;
            this.isLetters = undefined;
            this.isAlphanumeric = undefined;
            this.name = undefined;
          }
          e.prototype.render = function () {
            var e = this;
            return i(
              'div',
              { class: this.getClassWrapper() },
              this.iconLeft &&
                i(
                  'div',
                  {
                    class: this.getClassInputIconLeft(),
                    onClick: function () {
                      return e.clickedIcon.emit('LEFT');
                    },
                  },
                  i('i', { class: this.getClassIconLeft() }),
                ),
              i('input', {
                type: this.roleType,
                class: 'hdc-input__input',
                placeholder: this.placeholder,
                name: this.name,
                id: this.name,
                value: this.value,
                onInput: function (t) {
                  return e.onInputText(t);
                },
                onBlur: function (t) {
                  return e.onBlurInput(t);
                },
                onFocus: function (t) {
                  return e.onFocusInput(t);
                },
                onKeyDown: function (t) {
                  return e.onKeydownInput(t);
                },
                onKeyUp: function (t) {
                  return e.onKeyupInput(t);
                },
                disabled: this.disable || this.lock,
              }),
            );
          };
          e.prototype.onInputText = function (e) {
            var t = e.target;
            var n = t.value;
            if (this.lowercase || this.uppercase) {
              n = c(!this.lowercase ? n.toUpperCase() : n.toLowerCase());
            }
            if (e.data === '. ') {
              n = n.replace(/\. /g, ' ');
            }
            t.value = n;
            this.changeValue.emit(c(t.value));
          };
          e.prototype.onBlurInput = function (e) {
            this.changeBlur.emit(e);
          };
          e.prototype.onFocusInput = function (e) {
            this.changeFocus.emit(e);
          };
          e.prototype.onKeydownInput = function (e) {
            if (this.isValidateKey(e)) {
              this.changeKeydown.emit(e);
            } else {
              return;
            }
          };
          e.prototype.onKeyupInput = function (e) {
            if (this.isValidateKey(e)) {
              this.changeKeyup.emit(e);
            } else {
              return;
            }
          };
          e.prototype.isValidateKey = function (e) {
            var t = a(e);
            if (this.isLetters && !this.regexLetters.test(t)) {
              this.preventDefault(e);
              return false;
            }
            if (this.isAlphanumeric && !this.regexAlphanumeric.test(t)) {
              this.preventDefault(e);
              return false;
            }
            return true;
          };
          e.prototype.preventDefault = function (e) {
            e.preventDefault();
            return false;
          };
          e.prototype.getClassWrapper = function () {
            var e;
            return (
              (e = { 'hdc-input-wrapper': true }),
              (e['hdc-input-wrapper--'.concat(this.type)] = true),
              (e['hdc-input-wrapper--icon-left'] = !!this.iconLeft),
              e
            );
          };
          e.prototype.getClassIconLeft = function () {
            var e;
            return (
              (e = { 'hdc-icon': true }),
              (e['hdc-icon-'.concat(this.iconLeft)] = !!this.iconLeft),
              (e['color-'.concat(this.colorIconLeft)] = !!this.colorIconLeft),
              e
            );
          };
          e.prototype.getClassInputIconLeft = function () {
            return { 'hdc-input-icon-left': true, 'hdc-input-icon-left--pointer': this.isClickedIconLeft };
          };
          Object.defineProperty(e.prototype, 'el', {
            get: function () {
              return o(this);
            },
            enumerable: false,
            configurable: true,
          });
          return e;
        })(),
      );
      p.style = u;
    },
  };
});
//# sourceMappingURL=p-41965fd5.system.entry.js.map
