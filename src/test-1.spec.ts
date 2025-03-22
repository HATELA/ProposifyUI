import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://app.env9.proposify.link/login');
  await page.getByRole('textbox', { name: 'Your Email Address' }).click();
  await page.getByRole('textbox', { name: 'Your Email Address' }).fill('fe.testing+5@proposify.com');
  await page.getByRole('textbox', { name: 'Your Password' }).click();
  await page.getByRole('textbox', { name: 'Your Password' }).fill('4CD6*BMiefTv6v_7_c2W');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByTestId('create-document-button').click();
  await page.getByText('Try Editor').click();
  await page.getByTestId('start-from-scratch-button').click();
  await page.locator('#content_tab').getByRole('img').click();
  await page.getByRole('button', { name: 'Table' }).click();
  
  await page.getByText('TextMultiplierPriceSubtotalNameQuantityPriceSubtotalSubtotal $0Tax %Discount$').dblclick();
  await page.getByRole('paragraph').filter({ hasText: /^$/ }).nth(1).dblclick();
  await page.getByTestId('table-block-test-id').getByRole('textbox').getByRole('paragraph').click();
  await page.getByTestId('table-block-test-id').getByRole('textbox').fill('Name 1');
  await page.getByRole('paragraph').filter({ hasText: /^$/ }).nth(1).click();
  await page.getByTestId('table-block-test-id').getByRole('textbox').getByRole('paragraph').click();
  await page.getByTestId('table-block-test-id').getByRole('textbox').fill('Name 2');
  await page.getByRole('paragraph').filter({ hasText: /^$/ }).nth(1).click();
  await page.getByTestId('table-block-test-id').getByRole('textbox').getByRole('paragraph').click();
  await page.getByTestId('table-block-test-id').getByRole('textbox').fill('Name 3');
  await page.getByRole('gridcell', { name: 'Write text here...' }).getByRole('paragraph').click();
  await page.getByTestId('table-block-test-id').getByRole('paragraph').filter({ hasText: /^$/ }).click();
  await page.getByTestId('table-block-test-id').getByRole('textbox').fill('Name 4');
  await page.getByRole('row', { name: 'Name 2' }).getByTestId('DragIcon').click();
  await page.getByRole('row', { name: 'Name 2' }).locator('path').click();
});