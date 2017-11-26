import { NgxIbanDemoPage } from './app.po';

describe('ngx-iban-demo App', () => {
  let page: NgxIbanDemoPage;

  beforeEach(() => {
    page = new NgxIbanDemoPage ();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
