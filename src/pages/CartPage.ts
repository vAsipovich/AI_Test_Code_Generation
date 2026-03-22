// path: src/pages/CartPage.ts

import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page Object for the SauceDemo Cart page (/cart.html).
 */
export class CartPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async waitForPageLoad(): Promise<void> {
    await expect(this.getCartContainer()).toBeVisible();
  }

  // ── Locators ─────────────────────────────────────────────────────────────────

  getCartContainer(): Locator {
    return this.page.getByTestId('cart-contents-container');
  }

  getCartTitle(): Locator {
    return this.page.getByTestId('title');
  }

  getCartItems(): Locator {
    return this.page.getByTestId('cart-item');
  }

  getItemQuantity(): Locator {
    return this.page.getByTestId('item-quantity');
  }

  getItemPrice(): Locator {
    return this.page.getByTestId('inventory-item-price');
  }

  getCheckoutButton(): Locator {
    return this.page.getByTestId('checkout');
  }

  getContinueShoppingButton(): Locator {
    return this.page.getByTestId('continue-shopping');
  }

  // ── Actions ──────────────────────────────────────────────────────────────────

  async clickCheckout(): Promise<void> {
    await this.getCheckoutButton().click();
  }
}
