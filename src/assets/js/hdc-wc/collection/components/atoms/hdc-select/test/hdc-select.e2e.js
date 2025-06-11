import { newE2EPage } from '@stencil/core/testing';
describe('hdc-select', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<hdc-select></hdc-select>');
    const element = await page.find('hdc-select');
    expect(element).toHaveClass('hydrated');
  });
});
//# sourceMappingURL=hdc-select.e2e.js.map
