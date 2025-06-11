import { r as registerInstance, h } from './index-c60ff716.js';
import { f as format } from './utils-d44f9774.js';
var myComponentCss = ':host{display:block}';
var MyComponent = (function () {
  function t(t) {
    registerInstance(this, t);
    this.first = undefined;
    this.middle = undefined;
    this.last = undefined;
  }
  t.prototype.getText = function () {
    return format(this.first, this.middle, this.last);
  };
  t.prototype.render = function () {
    return h('div', null, "Hello, World! I'm ", this.getText());
  };
  return t;
})();
MyComponent.style = myComponentCss;
export { MyComponent as my_component };
//# sourceMappingURL=my-component.entry.js.map
