import { LeagueManagerPage } from './app.po';

describe('league-manager App', function() {
  let page: LeagueManagerPage;

  beforeEach(() => {
    page = new LeagueManagerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
