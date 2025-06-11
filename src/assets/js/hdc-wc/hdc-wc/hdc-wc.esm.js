import { p as e, b as l } from './p-ac9b30d0.js';
export { s as setNonce } from './p-ac9b30d0.js';
const a = () => {
  const l = import.meta.url;
  const a = {};
  if (l !== '') {
    a.resourcesUrl = new URL('.', l).href;
  }
  return e(a);
};
a().then((e) =>
  l(
    [
      [
        'p-f2a0c962',
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
        'p-ad94078c',
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
        'p-64083c84',
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
      ['p-7f1ef0b9', [[1, 'my-component', { first: [1], middle: [1], last: [1] }]]],
      [
        'p-9415ca5a',
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
  ),
);
//# sourceMappingURL=hdc-wc.esm.js.map
