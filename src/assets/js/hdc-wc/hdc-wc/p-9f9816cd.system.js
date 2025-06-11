System.register(['./p-1b40de01.system.js'], function (e, l) {
  'use strict';
  var t, s;
  return {
    setters: [
      function (l) {
        t = l.p;
        s = l.b;
        e('setNonce', l.s);
      },
    ],
    execute: function () {
      var e = function () {
        var e = l.meta.url;
        var s = {};
        if (e !== '') {
          s.resourcesUrl = new URL('.', e).href;
        }
        return t(s);
      };
      e().then(function (e) {
        return s(
          [
            [
              'p-648ca68b.system',
              [
                [
                  0,
                  'hdc-autocomplete',
                  {
                    type: [1],
                    value: [1025],
                    disable: [1028],
                    lock: [1028],
                    placeholder: [1],
                    items: [1040],
                    viewItems: [1026, 'view-items'],
                    valueKey: [1, 'value-key'],
                    valueLabel: [1, 'value-label'],
                    filteredItems: [32],
                    searchText: [32],
                    isToggleDropdown: [32],
                    indexSelected: [32],
                  },
                  [
                    [8, 'click', 'handlesBodyClick'],
                    [0, 'keydown', 'handleKeyDown'],
                  ],
                ],
              ],
            ],
            [
              'p-96d68bd5.system',
              [
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
              ],
            ],
            [
              'p-142b9d96.system',
              [
                [
                  0,
                  'hdc-select',
                  {
                    value: [1032],
                    disable: [1028],
                    lock: [1028],
                    items: [1040],
                    viewItems: [1026, 'view-items'],
                    placeholder: [1],
                    valueKey: [1, 'value-key'],
                    valueLabel: [1, 'value-label'],
                    filteredItems: [32],
                    searchText: [32],
                    showDrop: [32],
                  },
                  [[8, 'click', 'handleOnClick']],
                ],
              ],
            ],
            ['p-09089eea.system', [[1, 'my-component', { first: [1], middle: [1], last: [1] }]]],
            [
              'p-41965fd5.system',
              [
                [
                  0,
                  'hdc-input',
                  {
                    type: [1],
                    roleType: [1, 'role-type'],
                    placeholder: [1],
                    value: [1025],
                    disable: [1028],
                    lock: [1028],
                    lowercase: [1028],
                    uppercase: [1028],
                    iconLeft: [1025, 'icon-left'],
                    colorIconLeft: [1025, 'color-icon-left'],
                    isClickedIconLeft: [1028, 'is-clicked-icon-left'],
                    isLetters: [4, 'is-letters'],
                    isAlphanumeric: [4, 'is-alphanumeric'],
                    name: [1],
                  },
                ],
              ],
            ],
          ],
          e,
        );
      });
    },
  };
});
//# sourceMappingURL=p-9f9816cd.system.js.map
