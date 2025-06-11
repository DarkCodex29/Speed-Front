import { newSpecPage } from '@stencil/core/testing';
import { HdcAutocomplete } from '../hdc-autocomplete';
describe('hdc-autocomplete', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [HdcAutocomplete],
      html: `<hdc-autocomplete></hdc-autocomplete>`,
    });
    expect(page.root).toEqualHtml(`
      <hdc-autocomplete>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </hdc-autocomplete>
    `);
  });
});
//# sourceMappingURL=hdc-autocomplete.spec.js.map
