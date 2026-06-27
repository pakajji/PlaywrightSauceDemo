import { test, expect } from '@playwright/test';

async function login(page) {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
}

async function addProduct(page) {
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
}

async function fillCheckoutInfo(page) {
  await page.locator('[data-test="firstName"]').fill('Testname')
  await page.locator('[data-test="lastName"]').fill('TestLastname');
  await page.locator('[data-test="postalCode"]').fill('10000');
  await page.locator('[data-test="continue"]').click();
}

test('Purchase Product Flow', async ({ page }) => {
  await login(page);
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

  await addProduct(page);
  await expect(page.locator('[data-test="shopping-cart-link"]')).toContainText('2');

  await page.locator('[data-test="checkout"]').click();
  await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');

  await fillCheckoutInfo(page);
  await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');

  await page.locator('[data-test="finish"]').click();
  await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
  await expect(page.locator('[data-test="title"]')).toContainText('Checkout: Complete!');

});

