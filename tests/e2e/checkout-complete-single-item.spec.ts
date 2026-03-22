// spec: specs/checkout-plan.md
// seed: tests/e2e/seed.spec.ts

import { test, expect } from '../../src/fixtures/BaseTest';

test.describe('Checkout', () => {
  test('Complete checkout with a single item — happy path', async ({ authenticatedStandardUser, page }) => {
    // 1. Add 'Sauce Labs Backpack' ($29.99) to the cart by clicking its 'Add to cart' button on the inventory page.
    await page.getByTestId('add-to-cart-sauce-labs-backpack').click();

    // expect: The shopping-cart badge updates to '1'.
    await expect(page.getByTestId('shopping-cart-badge')).toHaveText('1');

    // 2. Click the shopping-cart icon to navigate to the cart page (/cart.html).
    await page.getByTestId('shopping-cart-link').click();

    // expect: The page heading reads 'Your Cart'.
    await expect(page.getByText('Your Cart')).toBeVisible();

    // expect: The cart contains exactly 1 line item: Sauce Labs Backpack, quantity 1, price $29.99.
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
    await expect(page.getByTestId('item-quantity')).toHaveText('1');
    await expect(page.getByTestId('inventory-item-price')).toHaveText('$29.99');

    // 3. Click the 'Checkout' button.
    await page.getByTestId('checkout').click();

    // expect: The URL changes to /checkout-step-one.html.
    await expect(page).toHaveURL(/checkout-step-one\.html/);

    // expect: The page heading reads 'Checkout: Your Information'.
    await expect(page.getByText('Checkout: Your Information')).toBeVisible();

    // expect: Three input fields are visible: First Name, Last Name, Zip/Postal Code.
    await expect(page.getByTestId('firstName')).toBeVisible();
    await expect(page.getByTestId('lastName')).toBeVisible();
    await expect(page.getByTestId('postalCode')).toBeVisible();

    // 4. Fill in First Name = 'John', Last Name = 'Doe', Zip/Postal Code = '12345', then click 'Continue'.
    await page.getByTestId('firstName').fill('John');
    await page.getByTestId('lastName').fill('Doe');
    await page.getByTestId('postalCode').fill('12345');
    await page.getByTestId('continue').click();

    // expect: The URL changes to /checkout-step-two.html.
    await expect(page).toHaveURL(/checkout-step-two\.html/);

    // expect: The page heading reads 'Checkout: Overview'.
    await expect(page.getByText('Checkout: Overview')).toBeVisible();

    // 5. Review the order summary displayed on the overview page.
    // expect: Item listed: Sauce Labs Backpack — $29.99.
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
    await expect(page.getByTestId('inventory-item-price')).toHaveText('$29.99');

    // expect: Payment Information: SauceCard #31337.
    await expect(page.getByText('SauceCard #31337')).toBeVisible();

    // expect: Shipping Information: Free Pony Express Delivery!
    await expect(page.getByText('Free Pony Express Delivery!')).toBeVisible();

    // expect: Item total: $29.99.
    await expect(page.getByText('Item total: $29.99')).toBeVisible();

    // expect: Tax: $2.40.
    await expect(page.getByText('Tax: $2.40')).toBeVisible();

    // expect: Total: $32.39.
    await expect(page.getByText('Total: $32.39')).toBeVisible();

    // 6. Click the 'Finish' button.
    await page.getByTestId('finish').click();

    // expect: The URL changes to /checkout-complete.html.
    await expect(page).toHaveURL(/checkout-complete\.html/);

    // expect: The page heading reads 'Checkout: Complete!'.
    await expect(page.getByText('Checkout: Complete!')).toBeVisible();

    // expect: A confirmation heading 'Thank you for your order!' is visible.
    await expect(page.getByText('Thank you for your order!')).toBeVisible();

    // expect: The sub-message is visible.
    await expect(page.getByText('Your order has been dispatched, and will arrive just as fast as the pony can get there!')).toBeVisible();

    // expect: The 'Back Home' button is visible.
    await expect(page.getByText('Back Home')).toBeVisible();

    // expect: The cart badge is no longer displayed.
    await expect(page.getByTestId('shopping-cart-badge')).not.toBeVisible();
  });
});
