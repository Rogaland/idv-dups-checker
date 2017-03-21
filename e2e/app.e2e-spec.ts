import { IdvDupsCheckerPage } from './app.po';

describe('idv-dups-checker App', () => {
  let page: IdvDupsCheckerPage;

  beforeEach(() => {
    page = new IdvDupsCheckerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
