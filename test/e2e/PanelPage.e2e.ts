/* eslint jest/expect-expect: off, jest/no-test-callback: off */
import { Selector } from 'testcafe';

const clickStartDayButton = (t) => t.click(Selector('button').withText(/começar/i));

const assertNoConsoleErrors = async (t) => {
  const { error } = await t.getBrowserConsoleMessages();
  await t.expect(error).eql([]);
};

fixture`Panel Page`
  .page('../../app/app.html')
  .beforeEach(clickStartDayButton)
  .afterEach(assertNoConsoleErrors);

test('should open the Panel page', async (t) => {
  t.expect(Selector('h2').withText(/alongamentos/i).exists);
  t.expect(Selector('h2').withText(/olhos/i).exists);
});

test('should visit all pages from Panel', async (t) => {
  await t.click(Selector('img').withAttribute('alt', 'settings-icon'));
  t.expect(Selector('h2').withText(/configurações/i).exists);
  await t.click(Selector('img').withAttribute('alt', 'arrow-left-icon'));
  await t.click(Selector('img').withAttribute('alt', 'hospital-icon'));
  t.expect(Selector('h2').withText(/estafa mental/i).exists);
  await t.click(Selector('img').withAttribute('alt', 'arrow-left-icon'));
  await t.click(Selector('img').withAttribute('alt', 'question-icon'));
  t.expect(Selector('h2').withText(/sobre o aplicativo/i).exists);
});
