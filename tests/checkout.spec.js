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

test('Checkout Success', async ({ page }) => {
  await login(page);
  await addProduct(page);

  await page.locator('[data-test="checkout"]').click();

  await expect(page.locator('[data-test="title"]')).toContainText('Checkout: Your Information');
  await page.locator('[data-test="firstName"]').fill('Testname')
  await page.locator('[data-test="lastName"]').fill('TestLastname');
  await page.locator('[data-test="postalCode"]').fill('10000');
  await page.locator('[data-test="continue"]').click();
  
  await expect(page.locator('[data-test="title"]')).toContainText('Checkout: Overview');
  await page.locator('[data-test="total-label"]').click();
  await expect(page.locator('[data-test="payment-info-label"]')).toContainText('Payment Information:');
  await expect(page.locator('[data-test="shipping-info-label"]')).toContainText('Shipping Information:');
  await expect(page.locator('[data-test="total-info-label"]')).toContainText('Price Total');
  await page.locator('[data-test="finish"]').click();
  await expect(page.locator('[data-test="title"]')).toContainText('Checkout: Complete!');
  await expect(page.locator('[data-test="complete-header"]')).toContainText('Thank you for your order!');

});

test('Checkout Failed', async ({ page }) => {
  await login(page);
  await addProduct(page);

  await page.locator('[data-test="checkout"]').click();

  await expect(page.locator('[data-test="title"]')).toContainText('Checkout: Your Information');
  await page.locator('[data-test="firstName"]').fill('')
  await page.locator('[data-test="lastName"]').fill('');
  await page.locator('[data-test="postalCode"]').fill('');
  await page.locator('[data-test="continue"]').click();
  await expect(page.locator('[data-test="error"]')).toContainText('Error: First Name is required');
});