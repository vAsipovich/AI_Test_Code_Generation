# Checkout Test Plan

## Application Overview

End-to-end checkout flow on SauceDemo (https://www.saucedemo.com). After logging in as standard_user the user adds a product to the cart, proceeds through the two-step checkout form (personal information → order overview), and completes the order landing on the confirmation page.

## Test Scenarios

### 1. Checkout

**Seed:** `tests/e2e/seed.spec.ts`

#### 1.1. Complete checkout with a single item — happy path

**File:** `tests/e2e/checkout-complete-single-item.spec.ts`

**Steps:**
  1. Add 'Sauce Labs Backpack' ($29.99) to the cart by clicking its 'Add to cart' button on the inventory page.
    - expect: The shopping-cart badge updates to '1'.
  2. Click the shopping-cart icon to navigate to the cart page (/cart.html).
    - expect: The page heading reads 'Your Cart'.
    - expect: The cart contains exactly 1 line item: Sauce Labs Backpack, quantity 1, price $29.99.
  3. Click the 'Checkout' button.
    - expect: The URL changes to /checkout-step-one.html.
    - expect: The page heading reads 'Checkout: Your Information'.
    - expect: Three input fields are visible: First Name, Last Name, Zip/Postal Code.
  4. Fill in First Name = 'John', Last Name = 'Doe', Zip/Postal Code = '12345', then click 'Continue'.
    - expect: The URL changes to /checkout-step-two.html.
    - expect: The page heading reads 'Checkout: Overview'.
  5. Review the order summary displayed on the overview page.
    - expect: Item listed: Sauce Labs Backpack — $29.99.
    - expect: Payment Information: SauceCard #31337.
    - expect: Shipping Information: Free Pony Express Delivery!
    - expect: Item total: $29.99.
    - expect: Tax: $2.40.
    - expect: Total: $32.39.
  6. Click the 'Finish' button.
    - expect: The URL changes to /checkout-complete.html.
    - expect: The page heading reads 'Checkout: Complete!'.
    - expect: A confirmation heading 'Thank you for your order!' is visible.
    - expect: The sub-message 'Your order has been dispatched, and will arrive just as fast as the pony can get there!' is visible.
    - expect: The 'Back Home' button is visible.
    - expect: The cart badge is no longer displayed.
