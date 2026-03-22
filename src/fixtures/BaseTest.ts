// path: src/fixtures/BaseTest.ts

import { test as base, expect, TestInfo } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { NavigationComponent } from '../components/NavigationComponent';
import { createLogger } from '../utils/logger';
import { getStandardUser } from '../utils/envHelper';

const logger = createLogger('BaseTest');

/**
 * Shape of all custom fixtures available in every test.
 * Extend this interface when adding new page objects or shared state.
 */
export interface AppFixtures {
  /** Pre-instantiated LoginPage object bound to the current test's page. */
  loginPage: LoginPage;
  /** Pre-instantiated InventoryPage object bound to the current test's page. */
  inventoryPage: InventoryPage;
  /** Pre-instantiated CartPage object bound to the current test's page. */
  cartPage: CartPage;
  /** Pre-instantiated CheckoutPage object bound to the current test's page. */
  checkoutPage: CheckoutPage;
  /** Pre-instantiated NavigationComponent bound to the current test's page. */
  nav: NavigationComponent;
  /**
   * Fixture that logs in as standard_user before the test body runs and
   * resolves to the pre-authenticated InventoryPage instance.
   */
  authenticatedStandardUser: InventoryPage;
}

/**
 * Extended Playwright `test` object that provides pre-wired page/component
 * fixtures and global before/after hooks (logging, screenshot on failure).
 *
 * Import `test` and `expect` from this module in all spec files instead of
 * importing directly from `@playwright/test`.
 *
 * @example
 * ```ts
 * import { test, expect } from '../../src/fixtures/BaseTest';
 *
 * test('my test', async ({ loginPage }) => { ... });
 * ```
 */
export const test = base.extend<AppFixtures>({
  // ── Page / Component fixtures ───────────────────────────────────────────────

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },

  nav: async ({ page }, use) => {
    await use(new NavigationComponent(page));
  },

  authenticatedStandardUser: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const { username, password } = getStandardUser();

    await loginPage.goto();
    await loginPage.login(username, password);
    await inventoryPage.waitForPageLoad();

    await use(inventoryPage);
  },

  // ── Global setup / teardown hook via the built-in `page` fixture ───────────

  page: async ({ page }, use, testInfo: TestInfo) => {
    logger.info(`▶ START  "${testInfo.title}"`);

    await use(page);

    // ── Teardown ─────────────────────────────────────────────────────────────
    const status = testInfo.status ?? 'unknown';
    if (status === 'failed' || status === 'timedOut') {
      logger.error(`✖ FAILED "${testInfo.title}" — ${testInfo.error?.message ?? ''}`);
    } else {
      logger.info(`✔ PASSED "${testInfo.title}"`);
    }
  },
});

export { expect };
