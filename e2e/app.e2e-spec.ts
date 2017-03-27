import { Csi2132projectPage } from './app.po';

describe('csi2132project App', () => {
  let page: Csi2132projectPage;

  beforeEach(() => {
    page = new Csi2132projectPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
