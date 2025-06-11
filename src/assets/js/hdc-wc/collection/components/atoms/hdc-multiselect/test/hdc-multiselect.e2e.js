import { newE2EPage } from '@stencil/core/testing';
describe('hdc-multiselect', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<hdc-multiselect></hdc-multiselect>');
    const element = await page.find('hdc-multiselect');
    expect(element).toHaveClass('hydrated');
  });
});
//# sourceMappingURL=hdc-multiselect.e2e.js.map
