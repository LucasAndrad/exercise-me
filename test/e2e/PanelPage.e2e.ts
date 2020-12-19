/* eslint jest/expect-expect: off, jest/no-test-callback: off */
import { ClientFunction, Selector } from 'testcafe';

const assertNoConsoleErrors = async (t) => {
  const { error } = await t.getBrowserConsoleMessages();
  await t.expect(error).eql([]);
};

fixture`Panel Page`.page('../../app/app.html').afterEach(assertNoConsoleErrors);

test('should open the Panel page', async (t) => {
  await t.click(Selector('button').withText(/começar/i));
  t.expect(Selector('h2').withText(/alongamentos/i).exists);
  t.expect(Selector('h2').withText(/olhos/i).exists);
});
