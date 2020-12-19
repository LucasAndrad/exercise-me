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

test('should open the Body exercise page', async (t) => {
  await t.click(Selector('button').withText(/hidden body/i));
  t.expect(Selector('h2').withText(/Exercícios de Alongamento/i).exists);
  t.expect(Selector('img').withAttribute('alt', 'slim-arrow-right-icon').exists);
});

test('should open the Eyes exercises page', async (t) => {
  await t.click(Selector('button').withText(/hidden eyes/i));
  t.expect(Selector('h2').withText(/Exercícios para os olhos/i).exists);
  t.expect(Selector('img').withAttribute('alt', 'slim-arrow-right-icon').exists);
});
