// spec: specs/inventory-sorting-plan.md
// seed: tests/e2e/seed.spec.ts

import { test, expect } from '../../src/fixtures/BaseTest';

test.describe('Inventory Sorting', () => {
  test('TC-SORT-003 – Sort by Price (low to high)', async ({ authenticatedStandardUser, page }) => {
    // 1. Log in as standard_user and navigate to the inventory page
    await expect(page.getByText('Products')).toBeVisible();

    // 2. Open the sort dropdown and select 'Price (low to high)'
    await page.getByTestId('product-sort-container').selectOption(['lohi']);

    // expect: The dropdown label updates to 'Price (low to high)'
    await expect(page.getByTestId('product-sort-container')).toHaveValue('lohi');

    // Wait for sorting to complete by waiting for the first expected item
    await expect(page.getByTestId('inventory-item-name').first()).toHaveText('Sauce Labs Onesie');

    // 3. Read the names and prices of all products in their new displayed order
    const productNames = page.getByTestId('inventory-item-name');
    const productPrices = page.getByTestId('inventory-item-price');

    // expect: All 6 products are visible
    await expect(productNames).toHaveCount(6);

    // expect: Products appear in order with correct prices
    await expect(productNames.nth(0)).toHaveText('Sauce Labs Onesie');
    await expect(productPrices.nth(0)).toHaveText('$7.99');

    await expect(productNames.nth(1)).toHaveText('Sauce Labs Bike Light');
    await expect(productPrices.nth(1)).toHaveText('$9.99');

    await expect(productNames.nth(2)).toHaveText('Sauce Labs Bolt T-Shirt');
    await expect(productPrices.nth(2)).toHaveText('$15.99');

    await expect(productNames.nth(3)).toHaveText('Test.allTheThings() T-Shirt (Red)');
    await expect(productPrices.nth(3)).toHaveText('$15.99');

    await expect(productNames.nth(4)).toHaveText('Sauce Labs Backpack');
    await expect(productPrices.nth(4)).toHaveText('$29.99');

    await expect(productNames.nth(5)).toHaveText('Sauce Labs Fleece Jacket');
    await expect(productPrices.nth(5)).toHaveText('$49.99');
  });
});
