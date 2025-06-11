import { newSpecPage } from '@stencil/core/testing';
import { HdcInput } from '../hdc-input';
describe('hdc-input', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [HdcInput],
      html: `<hdc-input></hdc-input>`,
    });
    expect(page.root).toEqualHtml(`
      <hdc-input>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </hdc-input>
    `);
  });
});
//# sourceMappingURL=hdc-input.spec.js.map
