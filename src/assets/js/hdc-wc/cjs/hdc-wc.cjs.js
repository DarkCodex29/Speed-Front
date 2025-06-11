'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-3b10f428.js');

/*
 Stencil Client Patch Browser v4.0.5 | MIT Licensed | https://stenciljs.com
 */
const patchBrowser = () => {
  const importMeta =
    typeof document === 'undefined'
      ? new (require('u' + 'rl').URL)('file:' + __filename).href
      : (document.currentScript && document.currentScript.src) || new URL('hdc-wc.cjs.js', document.baseURI).href;
  const opts = {};
  if (importMeta !== '') {
    opts.resourcesUrl = new URL('.', importMeta).href;
  }
  return index.promiseResolve(opts);
};

patchBrowser().then((options) => {
  return index.bootstrapLazy(
    [
      [
        'hdc-autocomplete.cjs',
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
        'hdc-multiselect.cjs',
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
        'hdc-select.cjs',
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
      ['my-component.cjs', [[1, 'my-component', { first: [1], middle: [1], last: [1] }]]],
      [
        'hdc-input.cjs',
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
    options,
  );
});

exports.setNonce = index.setNonce;

//# sourceMappingURL=hdc-wc.cjs.js.map
