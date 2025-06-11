System.register(['./p-1b40de01.system.js', './p-6302ffe9.system.js'], function (t) {
  'use strict';
  var e, n, i;
  return {
    setters: [
      function (t) {
        e = t.r;
        n = t.h;
      },
      function (t) {
        i = t.f;
      },
    ],
    execute: function () {
      var s = ':host{display:block}';
      var r = t(
        'my_component',
        (function () {
          function t(t) {
            e(this, t);
            this.first = undefined;
            this.middle = undefined;
            this.last = undefined;
          }
          t.prototype.getText = function () {
            return i(this.first, this.middle, this.last);
          };
          t.prototype.render = function () {
            return n('div', null, "Hello, World! I'm ", this.getText());
          };
          return t;
        })(),
      );
      r.style = s;
    },
  };
});
//# sourceMappingURL=p-09089eea.system.entry.js.map
