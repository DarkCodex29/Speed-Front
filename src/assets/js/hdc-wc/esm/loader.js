import { b as bootstrapLazy } from './index-c60ff716.js';
export { s as setNonce } from './index-c60ff716.js';

const defineCustomElements = (win, options) => {
  if (typeof window === 'undefined') return undefined;
  return bootstrapLazy(
    [
      [
        'hdc-autocomplete',
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
        'hdc-multiselect',
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
        'hdc-select',
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
      ['my-component', [[1, 'my-component', { first: [1], middle: [1], last: [1] }]]],
      [
        'hdc-input',
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
};

export { defineCustomElements };

//# sourceMappingURL=loader.js.map
