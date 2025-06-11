import { newSpecPage } from '@stencil/core/testing';
import { HdcSelect } from '../hdc-select';
describe('hdc-select', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [HdcSelect],
      html: `<hdc-select></hdc-select>`,
    });
    expect(page.root).toEqualHtml(`
      <hdc-select>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </hdc-select>
    `);
  });
});
//# sourceMappingURL=hdc-select.spec.js.map
