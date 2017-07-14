import { MercadoLibrePage } from './app.po';

describe('mercado-libre App', () => {
  let page: MercadoLibrePage;

  beforeEach(() => {
    page = new MercadoLibrePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
