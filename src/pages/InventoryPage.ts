// path: src/pages/InventoryPage.ts

import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page Object for the SauceDemo Inventory (Products) page.
 *
 * This is the main page users see after successful login.
 * Contains product listings and shopping cart functionality.
 */
export class InventoryPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /** Navigate directly to inventory page (requires authentication). */
  async goto(): Promise<void> {
    await this.navigate('/inventory.html');
    await this.waitForPageLoad();
  }

  /** Asserts that the inventory container is visible. */
  async waitForPageLoad(): Promise<void> {
    await expect(this.getInventoryContainer()).toBeVisible();
  }

  // ── Locators ─────────────────────────────────────────────────────────────────

  /** The main inventory container. */
  getInventoryContainer(): Locator {
    return this.page.getByTestId('inventory-container');
  }

  /** The "Products" page title. */
  getPageTitle(): Locator {
    return this.page.getByTestId('title');
  }

  /** Shopping cart badge showing item count. */
  getShoppingCartBadge(): Locator {
    return this.page.getByTestId('shopping-cart-badge');
  }

  /** Shopping cart link. */
  getShoppingCartLink(): Locator {
    return this.page.getByTestId('shopping-cart-link');
  }

  /** Burger menu button. */
  getBurgerMenuButton(): Locator {
    return this.page.getByRole('button', { name: 'Open Menu' });
  }

  /** All product items on the page. */
  getProductItems(): Locator {
    return this.page.getByTestId('inventory-item');
  }

  /** Product item by name. */
  getProductByName(productName: string): Locator {
    return this.page.locator(`[data-test="inventory-item"]`, {
      has: this.page.locator(`[data-test="inventory-item-name"]`, {
        hasText: productName
      })
    });
  }

  /** Add to cart button for a specific product. */
  getAddToCartButton(productName: string): Locator {
    return this.getProductByName(productName)
      .getByRole('button', { name: /add to cart/i });
  }

  // ── Actions ──────────────────────────────────────────────────────────────────

  /** Open the burger menu. */
  async openBurgerMenu(): Promise<void> {
    this.logger.info('Opening burger menu');
    await this.getBurgerMenuButton().click();
  }

  /** Logout via the burger menu. */
  async logout(): Promise<void> {
    await this.openBurgerMenu();
    await this.page.getByTestId('logout-sidebar-link').click();
  }

  /** Add a product to cart by name. */
  async addProductToCart(productName: string): Promise<void> {
    this.logger.info(`Adding product to cart: ${productName}`);
    await this.getAddToCartButton(productName).click();
  }

  /** Get the current cart item count from the badge. */
  async getCartItemCount(): Promise<number> {
    const badge = this.getShoppingCartBadge();
    if (!(await badge.isVisible())) return 0;
    
    const text = await badge.textContent();
    return parseInt(text ?? '0', 10);
  }

  /** Returns the total number of products displayed on the page. */
  async getProductCount(): Promise<number> {
    return this.getProductItems().count();
  }
}