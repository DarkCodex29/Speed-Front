import { newSpecPage } from '@stencil/core/testing';
import { HdcMultiselect } from '../hdc-multiselect';
describe('hdc-multiselect', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [HdcMultiselect],
      html: `<hdc-multiselect></hdc-multiselect>`,
    });
    expect(page.root).toEqualHtml(`
      <hdc-multiselect>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </hdc-multiselect>
    `);
  });
});
//# sourceMappingURL=hdc-multiselect.spec.js.map
