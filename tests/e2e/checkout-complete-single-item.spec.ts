// spec: specs/checkout-plan.md
// seed: tests/e2e/seed.spec.ts

import { test, expect } from '../../src/fixtures/BaseTest';

test.describe('Checkout', () => {
  test('Complete checkout with a single item — happy path', async ({ authenticatedStandardUser, page, cartPage, checkoutPage }) => {
    // 1. Add 'Sauce Labs Backpack' ($29.99) to the cart by clicking its 'Add to cart' button on the inventory page.
    await page.getByTestId('add-to-cart-sauce-labs-backpack').click();

    // expect: The shopping-cart badge updates to '1'.
    await expect(page.getByTestId('shopping-cart-badge')).toHaveText('1');

    // 2. Click the shopping-cart icon to navigate to the cart page (/cart.html).
    await page.getByTestId('shopping-cart-link').click();

    // expect: The page heading reads 'Your Cart'.
    await expect(cartPage.getCartTitle()).toHaveText('Your Cart');

    // expect: The cart contains exactly 1 line item: Sauce Labs Backpack, quantity 1, price $29.99.
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
    await expect(cartPage.getItemQuantity()).toHaveText('1');
    await expect(cartPage.getItemPrice()).toHaveText('$29.99');

    // 3. Click the 'Checkout' button.
    await cartPage.clickCheckout();

    // expect: The URL changes to /checkout-step-one.html.
    await expect(page).toHaveURL(/checkout-step-one\.html/);

    // expect: Three input fields are visible: First Name, Last Name, Zip/Postal Code.
    await expect(checkoutPage.getFirstNameInput()).toBeVisible();
    await expect(checkoutPage.getLastNameInput()).toBeVisible();
    await expect(checkoutPage.getPostalCodeInput()).toBeVisible();

    // 4. Fill in First Name = 'John', Last Name = 'Doe', Zip/Postal Code = '12345', then click 'Continue'.
    await checkoutPage.fillCustomerInfo('John', 'Doe', '12345');

    // expect: The URL changes to /checkout-step-two.html.
    await expect(page).toHaveURL(/checkout-step-two\.html/);

    // 5. Review the order summary displayed on the overview page.
    // expect: Item listed: Sauce Labs Backpack — $29.99.
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
    await expect(checkoutPage.getItemPrice()).toHaveText('$29.99');

    // expect: Payment Information: SauceCard #31337.
    await expect(checkoutPage.getPaymentInfoValue()).toHaveText('SauceCard #31337');

    // expect: Shipping Information: Free Pony Express Delivery!
    await expect(checkoutPage.getShippingInfoValue()).toHaveText('Free Pony Express Delivery!');

    // expect: Item total: $29.99.
    await expect(checkoutPage.getSubtotalLabel()).toHaveText('Item total: $29.99');

    // expect: Tax: $2.40.
    await expect(checkoutPage.getTaxLabel()).toHaveText('Tax: $2.40');

    // expect: Total: $32.39.
    await expect(checkoutPage.getTotalLabel()).toHaveText('Total: $32.39');

    // 6. Click the 'Finish' button.
    await checkoutPage.clickFinish();

    // expect: The URL changes to /checkout-complete.html.
    await expect(page).toHaveURL(/checkout-complete\.html/);

    // expect: A confirmation heading 'Thank you for your order!' is visible.
    await expect(checkoutPage.getCompleteHeader()).toHaveText('Thank you for your order!');

    // expect: The sub-message is visible.
    await expect(checkoutPage.getCompleteText()).toBeVisible();

    // expect: The 'Back Home' button is visible.
    await expect(checkoutPage.getBackHomeButton()).toBeVisible();

    // expect: The cart badge is no longer displayed.
    await expect(page.getByTestId('shopping-cart-badge')).not.toBeVisible();
  });
});
