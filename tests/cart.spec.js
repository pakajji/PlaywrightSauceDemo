import { test, expect } from '@playwright/test';

async function login(page) {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
}

test('Add Product', async ({ page }) => {
  await login(page);

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();

  await expect(page.locator('[data-test="item-4-title-link"] [data-test="inventory-item-name"]')).toContainText('Sauce Labs Backpack');
  await expect(page.locator('[data-test="item-3-title-link"] [data-test="inventory-item-name"]')).toContainText('Test.allTheThings() T-Shirt (Red)');
  await expect(page.locator('[data-test="shopping-cart-link"]')).toContainText('2');
});

test('Remove Product', async ({ page }) => {
  await login(page);

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page.locator('[data-test="shopping-cart-link"]')).toContainText('2');
  await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
  await expect(page.locator('[data-test="shopping-cart-link"]')).toContainText('');
});