// path: src/pages/CheckoutPage.ts

import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page Object covering the full SauceDemo checkout flow:
 * - Step one (/checkout-step-one.html) — customer information form
 * - Step two (/checkout-step-two.html) — order overview
 * - Complete (/checkout-complete.html) — confirmation screen
 */
export class CheckoutPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async waitForPageLoad(): Promise<void> {
    await expect(this.page.getByTestId('title')).toBeVisible();
  }

  // ── Step One — Customer Information ──────────────────────────────────────────

  getFirstNameInput(): Locator {
    return this.page.getByTestId('firstName');
  }

  getLastNameInput(): Locator {
    return this.page.getByTestId('lastName');
  }

  getPostalCodeInput(): Locator {
    return this.page.getByTestId('postalCode');
  }

  getContinueButton(): Locator {
    return this.page.getByTestId('continue');
  }

  /** Fill in the customer info form and click Continue. */
  async fillCustomerInfo(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.getFirstNameInput().fill(firstName);
    await this.getLastNameInput().fill(lastName);
    await this.getPostalCodeInput().fill(postalCode);
    await this.getContinueButton().click();
  }

  // ── Step Two — Order Overview ─────────────────────────────────────────────────

  getSummaryContainer(): Locator {
    return this.page.getByTestId('checkout-summary-container');
  }

  getItemPrice(): Locator {
    return this.page.getByTestId('inventory-item-price');
  }

  getPaymentInfoValue(): Locator {
    return this.page.getByTestId('payment-info-value');
  }

  getShippingInfoValue(): Locator {
    return this.page.getByTestId('shipping-info-value');
  }

  getSubtotalLabel(): Locator {
    return this.page.getByTestId('subtotal-label');
  }

  getTaxLabel(): Locator {
    return this.page.getByTestId('tax-label');
  }

  getTotalLabel(): Locator {
    return this.page.getByTestId('total-label');
  }

  getFinishButton(): Locator {
    return this.page.getByTestId('finish');
  }

  async clickFinish(): Promise<void> {
    await this.getFinishButton().click();
  }

  // ── Complete Page ─────────────────────────────────────────────────────────────

  getCompleteHeader(): Locator {
    return this.page.getByTestId('complete-header');
  }

  getCompleteText(): Locator {
    return this.page.getByTestId('complete-text');
  }

  getBackHomeButton(): Locator {
    return this.page.getByTestId('back-to-products');
  }
}
