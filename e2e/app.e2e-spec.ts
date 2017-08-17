import { BiowikiPage } from './app.po';

describe('biowiki App', () => {
  let page: BiowikiPage;

  beforeEach(() => {
    page = new BiowikiPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
