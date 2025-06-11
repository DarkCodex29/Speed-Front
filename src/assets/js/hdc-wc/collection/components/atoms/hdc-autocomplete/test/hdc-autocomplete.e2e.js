import { newE2EPage } from '@stencil/core/testing';
describe('hdc-autocomplete', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<hdc-autocomplete></hdc-autocomplete>');
    const element = await page.find('hdc-autocomplete');
    expect(element).toHaveClass('hydrated');
  });
});
//# sourceMappingURL=hdc-autocomplete.e2e.js.map
