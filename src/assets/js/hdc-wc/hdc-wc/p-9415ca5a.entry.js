import { r as t, c as i, h as e, g as s } from './p-ac9b30d0.js';
import { I as n, a as o } from './p-f7b56322.js';
import { r, a as h } from './p-23440397.js';
const a =
  '.hdc-input-wrapper{width:100%;-webkit-box-sizing:border-box;box-sizing:border-box;font-family:sans-serif;font-weight:500;line-height:22px;font-size:0.875rem;letter-spacing:0.02em;position:relative}.hdc-input-wrapper--success .hdc-input__input{border-color:rgb(1, 180, 1)}.hdc-input-wrapper--danger .hdc-input__input{border-color:rgb(214, 30, 30)}.hdc-input-wrapper--warning .hdc-input__input{border-color:rgb(209, 209, 20)}.hdc-input-wrapper--icon-right .hdc-input__input,.hdc-input-wrapper--icon-left .hdc-input__input{padding-left:1.65rem}.hdc-input-icon-left,.hdc-input-icon-right{position:absolute;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;bottom:0;top:0;font-size:14px;padding:10px}.hdc-input-icon-left--pointer,.hdc-input-icon-right--pointer{cursor:pointer}.hdc-input-icon-left{left:0}.hdc-input-icon-right{right:0}.hdc-input__input{display:block;-webkit-box-sizing:border-box;box-sizing:border-box;width:100%;padding:0.3rem 1.5rem 0.3rem 0.5rem;font-size:0.8rem;font-weight:400;line-height:1.5;color:#8a92a6;background-color:#fff;-webkit-background-clip:padding-box;background-clip:padding-box;border:1px solid #eee;-webkit-appearance:none;-moz-appearance:none;appearance:none;-webkit-border-radius:0.25rem;border-radius:0.25rem;-webkit-box-shadow:0 0 0 0;box-shadow:0 0 0 0;-webkit-transition:border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;transition:border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;-o-transition:border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;transition:border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;transition:border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out}.hdc-input__input:disabled{background-color:#e9ecef;cursor:auto}';
const c = class {
  constructor(e) {
    t(this, e);
    this.changeValue = i(this, 'changeValue', 7);
    this.changeBlur = i(this, 'changeBlur', 7);
    this.changeKeydown = i(this, 'changeKeydown', 7);
    this.changeKeyup = i(this, 'changeKeyup', 7);
    this.changeFocus = i(this, 'changeFocus', 7);
    this.changeEnter = i(this, 'changeEnter', 7);
    this.clickedIcon = i(this, 'clickedIcon', 7);
    this.regexLetters = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/;
    this.regexAlphanumeric = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s\d]+$/;
    this.type = n.DEFAULT;
    this.roleType = o.TEXT;
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
  render() {
    return e(
      'div',
      { class: this.getClassWrapper() },
      this.iconLeft &&
        e(
          'div',
          { class: this.getClassInputIconLeft(), onClick: () => this.clickedIcon.emit('LEFT') },
          e('i', { class: this.getClassIconLeft() }),
        ),
      e('input', {
        type: this.roleType,
        class: 'hdc-input__input',
        placeholder: this.placeholder,
        name: this.name,
        id: this.name,
        value: this.value,
        onInput: (t) => this.onInputText(t),
        onBlur: (t) => this.onBlurInput(t),
        onFocus: (t) => this.onFocusInput(t),
        onKeyDown: (t) => this.onKeydownInput(t),
        onKeyUp: (t) => this.onKeyupInput(t),
        disabled: this.disable || this.lock,
      }),
    );
  }
  onInputText(t) {
    const i = t.target;
    let e = i.value;
    if (this.lowercase || this.uppercase) {
      e = r(!this.lowercase ? e.toUpperCase() : e.toLowerCase());
    }
    if (t.data === '. ') {
      e = e.replace(/\. /g, ' ');
    }
    i.value = e;
    this.changeValue.emit(r(i.value));
  }
  onBlurInput(t) {
    this.changeBlur.emit(t);
  }
  onFocusInput(t) {
    this.changeFocus.emit(t);
  }
  onKeydownInput(t) {
    if (this.isValidateKey(t)) {
      this.changeKeydown.emit(t);
    } else {
      return;
    }
  }
  onKeyupInput(t) {
    if (this.isValidateKey(t)) {
      this.changeKeyup.emit(t);
    } else {
      return;
    }
  }
  isValidateKey(t) {
    const i = h(t);
    if (this.isLetters && !this.regexLetters.test(i)) {
      this.preventDefault(t);
      return false;
    }
    if (this.isAlphanumeric && !this.regexAlphanumeric.test(i)) {
      this.preventDefault(t);
      return false;
    }
    return true;
  }
  preventDefault(t) {
    t.preventDefault();
    return false;
  }
  getClassWrapper() {
    return { 'hdc-input-wrapper': true, [`hdc-input-wrapper--${this.type}`]: true, [`hdc-input-wrapper--icon-left`]: !!this.iconLeft };
  }
  getClassIconLeft() {
    return { 'hdc-icon': true, [`hdc-icon-${this.iconLeft}`]: !!this.iconLeft, [`color-${this.colorIconLeft}`]: !!this.colorIconLeft };
  }
  getClassInputIconLeft() {
    return { 'hdc-input-icon-left': true, 'hdc-input-icon-left--pointer': this.isClickedIconLeft };
  }
  get el() {
    return s(this);
  }
};
c.style = a;
export { c as hdc_input };
//# sourceMappingURL=p-9415ca5a.entry.js.map
