import { r as t, h as s } from './p-ac9b30d0.js';
import { f as e } from './p-23440397.js';
const i = ':host{display:block}';
const n = class {
  constructor(s) {
    t(this, s);
    this.first = undefined;
    this.middle = undefined;
    this.last = undefined;
  }
  getText() {
    return e(this.first, this.middle, this.last);
  }
  render() {
    return s('div', null, "Hello, World! I'm ", this.getText());
  }
};
n.style = i;
export { n as my_component };
//# sourceMappingURL=p-7f1ef0b9.entry.js.map
