import { newE2EPage } from '@stencil/core/testing';
describe('hdc-input', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<hdc-input></hdc-input>');
    const element = await page.find('hdc-input');
    expect(element).toHaveClass('hydrated');
  });
});
//# sourceMappingURL=hdc-input.e2e.js.map
